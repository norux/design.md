import { checkContrast } from "./contrast.ts";
import { asMap, readDesignSource, resolveReferences } from "./design-source.ts";

const source = await readDesignSource();
const resolved = asMap(resolveReferences(source, source), "resolved DESIGN.md");
const results = checkContrast(resolved);
const failures = results.filter((result) => result.actual < result.minimum);

for (const result of results) {
  console.log(`${result.name}: ${result.actual.toFixed(2)}:1 (minimum ${result.minimum}:1)`);
}

if (failures.length > 0) {
  throw new Error(`Contrast checks failed: ${failures.map((failure) => failure.name).join(", ")}.`);
}
