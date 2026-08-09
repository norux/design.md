# Release policy

This repository is the source of truth, not a published package. Consumers pin a Git commit and vendor the generated CSS they review.

## Versioning

Until the first consumer migration is accepted, changes are `0.x`:

- Patch: documentation, fixture, or correction that preserves generated semantic token values.
- Minor: additive token, documented component contract, or registry item.
- Breaking: renamed/removed semantic token, changed accessibility contract, or altered generated output that needs a consumer code change.

Update `CHANGELOG.md` for every consumer-visible change. Never overwrite a previously reviewed Git revision.

## Consumer release

The first consumer is `norux/dev`. A consumer release needs a reviewed commit, the exact migration command in `docs/migrations/norux-dev.md`, the consumer's own checks, visual checks in light and dark themes, and separate verification of the canonical favicon. It does not publish an npm package, host a registry, or add credentials.
