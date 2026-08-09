# norux design system

The normative source is [DESIGN.md](./DESIGN.md). It combines machine-readable YAML tokens with concise human rules for people and agents.

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

This validates the design source, contrast targets, registry shape, tests, and generated-artifact drift. See [validation notes](./docs/foundations/validation.md) for the upstream `design.md` compatibility decision.

See the [release policy](./docs/release-policy.md) and the focused [`norux/dev` migration](./docs/migrations/norux-dev.md) before adopting a revision.

## Release changes

Running the `Release` workflow manually collects Conventional `feat:` and `fix:` commits into a release PR. After reviewing and merging that PR, run the workflow again to create the version tag and GitHub Release. The published release opens an adoption issue for each repository in [`harness/consumers.json`](./harness/consumers.json). See the [release policy](./docs/release-policy.md) for required repository secrets, verification, and rollback.

## Agent skill

Install or copy [`skills/norux-design`](./skills/norux-design) into the local Codex skills directory, then invoke `$norux-design`. It guides token selection, component documentation, verification, and intentional consumer exceptions without requiring a package registry or custom MCP.
