# Migrate `norux/dev`

Do this in a focused consumer change after the design-system commit is pinned. Do not copy palette literals from this repository. The commands below make the source revision visible and reproducible; replace `<commit-sha>` with a reviewed immutable Git commit.

```bash
cd /Users/norux/orca/workspaces/dev/dev-init
pnpm add pretendard@1.3.9
mkdir -p src/styles/generated
curl --fail --location --silent --show-error \
  https://raw.githubusercontent.com/norux/design.md/<commit-sha>/packages/tokens/css/norux.css \
  --output src/styles/generated/norux.css
```

Import `src/styles/generated/norux.css` before the consumer stylesheet. Load Pretendard from the installed package according to its package documentation, then replace each local `--canvas`-style value with a semantic `--norux-*` variable. Keep consumer-only layout values local.

Map the existing blog roles as follows:

| Existing role | Norux semantic token |
| --- | --- |
| `--canvas` | `--norux-color-background-canvas` |
| `--surface` | `--norux-color-background-surface` |
| `--text` | `--norux-color-foreground-primary` |
| `--muted` | `--norux-color-foreground-muted` |
| `--border` on inputs/controls | `--norux-color-border-strong` |
| `--border` as a divider | `--norux-color-border-subtle` |
| `--accent-strong` | `--norux-color-action-primary` |
| focus outline | `--norux-color-focus-ring` |

Apply the canonical [IconButton](../components/README.md#iconbutton) and [Select](../components/README.md#select) contracts. In `norux/dev`, replace existing icon assets that contain baked backgrounds and expose each ordinary sort/filter control through a local native `SelectField` wrapper. No consumer-specific visual override is currently required.

Before merging the consumer migration, run its existing checks and manually test transparent icon edges, select keyboard navigation, mobile header navigation, search announcement, 200% zoom, and both color themes. Replace the blog's current favicon with [the canonical favicon](../../brand/logo/norux-favicon.svg) in that focused consumer change and verify its browser rendering separately.

The current consumer rule `@media (max-width: 900px) { .site-header nav { display: none; } }` removes the only primary-navigation path. Replace it in a focused consumer change with the documented `PrimaryNavigation` compact trigger and panel before treating the responsive migration as complete. Preserve the same destinations, expose open state, support Escape and focus return, and verify at 320px and 200% zoom.
