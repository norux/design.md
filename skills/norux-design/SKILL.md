---
name: norux-design
description: Apply the Norux visual system to product UI and maintain its design source. Use when building or reviewing Norux interfaces, choosing semantic tokens, styling icons or form controls such as Select, implementing light/dark themes, checking responsive accessibility, adopting Norux in another repository, or changing the canonical DESIGN.md and shadcn registry.
---

# norux design

## Start with the repository

1. Read the repository instructions and inspect its existing styles, components, dependencies, and verification scripts.
2. Classify the repository using [adoption.md](references/adoption.md): design source, adopted consumer, or unadopted consumer.
3. Read [foundations.md](references/foundations.md) for every visual change.
4. Read [components.md](references/components.md) when creating or changing interactive UI.
5. Preserve documented product-specific overrides. Record a concise reason instead of silently normalizing them.

Do not assume another repository contains this repository's `DESIGN.md`, `docs/`, scripts, assets, or package commands. The bundled references and `assets/norux.css` are the portable baseline.

## Implement

- Use semantic `--norux-*` variables. Never copy palette literals into product UI.
- Establish hierarchy with typography, spacing, and surface roles before adding decoration.
- Keep light and dark assignments independent; do not mechanically invert colors.
- Use native HTML behavior first. In React, use Base UI only when a native element cannot provide the required interaction.
- Keep framework-specific components local to the consumer until repeated use proves a shared API.
- Keep visible labels, state, focus, and recovery actions. Never rely on hover or color alone.

## Verify

Run the smallest relevant project checks discovered from the consumer's own configuration. Test both themes, keyboard use, 200% zoom, and a narrow viewport for visual or interactive changes.

Only in the canonical design-source repository, and only when the scripts exist, run:

```bash
pnpm generate
pnpm contrast
pnpm check
```

Run `pnpm registry:validate` after changing its `registry.json`. Run `pnpm artifacts:check` after changing its `DESIGN.md`.
Run `pnpm consumers:preview` before a consumer-visible release when that script exists; publishing the reviewed GitHub Release performs the real notification.

## Brand and scope

- Write `norux` in lowercase. Use `norux.` only for the approved wordmark and preserve its blue terminal period.
- Use reviewed brand masters; never redraw, recolor, shadow, stretch, re-space, or generate a production Norux mark.
- Do not publish packages, add credentials, create broad catalogs, or add design infrastructure without explicit need and approval.
