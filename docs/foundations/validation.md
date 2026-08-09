# Validation

Run the full local gate:

```bash
pnpm check
```

The official `@google/design.md` CLI validates the standard frontmatter and document structure. Norux keeps one small extension for independent light and dark semantic roles because the alpha schema has no theme mode model. The CSS generator resolves that extension, and the contrast check verifies its declared accessibility pairs.

The upstream linter therefore reports the `norux` extension and its palette references as warnings. Those warnings are expected; errors are not. Run it directly with:

```bash
pnpm design:lint
```

GitHub Actions runs `pnpm check:ci` on every push and pull request. It fails on lint errors, broken references during CSS generation, contrast, registry, types, tests, or generated CSS drift. `pnpm brand:check` remains a local macOS check because its PNG export intentionally uses the reviewed `sips` renderer.
