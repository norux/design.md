# Release policy

This repository is the source of truth, not a published package. Consumers pin a Git commit and vendor the generated CSS they review.

## Versioning

Until the first consumer migration is accepted, changes are `0.x`:

- Patch: backward-compatible correction to released tokens, assets, component contracts, or automation behavior.
- Minor: additive token, documented component contract, or registry item.
- Breaking: renamed/removed semantic token, changed accessibility contract, or altered generated output that needs a consumer code change.

Use Conventional Commits for every change. `feat:` produces a minor release, `fix:` produces a patch release, and a `!` or `BREAKING CHANGE` footer produces a major release. Performance improvements and reverts receive their own release-note sections. Build, chore, CI, documentation, refactor, style, and test commits stay out of release notes and do not create a release by themselves.

## Manual release

`.github/workflows/release.yml` runs only when a maintainer starts the `Release` workflow from GitHub Actions. A push to `main` never starts a release.

Run the workflow once to make Release Please create or update the release PR. Review and merge that PR, then run the same workflow a second time to create the immutable `v<version>` tag and publish the GitHub Release. The second manual run is the explicit release approval. It never publishes the private npm package.

The initial automation baseline is version `0.1.0` at commit `6f39ed653456224e835d9ff5c5809f86d79a0bc8`. Do not rewrite that commit or a published tag.

Create two separate fine-grained personal access tokens from GitHub **Settings → Developer settings → Personal access tokens → Fine-grained tokens → Generate new token**. Set the resource owner to `norux`, choose an expiration, select **Only select repositories**, and grant only these repository permissions:

| Actions secret | Selected repository | Repository permissions |
| --- | --- | --- |
| `RELEASE_PLEASE_TOKEN` | `norux/design.md` | Contents, Issues, and Pull requests: Read and write |
| `CONSUMER_ISSUES_TOKEN` | `norux/dev` | Issues: Read and write |

Use descriptive token names such as `design.md release automation` and `design.md consumer issues`. These display names do not need to match the Actions secret names. Copy each generated value immediately and store it as a repository secret in `norux/design.md`; do not save it in this repository, an issue, or a command-line argument. A dedicated release token lets the generated release PR run normal verification workflows.

```bash
gh secret set RELEASE_PLEASE_TOKEN --repo norux/design.md
```

## Consumer notification

When a GitHub Release is published, `.github/workflows/notify-consumers.yml` reads `harness/consumers.json` and creates one idempotent adoption issue per release and consumer. Each issue contains the immutable design commit, a concrete checklist, consumer verification commands, rollback requirements, and an executable `/goal` prompt. Adding a consumer requires a reviewed config change; the workflow never edits consumer repositories.

`CONSUMER_ISSUES_TOKEN` stays separate so it cannot change design source or release state. Expand its selected repositories only after adding and reviewing another entry in `harness/consumers.json`.

```bash
gh secret set CONSUMER_ISSUES_TOKEN --repo norux/design.md
```

Each command prompts for the token value without placing it in shell history. Confirm that both names exist without revealing their values:

```bash
gh secret list --repo norux/design.md
```

Preview the exact issue body without network writes:

```bash
pnpm consumers:preview
```

If notification fails after a release, rerun `Notify design consumers` with the existing release tag. The hidden release marker prevents duplicate issues.

## Consumer release

The first consumer is `norux/dev`. A consumer release needs a reviewed commit, the exact migration command in `docs/migrations/norux-dev.md`, the consumer's own checks, visual checks in light and dark themes, and separate verification of the canonical favicon. It does not publish an npm package, host a registry, or add credentials.

## Rollback

For an unreleased automation change, inspect the diff and revert its commit. For a published design release, keep the tag and GitHub Release as history, issue a corrective release, and repin consumers to their previous reviewed commit until the correction is accepted. Disable automation without deleting history:

```bash
gh workflow disable release.yml --repo norux/design.md
gh workflow disable notify-consumers.yml --repo norux/design.md
```
