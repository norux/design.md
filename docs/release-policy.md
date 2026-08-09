# Release policy

This repository is source, not a published package. Consumers pin a reviewed Git commit and vendor the generated CSS.

Use Conventional Commits. Treat additive tokens and component contracts as minor changes, compatible corrections as patches, and renamed or removed contracts as breaking changes while the project is `0.x`.

## Release

1. Merge the focused change after `pnpm check` passes.
2. Create an annotated `v<version>` tag on the reviewed commit.
3. Push the tag and create a GitHub Release with the relevant changelog entries.
4. Update `norux/dev` in a separate change using `docs/migrations/norux-dev.md`.

There is deliberately no package publishing, release bot, consumer manifest, cross-repository issue creation, or repository secret. Add automation only when repeated manual releases make its value clear.

## Rollback

Keep published tags as history. Fix the source in a new release, and repin consumers to their previous reviewed commit until the correction is ready.
