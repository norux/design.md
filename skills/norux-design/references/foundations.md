# Norux foundations

## Visual character

Make interfaces calm, direct, readable, and low-noise. Show state and available actions without relying on hover, memory, or personalization. Use the pastel-blue accent for action, focus, selection, status, and the wordmark period—not ambient decoration.

## Semantic colors

Use the same semantic variable names in both themes. The bundled `../assets/norux.css` contains the canonical assignments.

| Role | Use |
| --- | --- |
| `--norux-color-background-canvas` | Page background |
| `--norux-color-background-surface` | Controls, overlays, and content raised from canvas |
| `--norux-color-background-sunken` | Recessed groups and neutral icon containers |
| `--norux-color-background-code` | Authored code |
| `--norux-color-foreground-primary` | Main text and icons |
| `--norux-color-foreground-muted` | Supporting text and quiet icons |
| `--norux-color-border-subtle` | Dividers and passive boundaries |
| `--norux-color-border-strong` | Inputs and interactive boundaries |
| `--norux-color-action-primary` | Explicit actions and links |
| `--norux-color-action-soft` | Selection and quiet emphasis |
| `--norux-color-focus-ring` | Focus indication only |
| `--norux-color-feedback-*` | Positive, negative, and warning state paired with text or an icon |

## Typography

Use Pretendard Variable for Korean and Latin prose and UI. Prefer the pinned `pretendard@1.3.9` package or an equivalent reviewed, self-hosted copy with its SIL OFL 1.1 license. Use the generated sans stack as fallback and the mono stack only for code and technical identifiers.

| Role | Size / weight / line height |
| --- | --- |
| `display-lg` | 56px / 760 / 1.12 |
| `display-md` | 42px / 760 / 1.08 |
| `heading-lg` | 30px / 700 / 1.35 |
| `heading-md` | 24px / 700 / 1.4 |
| `body-lg` | 18px / 400 / 1.82 |
| `body-md` | 16px / 400 / 1.6 |
| `label-md` | 14px / 600 / 1.45 |
| `label-sm` | 12px / 650 / 1.4 |

Use `body-lg` for long prose with a maximum width of 720px or 72ch. Build hierarchy through size, weight, and spacing rather than extra colors. Do not use all-caps body text.

## Layout, depth, and shape

- Follow a 4px spacing rhythm: 4, 8, 12, 16, 24, 32, 48, and 72px.
- Keep pointer targets at least 44px. Use 36px compact controls only with a documented platform exception.
- Keep the page shell at or below 1180px and long-form content at or below 720px.
- Prefer flat surfaces, spacing, surface changes, and borders. Use the overlay shadow only for modal or popover layers; never add decorative card shadows.
- Use 4px, 8px, or 12px radii for rectangular elements. Reserve the full radius for tags, filters, and intentional status pills.
- Use 120ms, 160ms, and 240ms `ease-out` motion only to explain state continuity. Honor `prefers-reduced-motion`.

## Accessibility

- Meet WCAG AA: 4.5:1 for normal text and 3:1 for large text and non-text indicators.
- Use the shared 3px focus ring with a 3px offset.
- Expose state through text, iconography, shape, or position as well as color.
- Keep primary navigation reachable at every width.
- Return focus after dialogs and compact navigation close.
- Allow page reflow at 200% zoom; only authored code and data tables may scroll horizontally.

## Brand

Write `norux` in lowercase. The approved `norux.` wordmark includes a separated blue terminal period. Never recreate the mark with runtime text or generative imagery. Locate a reviewed master in the consumer or fetch it from a reviewed immutable Norux design revision; do not improvise when it is unavailable.
