# Accessibility requirements

- Meet WCAG AA text contrast: 4.5:1 for normal text and 3:1 for large text and non-text indicators.
- Keep focus visible with `--norux-color-focus-ring`, `--norux-focus-width`, and `--norux-focus-offset`.
- Keep pointer targets at least `--norux-size-control-touch` (44px) unless a platform-specific exception is documented.
- Expose state through text, iconography, shape, or position as well as color.
- Provide accessible names for icon-only controls. Dialogs trap focus while open and return it to their trigger when closed.
- Keep primary destinations reachable at every responsive width. A collapsed navigation needs a visible, named trigger and explicit open state; never remove the only navigation path.
- Honor `prefers-reduced-motion`; use motion only to preserve state continuity.
- Verify representative pages at 200% browser zoom and narrow mobile widths. Tables and code may scroll horizontally; page layout may not.

The contrast pairs in `DESIGN.md` are executable checks. Add a pair before introducing a new text, focus, or control-boundary semantic role.
