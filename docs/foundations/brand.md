# Brand

`norux` is always lowercase. The primary wordmark is `norux.`: the terminal period is blue and part of the mark, not punctuation that may be removed or re-spaced. The period must keep a visible clear gap from the preceding glyph; it must never touch or overlap the glyph.

## Approved wordmark variants

| Use | Asset | Rule |
| --- | --- | --- |
| Primary horizontal | `brand/logo/norux-wordmark.svg` | Use on light, plain surfaces. |
| Inverse horizontal | `brand/logo/norux-wordmark-inverse.svg` | Use on dark, plain surfaces. |
| Monochrome | `brand/logo/norux-wordmark-mono.svg` | Use only when a one-color reproduction is required. |
| Compact mark | `brand/logo/norux-mark.svg` | Use where the full wordmark is too small. |
| App icon | `brand/logo/norux-app-icon.svg` | Use for app, repository, and avatar contexts. |
| Social card | `brand/social/norux-social.svg` | Use as the master for 1200×630 social exports. |

Use the full wordmark at 96px CSS width or wider. Below that, use the compact mark at 24px or wider. Keep clear space equal to the period diameter on every side. Use only plain `background.canvas`, `background.surface`, or `background.canvas` dark backgrounds; preserve 3:1 contrast for the blue period against its background.

Do not stretch, recolor, add a shadow, use a gradient, change the period’s position, add punctuation, write `Norux`, or construct a substitute with a font at runtime.

## Favicon draft

`brand/logo/norux-favicon-draft.svg` is a replacement proposal for the existing `norux/dev` favicon. It uses the approved separated `n.` construction and the canonical blue period. It is not a consumer migration instruction: review it visually before replacing `norux/dev/public/favicon.svg`.

SVG files are deterministic source masters. Generate and verify the committed PNG exports with:

```bash
pnpm brand:export
pnpm brand:check
```

The export command uses the macOS `sips` renderer available in the current Norux toolchain. Do not use generated imagery as a brand master.

The horizontal masters are outlined from Pretendard Variable at weight 760 with `-0.04em` tracking, matching the applied Norux wordmark. The SVG paths—not runtime text—are canonical. Do not retype the mark or loosen its per-letter spacing.
