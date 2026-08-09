import { readFile } from "node:fs/promises";
import { describe, expect, it } from "vitest";

describe("release automation", () => {
  it("starts from the committed package version", async () => {
    const manifest = JSON.parse(await readFile(".release-please-manifest.json", "utf8"));
    const packageJson = JSON.parse(await readFile("package.json", "utf8"));
    expect(manifest["."]).toBe(packageJson.version);
  });

  it("publishes feature and bug-fix notes while hiding maintenance commits", async () => {
    const config = JSON.parse(await readFile("release-please-config.json", "utf8"));
    type Section = { type: string; hidden?: boolean };
    const sections = new Map<string, Section>(
      config["changelog-sections"].map((item: Section) => [item.type, item])
    );

    expect(sections.get("feat")?.hidden).not.toBe(true);
    expect(sections.get("fix")?.hidden).not.toBe(true);
    expect(sections.get("perf")?.hidden).not.toBe(true);
    expect(sections.get("revert")?.hidden).not.toBe(true);
    for (const type of ["build", "chore", "ci", "docs", "refactor", "style", "test"]) {
      expect(sections.get(type)?.hidden).toBe(true);
    }
    expect(config["bootstrap-sha"]).toMatch(/^[\da-f]{40}$/);
    expect(config["include-component-in-tag"]).toBe(false);
  });

  it("uses separate release and consumer credentials", async () => {
    const releaseWorkflow = await readFile(".github/workflows/release.yml", "utf8");
    const notifyWorkflow = await readFile(".github/workflows/notify-consumers.yml", "utf8");

    expect(releaseWorkflow).toContain("googleapis/release-please-action@v4");
    expect(releaseWorkflow).toContain("secrets.RELEASE_PLEASE_TOKEN");
    expect(notifyWorkflow).toContain("release:");
    expect(notifyWorkflow).toContain("secrets.CONSUMER_ISSUES_TOKEN");
    expect(notifyWorkflow).toContain("node scripts/notify-consumers.ts");
  });

  it("starts releases only when a maintainer runs the workflow", async () => {
    const releaseWorkflow = await readFile(".github/workflows/release.yml", "utf8");

    expect(releaseWorkflow).toContain("workflow_dispatch:");
    expect(releaseWorkflow).not.toContain("\n  push:");
  });
});
