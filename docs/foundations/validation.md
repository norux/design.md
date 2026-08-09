# Validation

Run the full local gate:

```bash
pnpm check
```

The repository uses a pinned TypeScript validator because the current `@google/design.md` CLI is alpha and ignores the required `norux` extension that models independent light and dark semantic roles. The local validator checks required groups, token references, duplicate palette literals, typography shape, semantic theme shape, contrast, generated output, and TypeScript types.

The upstream format remains useful for its frontmatter and section conventions. Run its compatibility audit when changing only its supported fields:

```bash
pnpm design:lint:google
```

The upstream audit currently reports no errors. Its `norux`-extension, missing-primary, and orphaned-palette warnings are expected because the tool cannot follow the independent semantic themes. Do not treat that report as proof that semantic themes, contrast, or generated artifacts are valid.

GitHub Actions runs `pnpm check:ci` on every push and pull request. It fails on source-token, TypeScript, contrast, registry, test, or generated CSS/TypeScript drift. `pnpm brand:check` remains a local macOS check because its PNG export intentionally uses the reviewed `sips` renderer.
