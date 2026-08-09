import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { asMap, flatten, readDesignSource, resolveReferences, toKebab, type DesignMap } from "./design-source.ts";

const source = await readDesignSource();
const resolved = asMap(resolveReferences(source, source), "DESIGN.md");
const norux = asMap(resolved.norux, "norux");
const themes = asMap(norux.themes, "norux.themes");
const css = createCss(resolved, norux, themes);
const files = [
  "packages/tokens/css/norux.css",
  "registry/norux-base/norux.css",
  "skills/norux-design/assets/norux.css"
] as const;

for (const file of files) {
  const output = resolve(file);
  if (process.argv.includes("--check")) {
    if (await readFile(output, "utf8") !== css) throw new Error(`${file} is out of date. Run pnpm generate.`);
    console.log(`Checked ${file}`);
    continue;
  }
  await mkdir(dirname(output), { recursive: true });
  await writeFile(output, css);
  console.log(`Generated ${file}`);
}

function createCss(root: DesignMap, config: DesignMap, themes: DesignMap) {
  const common = [
    ...rename(asMap(root.spacing, "spacing"), ["space"]),
    ...rename(asMap(root.rounded, "rounded"), ["radius"]),
    ...rename(asMap(root.typography, "typography"), ["typography"]),
    ...rename(omit(config, ["themes", "accessibility", "source"]), [])
  ];
  const light = themeVariables(asMap(themes.light, "norux.themes.light"));
  const dark = themeVariables(asMap(themes.dark, "norux.themes.dark"));

  return [
    "/* Generated from DESIGN.md. Do not edit. */",
    ":root {",
    "  color-scheme: light;",
    ...render(common),
    "}",
    "",
    ':root, :root[data-theme="light"] {',
    "  color-scheme: light;",
    ...render(light),
    "}",
    "",
    ':root[data-theme="dark"] {',
    "  color-scheme: dark;",
    ...render(dark),
    "}",
    ""
  ].join("\n");
}

function rename(group: DesignMap, prefix: string[]) {
  return flatten(group).map(({ path, value }) => ({ path: [...prefix, ...path], value }));
}

function themeVariables(theme: DesignMap) {
  return rename(asMap(theme.color, "theme.color"), ["color"]);
}

function render(values: ReturnType<typeof rename>) {
  return values
    .sort((left, right) => left.path.join(".").localeCompare(right.path.join(".")))
    .map(({ path, value }) => `  --norux-${path.map(toKebab).join("-")}: ${value};`);
}

function omit(source: DesignMap, keys: string[]) {
  return Object.fromEntries(Object.entries(source).filter(([key]) => !keys.includes(key)));
}
