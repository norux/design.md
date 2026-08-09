import { readFile } from "node:fs/promises";
import { describe, expect, it } from "vitest";

const compactPath = "M14 18h8v4.1c3-3.4 6.8-5.1 11.2-5.1 8.7 0 14.8 6 14.8 16.1V47h-8.5V34.2c0-6.3-2.8-9.5-8.1-9.5-5.7 0-8.9 3.8-8.9 10.6V47H14V18Z";

describe("brand assets", () => {
  it("keeps the compact period separate from the n", async () => {
    const files = ["brand/logo/norux-mark.svg", "brand/logo/norux-app-icon.svg", "brand/logo/norux-favicon.svg"];

    for (const file of files) {
      const svg = await readFile(file, "utf8");
      expect(svg).toContain(`d="${compactPath}"`);
      expect(svg).toContain('<circle cx="54" cy="43" r="4"');
    }

    expect(54 - 4 - 48).toBeGreaterThan(0);
  });

  it("keeps the wordmark period separate from the x", async () => {
    const files = ["brand/logo/norux-wordmark.svg", "brand/logo/norux-wordmark-inverse.svg", "brand/logo/norux-wordmark-mono.svg"];

    for (const file of files) {
      const svg = await readFile(file, "utf8");
      expect(svg).toContain('viewBox="0 0 316 108"');
      expect(svg).toContain('transform="translate(0 82) scale(.054 -.054)"');
      expect(svg).toContain('<circle cx="301" cy="72" r="10"');
    }

    expect(301 - 10 - 285.74).toBeGreaterThan(0);
  });
});
