---
name: norux-design
description: Apply and extend the Norux design system. Use when editing Norux UI, choosing tokens, adding a documented component or shadcn registry item, reviewing light/dark accessibility, or recording an intentional consumer-specific visual override.
---

# norux Design

## Workflow

1. Read `DESIGN.md` and the relevant file under `docs/` before selecting a token or pattern.
2. Use semantic `--norux-*` tokens. Do not use palette literals from `colors` in consumer UI.
3. Preserve a documented consumer override when it is intentional. Add a concise reason beside the consumer's local design note; do not silently normalize it.
4. For a new component, use the contract in `docs/components/README.md`. Start with behavior and accessible semantics. Use Base UI only when the consumer is React.
5. Run the smallest relevant verification, then run the repository gate for token, registry, or design-source changes.

## Commands

```bash
pnpm generate
pnpm contrast
pnpm check
```

Run `pnpm registry:validate` when editing `registry.json`. Run `pnpm artifacts:check` after changing `DESIGN.md` to prove generated CSS, DTCG JSON, TypeScript, and registry CSS are current.

## Brand rules

- Write `norux` in lowercase.
- Use `norux.` only as the approved wordmark; preserve the terminal blue period.
- Do not redraw, stretch, recolor, shadow, re-space, or remove wordmark punctuation.
- Use `brand/logo/` masters and rules. Do not create a production brand asset with generative image tooling.

## Scope limits

Do not add a custom MCP unless the skill, repository CLI, and official shadcn MCP leave a documented read-only workflow gap. Do not publish a package, add registry credentials, or create a broad component catalog without explicit approval.

For component-specific detail, read [component-authoring.md](references/component-authoring.md).
