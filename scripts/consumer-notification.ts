export type Consumer = {
  repository: string;
  instructions: string;
  designNotes: string;
  verification: string[];
};

export type DesignRelease = {
  repository: string;
  tag: string;
  sha: string;
  url: string;
};

type GitHubIssue = {
  body: string | null;
  html_url: string;
  pull_request?: unknown;
};

type Request = (input: string, init?: RequestInit) => Promise<Response>;

export function issueMarker(release: DesignRelease) {
  return `<!-- norux-design-release:${release.repository}:${release.tag} -->`;
}

export function createIssueTitle(release: DesignRelease) {
  return `[design] Adopt ${release.repository} ${release.tag}`;
}

export function createIssueBody(consumer: Consumer, release: DesignRelease) {
  const checks = consumer.verification.map((command) => `- [ ] Run \`${command}\`.`);
  const goal = [
    `/goal Apply ${release.repository} ${release.tag} (${release.sha}) to ${consumer.repository}.`,
    `Begin by reading ${consumer.instructions}, ${consumer.designNotes}, and the release notes at ${release.url}.`,
    "Before editing, produce a file-by-file impact plan and surface consumer constraints or intentional overrides that conflict with the release.",
    "Pin the immutable design revision, apply only affected tokens, assets, component behavior, and accessibility rules, then run the repository checks and targeted light/dark, keyboard, responsive, reduced-motion, and readability verification.",
    "Keep casual questions and exploratory reactions non-persistent. Do not deploy, publish, or change production services without explicit approval.",
    "Report exact files changed, trade-offs, verification results, and the previous revision needed for rollback."
  ].join(" ");

  return [
    issueMarker(release),
    "## Objective",
    "",
    `Adopt [${release.repository} ${release.tag}](${release.url}) in \`${consumer.repository}\` without losing intentional consumer-specific behavior.`,
    "",
    "## Source",
    "",
    `- Release: [${release.tag}](${release.url})`,
    `- Commit: \`${release.sha}\``,
    `- Consumer instructions: \`${consumer.instructions}\``,
    `- Consumer design notes: \`${consumer.designNotes}\``,
    "",
    "## `/goal`",
    "",
    "```text",
    goal,
    "```",
    "",
    "## Plan",
    "",
    `- [ ] Read \`${consumer.instructions}\`, \`${consumer.designNotes}\`, and the linked release notes before changing files.`,
    "- [ ] Compare the released design revision with the consumer's current pin and list affected tokens, assets, components, and behavior.",
    "- [ ] Surface conflicts and intentional overrides; do not silently normalize consumer-specific constraints.",
    `- [ ] Pin \`${release.sha}\` before copying or generating design artifacts.`,
    "- [ ] Apply only the released changes that affect this consumer and keep framework-specific choices local.",
    ...checks,
    "- [ ] Verify affected UI in light and dark themes, with keyboard input, reduced motion, narrow layouts, and readable content.",
    "- [ ] Record the previous pin and exact rollback command in the implementation report.",
    "",
    "## Constraints",
    "",
    "- Preserve product, content, privacy, and safety rules from the consumer repository.",
    "- Treat this issue as an adoption request, not permission to deploy or publish.",
    "- Do not persist casual conversation, browsing, or exploratory reactions as durable design rules.",
    "- Surface disagreements and trade-offs instead of hiding them behind automatic agreement.",
    ""
  ].join("\n");
}

export async function notifyConsumer(
  token: string,
  consumer: Consumer,
  release: DesignRelease,
  apiUrl = "https://api.github.com",
  request: Request = fetch
) {
  const path = repositoryPath(consumer.repository);
  const headers = {
    Accept: "application/vnd.github+json",
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json"
  };
  const marker = issueMarker(release);

  for (let page = 1; ; page += 1) {
    const issues = await githubJson<GitHubIssue[]>(
      request(`${apiUrl}/repos/${path}/issues?state=all&per_page=100&page=${page}`, { headers })
    );
    const existing = issues.find((issue) => !issue.pull_request && issue.body?.includes(marker));
    if (existing) return { created: false, url: existing.html_url };
    if (issues.length < 100) break;
  }

  const issue = await githubJson<GitHubIssue>(
    request(`${apiUrl}/repos/${path}/issues`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        title: createIssueTitle(release),
        body: createIssueBody(consumer, release)
      })
    })
  );

  return { created: true, url: issue.html_url };
}

function repositoryPath(repository: string) {
  const parts = repository.split("/");
  if (parts.length !== 2 || parts.some((part) => !/^[\w.-]+$/.test(part))) {
    throw new Error(`Invalid consumer repository: ${repository}`);
  }
  return parts.map(encodeURIComponent).join("/");
}

async function githubJson<T>(response: Promise<Response>) {
  const result = await response;
  const body = await result.text();
  if (!result.ok) throw new Error(`GitHub API ${result.status}: ${body}`);
  return JSON.parse(body) as T;
}
