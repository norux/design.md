# norux design system

The source of truth is [DESIGN.md](./DESIGN.md). It combines machine-readable YAML tokens with concise rules for people and agents.

## Use tokens

Generate all token artifacts from the source:

```bash
pnpm install
pnpm generate
```

Import [`packages/tokens/css/norux.css`](./packages/tokens/css/norux.css) once at the application root. Set `data-theme="light"` or `data-theme="dark"` on `<html>` for explicit theme choice; no attribute uses the light theme.

For a shadcn-compatible project, install the source registry item from a reviewed commit:

```bash
pnpm dlx shadcn@latest add norux/design.md/norux-base#<commit-sha>
```

The registry deliberately contains only the framework-neutral base. React component items will be added after a real React consumer establishes the needed API.

## Verify

```bash
pnpm check
```

This runs the official Google `design.md` linter, contrast checks, CSS generation, registry validation, and focused tests. See [validation notes](./docs/foundations/validation.md) for the one Norux-specific extension.

See the [release policy](./docs/release-policy.md) and the focused [`norux/dev` migration](./docs/migrations/norux-dev.md) before adopting a revision.

## Release

After `pnpm check` passes on `main`, create a reviewed Git tag and GitHub Release. Consumers pin that immutable commit and adopt it in their own focused change. There is no package publishing, consumer manifest, or cross-repository notification automation; see the concise [release policy](./docs/release-policy.md).

## Agent skill

Install or copy [`skills/norux-design`](./skills/norux-design) into the local Codex skills directory, then invoke `$norux-design`. The skill is self-contained: it bundles the visual foundations, component contracts, adoption workflow, and canonical CSS needed in a repository that does not contain this repository's `DESIGN.md` or docs.

[`docs/components/README.md`](./docs/components/README.md) is the only editable component-contract source. `pnpm generate` updates the skill's portable copy, and `pnpm artifacts:check` rejects drift.
