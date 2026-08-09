import { readFile } from "node:fs/promises";
import { describe, expect, it, vi } from "vitest";
import {
  createIssueBody,
  createIssueTitle,
  issueMarker,
  notifyConsumer,
  type Consumer,
  type DesignRelease
} from "../scripts/consumer-notification.ts";

const consumer: Consumer = {
  repository: "norux/dev",
  instructions: "AGENTS.md",
  designNotes: "docs/DESIGN-BRIEF.md",
  verification: ["pnpm check", "pnpm test", "pnpm build"]
};

const release: DesignRelease = {
  repository: "norux/design.md",
  tag: "v0.2.0",
  sha: "1234567890abcdef1234567890abcdef12345678",
  url: "https://github.com/norux/design.md/releases/tag/v0.2.0"
};

describe("consumer release issues", () => {
  it("includes an executable plan and goal", () => {
    const body = createIssueBody(consumer, release);

    expect(createIssueTitle(release)).toBe("[design] Adopt norux/design.md v0.2.0");
    expect(body).toContain("## `/goal`");
    expect(body).toContain("## Plan");
    expect(body).toContain("/goal Apply norux/design.md v0.2.0");
    expect(body).toContain("pnpm check");
    expect(body).toContain("Do not deploy, publish");
    expect(body).toContain(issueMarker(release));
  });

  it("does not duplicate an existing release issue", async () => {
    const request = vi.fn(async () =>
      Response.json([{ body: issueMarker(release), html_url: "https://github.com/norux/dev/issues/10" }])
    );

    await expect(notifyConsumer("token", consumer, release, "https://api.github.test", request)).resolves.toEqual({
      created: false,
      url: "https://github.com/norux/dev/issues/10"
    });
    expect(request).toHaveBeenCalledOnce();
  });

  it("creates a new issue when the release is untracked", async () => {
    const request = vi
      .fn()
      .mockResolvedValueOnce(Response.json([]))
      .mockResolvedValueOnce(Response.json({ body: "", html_url: "https://github.com/norux/dev/issues/11" }));

    await expect(notifyConsumer("token", consumer, release, "https://api.github.test", request)).resolves.toEqual({
      created: true,
      url: "https://github.com/norux/dev/issues/11"
    });
    const body = JSON.parse(String(request.mock.calls[1][1]?.body));
    expect(body.title).toBe(createIssueTitle(release));
    expect(body.body).toContain(issueMarker(release));
  });

  it("tracks only the configured consumer", async () => {
    const config = JSON.parse(await readFile("harness/consumers.json", "utf8"));
    expect(config.consumers.map((item: Consumer) => item.repository)).toEqual(["norux/dev"]);
  });
});
