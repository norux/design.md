import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { parseDocument } from "yaml";

export type DesignValue = string | number | boolean | DesignMap | DesignValue[];
export type DesignMap = { [key: string]: DesignValue };

const frontmatter = /^---\r?\n([\s\S]*?)\r?\n---/;
const reference = /^\{([\w.-]+)\}$/;

export async function readDesignSource(file = resolve("DESIGN.md")) {
  const markdown = await readFile(file, "utf8");
  const match = markdown.match(frontmatter);
  if (!match) throw new Error("DESIGN.md must begin with YAML frontmatter.");

  const document = parseDocument(match[1]);
  if (document.errors.length > 0) throw new Error(document.errors.map(String).join("\n"));

  const source = document.toJS();
  if (!isMap(source)) throw new Error("DESIGN.md frontmatter must be an object.");
  return source;
}

export function isMap(value: unknown): value is DesignMap {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function getPath(source: DesignMap, path: string) {
  let value: DesignValue = source;
  for (const key of path.split(".")) {
    if (!isMap(value) || !(key in value)) throw new Error(`Unknown token reference: {${path}}.`);
    value = value[key];
  }
  return value;
}

export function resolveReferences(value: DesignValue, source: DesignMap, seen = new Set<string>()): DesignValue {
  if (typeof value === "string") {
    const match = value.match(reference);
    if (!match) return value;
    const path = match[1];
    if (seen.has(path)) throw new Error(`Circular token reference: {${path}}.`);
    const next = new Set(seen);
    next.add(path);
    return resolveReferences(getPath(source, path), source, next);
  }

  if (Array.isArray(value)) return value.map((item) => resolveReferences(item, source, seen));
  if (!isMap(value)) return value;

  return Object.fromEntries(
    Object.entries(value).map(([key, item]) => [key, resolveReferences(item, source, seen)])
  );
}

export function asMap(value: DesignValue, name: string) {
  if (!isMap(value)) throw new Error(`${name} must be an object.`);
  return value;
}

export function asString(value: DesignValue, name: string) {
  if (typeof value !== "string") throw new Error(`${name} must be a string.`);
  return value;
}

export function flatten(value: DesignValue, path: string[] = []): Array<{ path: string[]; value: string | number | boolean }> {
  if (!isMap(value)) {
    if (Array.isArray(value)) return [];
    return [{ path, value }];
  }

  return Object.entries(value).flatMap(([key, item]) => flatten(item, [...path, key]));
}

export function toKebab(value: string) {
  return value.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`).replace(/_/g, "-");
}
