# Tokens

`DESIGN.md` is the only editable token source. Do not edit generated files.

```bash
pnpm generate
pnpm artifacts:check
```

Generated outputs:

- `packages/tokens/css/norux.css` for CSS consumers.
- `packages/tokens/ts/index.ts` for TypeScript consumers.
- `packages/tokens/src/norux.tokens.json` for DTCG-oriented tools.
- `registry/norux-base/norux.css` for the public shadcn source registry.

Use semantic values such as `--norux-color-background-canvas` and `--norux-color-action-primary`. Palette values are for token construction only; consumer UI must not use them directly.

Light and dark tokens share names but have independent values. Set the theme on the document root before rendering. A consumer may preserve a deliberate override, but must record the reason in its local design notes.
