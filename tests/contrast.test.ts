import { describe, expect, it } from "vitest";
import { checkContrast, contrastRatio } from "../scripts/contrast.ts";
import { asMap, readDesignSource, resolveReferences } from "../scripts/design-source.ts";

describe("contrast", () => {
  it("calculates a known WCAG ratio", () => {
    expect(contrastRatio("#000000", "#FFFFFF")).toBe(21);
  });

  it("keeps every declared contrast pair at its target", async () => {
    const source = await readDesignSource();
    const resolved = asMap(resolveReferences(source, source), "resolved DESIGN.md");
    const results = checkContrast(resolved);
    expect(results.every((result) => result.actual >= result.minimum)).toBe(true);
  });
});
