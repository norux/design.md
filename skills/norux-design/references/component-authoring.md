# Component authoring reference

Read `docs/components/README.md` for the full initial component contract.

Use native HTML first. For a React consumer, compose Base UI primitives and export the consumer-owned code through one focused `registry:ui` item. Document anatomy, variants, state, keyboard behavior, accessible names, token mapping, example, non-goals, and verification before adding the item.

Never use a palette literal in a component. Use semantic variables such as `--norux-color-background-surface`, `--norux-color-foreground-primary`, `--norux-color-border-strong`, and `--norux-color-focus-ring`.

For responsive navigation, verify that every desktop destination remains reachable through a visible compact trigger. Reject implementations that only hide the primary `<nav>` at a breakpoint.
