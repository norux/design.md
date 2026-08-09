import { readFile } from "node:fs/promises";
import { createIssueBody, createIssueTitle, notifyConsumer, type Consumer, type DesignRelease } from "./consumer-notification.ts";

type ConsumerConfig = {
  consumers: Consumer[];
};

const dryRun = process.argv.includes("--dry-run");
const config = JSON.parse(await readFile("harness/consumers.json", "utf8")) as ConsumerConfig;
const release = readRelease(dryRun);

if (dryRun) {
  for (const consumer of config.consumers) {
    console.log(`# ${consumer.repository}`);
    console.log(createIssueTitle(release));
    console.log(createIssueBody(consumer, release));
  }
} else {
  const token = required("CONSUMER_ISSUES_TOKEN");
  const apiUrl = process.env.GITHUB_API_URL ?? "https://api.github.com";

  for (const consumer of config.consumers) {
    const result = await notifyConsumer(token, consumer, release, apiUrl);
    console.log(`${result.created ? "Created" : "Found"} ${result.url}`);
  }
}

function readRelease(preview: boolean): DesignRelease {
  const repository = process.env.DESIGN_REPOSITORY ?? "norux/design.md";
  if (preview) {
    const tag = process.env.RELEASE_TAG ?? "vNEXT";
    return {
      repository,
      tag,
      sha: process.env.DESIGN_SHA ?? "0000000000000000000000000000000000000000",
      url: process.env.RELEASE_URL ?? `https://github.com/${repository}/releases/tag/${tag}`
    };
  }

  return {
    repository,
    tag: required("RELEASE_TAG"),
    sha: requiredSha("DESIGN_SHA"),
    url: required("RELEASE_URL")
  };
}

function required(name: string) {
  const value = process.env[name];
  if (!value) throw new Error(`${name} is required.`);
  return value;
}

function requiredSha(name: string) {
  const value = required(name);
  if (!/^[\da-f]{40}$/i.test(value)) throw new Error(`${name} must be a full Git commit SHA.`);
  return value;
}
