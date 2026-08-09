import { asMap, asString, flatten, readDesignSource, resolveReferences, type DesignMap } from "./design-source.ts";
import { checkContrast } from "./contrast.ts";

const source = await readDesignSource();
const resolved = asMap(resolveReferences(source, source), "resolved DESIGN.md");
validateSource(source);
validateContrast(resolved);
console.log("Validated DESIGN.md");

function validateSource(root: DesignMap) {
  for (const key of ["name", "colors", "typography", "spacing", "rounded", "components", "norux"]) {
    if (!(key in root)) throw new Error(`DESIGN.md is missing ${key}.`);
  }

  asString(root.name, "name");
  validateColors(asMap(root.colors, "colors"));
  validateTypography(asMap(root.typography, "typography"));
  validateThemes(asMap(asMap(root.norux, "norux").themes, "norux.themes"));
}

function validateContrast(root: DesignMap) {
  for (const result of checkContrast(root)) {
    if (result.actual < result.minimum) throw new Error(`${result.name} contrast is below its target.`);
  }
}

function validateColors(colors: DesignMap) {
  const values = new Map<string, string>();
  for (const { path, value } of flatten(colors)) {
    if (typeof value !== "string" || !/^#[\da-f]{6}$/i.test(value)) throw new Error(`colors.${path.join(".")} must be a six-digit hex color.`);
    const existing = values.get(value.toUpperCase());
    if (existing) throw new Error(`Duplicate color values: ${existing} and ${path.join(".")}.`);
    values.set(value.toUpperCase(), path.join("."));
  }
}

function validateTypography(typography: DesignMap) {
  for (const [name, value] of Object.entries(typography)) {
    const token = asMap(value, `typography.${name}`);
    for (const key of ["fontFamily", "fontSize", "fontWeight", "lineHeight"]) {
      if (!(key in token)) throw new Error(`typography.${name} is missing ${key}.`);
    }
  }
}

function validateThemes(themes: DesignMap) {
  for (const name of ["light", "dark"]) {
    const theme = asMap(themes[name], `norux.themes.${name}`);
    const color = asMap(theme.color, `norux.themes.${name}.color`);
    for (const role of ["background", "foreground", "border", "action", "focus", "feedback", "selection"]) {
      if (!(role in color)) throw new Error(`norux.themes.${name}.color is missing ${role}.`);
    }

    for (const { path, value } of flatten(color)) {
      if (typeof value !== "string" || !/^\{colors\.[\w-]+\}$/.test(value)) {
        throw new Error(`norux.themes.${name}.color.${path.join(".")} must reference a primitive color token.`);
      }
    }
  }
}
