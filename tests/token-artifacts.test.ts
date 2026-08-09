import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { createTokenArtifacts } from "../scripts/token-artifacts.ts";

describe("token artifacts", () => {
  it("matches the deterministic generator output", async () => {
    const artifacts = await createTokenArtifacts();
    await expect(readFile(resolve("packages/tokens/css/norux.css"), "utf8")).resolves.toBe(artifacts.css);
    await expect(readFile(resolve("packages/tokens/src/norux.tokens.json"), "utf8")).resolves.toBe(artifacts.dtcg);
    await expect(readFile(resolve("packages/tokens/ts/index.ts"), "utf8")).resolves.toBe(artifacts.typescript);
  });
});
