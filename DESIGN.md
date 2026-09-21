---
version: alpha
name: norux
description: Calm, direct, readable foundations for norux products.
colors:
  neutral-0: "#FFFFFF"
  neutral-50: "#F7F7F4"
  neutral-100: "#EDF2F6"
  neutral-150: "#E8EDF1"
  neutral-200: "#DCE2E6"
  neutral-300: "#9DA9B2"
  neutral-400: "#84919A"
  neutral-500: "#65727C"
  neutral-600: "#53616A"
  neutral-700: "#2B343B"
  neutral-800: "#20282E"
  neutral-900: "#181E22"
  neutral-950: "#121619"
  neutral-975: "#0E1419"
  ink: "#1D252C"
  blue-100: "#E8F2FB"
  blue-150: "#CFE4F7"
  blue-300: "#A8CFF5"
  blue-400: "#82C0F5"
  blue-500: "#4A8DE0"
  blue-600: "#73B6F2"
  blue-700: "#2F6FA7"
  blue-800: "#245B8B"
  blue-850: "#245579"
  blue-900: "#18364D"
  blue-950: "#10202D"
  green-100: "#E6F7EC"
  green-400: "#6DD89B"
  green-700: "#20744A"
  green-950: "#123D27"
  red-100: "#FBEAEC"
  red-300: "#F29BA5"
  red-700: "#A42D3A"
  red-950: "#481F27"
  apricot-300: "#FFBB8D"
  apricot-700: "#A94718"
  amber-100: "#FFF4D6"
  amber-300: "#F2C76D"
  amber-700: "#8A5A00"
  amber-950: "#44320F"
typography:
  display-lg:
    fontFamily: "'Pretendard Variable', Pretendard, 'Noto Sans KR', system-ui, sans-serif"
    fontSize: 56px
    fontWeight: 760
    lineHeight: 1.12
    letterSpacing: -0.045em
  display-md:
    fontFamily: "'Pretendard Variable', Pretendard, 'Noto Sans KR', system-ui, sans-serif"
    fontSize: 42px
    fontWeight: 760
    lineHeight: 1.08
    letterSpacing: -0.04em
  heading-lg:
    fontFamily: "'Pretendard Variable', Pretendard, 'Noto Sans KR', system-ui, sans-serif"
    fontSize: 30px
    fontWeight: 700
    lineHeight: 1.35
    letterSpacing: -0.035em
  heading-md:
    fontFamily: "'Pretendard Variable', Pretendard, 'Noto Sans KR', system-ui, sans-serif"
    fontSize: 24px
    fontWeight: 700
    lineHeight: 1.4
    letterSpacing: -0.025em
  body-lg:
    fontFamily: "'Pretendard Variable', Pretendard, 'Noto Sans KR', system-ui, sans-serif"
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.82
    letterSpacing: -0.01em
  body-md:
    fontFamily: "'Pretendard Variable', Pretendard, 'Noto Sans KR', system-ui, sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.6
  label-md:
    fontFamily: "'Pretendard Variable', Pretendard, 'Noto Sans KR', system-ui, sans-serif"
    fontSize: 14px
    fontWeight: 600
    lineHeight: 1.45
  label-sm:
    fontFamily: "'Pretendard Variable', Pretendard, 'Noto Sans KR', system-ui, sans-serif"
    fontSize: 12px
    fontWeight: 650
    lineHeight: 1.4
    letterSpacing: 0.02em
  code-md:
    fontFamily: "ui-monospace, 'SFMono-Regular', 'Cascadia Code', Consolas, monospace"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.6
spacing:
  0: 0px
  1: 4px
  2: 8px
  3: 12px
  4: 16px
  5: 24px
  6: 32px
  7: 48px
  8: 72px
  control-touch: 44px
rounded:
  none: 0px
  sm: 4px
  md: 8px
  lg: 12px
  full: 9999px
components:
  button-primary:
    backgroundColor: "{colors.blue-700}"
    textColor: "{colors.neutral-0}"
    rounded: "{rounded.md}"
    height: "{spacing.control-touch}"
  field:
    backgroundColor: "{colors.neutral-0}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    height: "{spacing.control-touch}"
norux:
  source: DESIGN.md
  themes:
    light:
      color:
        background:
          canvas: "{colors.neutral-50}"
          surface: "{colors.neutral-0}"
          sunken: "{colors.neutral-100}"
          code: "{colors.neutral-100}"
        foreground:
          primary: "{colors.ink}"
          muted: "{colors.neutral-500}"
          inverse: "{colors.neutral-0}"
        border:
          subtle: "{colors.neutral-200}"
          strong: "{colors.neutral-400}"
        action:
          primary: "{colors.blue-700}"
          primary-hover: "{colors.blue-800}"
          primary-active: "{colors.blue-900}"
          on-primary: "{colors.neutral-0}"
          soft: "{colors.blue-100}"
          period: "{colors.blue-500}"
        focus:
          ring: "{colors.blue-700}"
        feedback:
          positive: "{colors.green-700}"
          positive-soft: "{colors.green-100}"
          negative: "{colors.red-700}"
          negative-soft: "{colors.red-100}"
          warning: "{colors.amber-700}"
          warning-soft: "{colors.amber-100}"
        data:
          estimate: "{colors.apricot-700}"
          estimate-fill: "{colors.apricot-300}"
        selection: "{colors.blue-150}"
    dark:
      color:
        background:
          canvas: "{colors.neutral-950}"
          surface: "{colors.neutral-900}"
          sunken: "{colors.neutral-975}"
          code: "{colors.neutral-975}"
        foreground:
          primary: "{colors.neutral-150}"
          muted: "{colors.neutral-300}"
          inverse: "{colors.neutral-950}"
        border:
          subtle: "{colors.neutral-700}"
          strong: "{colors.neutral-500}"
        action:
          primary: "{colors.blue-400}"
          primary-hover: "{colors.blue-300}"
          primary-active: "{colors.blue-600}"
          on-primary: "{colors.blue-950}"
          soft: "{colors.blue-900}"
          period: "{colors.blue-500}"
        focus:
          ring: "{colors.blue-400}"
        feedback:
          positive: "{colors.green-400}"
          positive-soft: "{colors.green-950}"
          negative: "{colors.red-300}"
          negative-soft: "{colors.red-950}"
          warning: "{colors.amber-300}"
          warning-soft: "{colors.amber-950}"
        data:
          estimate: "{colors.apricot-300}"
          estimate-fill: "{colors.apricot-300}"
        selection: "{colors.blue-850}"
  font:
    sans: "'Pretendard Variable', Pretendard, 'Noto Sans KR', system-ui, sans-serif"
    mono: "ui-monospace, 'SFMono-Regular', 'Cascadia Code', Consolas, monospace"
  size:
    control-compact: 36px
    control-touch: "{spacing.control-touch}"
    header: 64px
    page-max: 1180px
    article-max: 720px
    reading-measure: 72ch
  border:
    width: 1px
  focus:
    width: 3px
    offset: 3px
  shadow:
    none: none
    overlay: "0 24px 80px rgb(0 0 0 / 24%)"
  motion:
    duration:
      fast: 120ms
      standard: 160ms
      slow: 240ms
    easing:
      standard: "ease-out"
  layer:
    base: 0
    sticky: 30
    progress: 40
    skip-link: 100
    modal: 200
  accessibility:
    contrast:
      - name: light-estimate-text
        foreground: "{norux.themes.light.color.data.estimate}"
        background: "{norux.themes.light.color.background.surface}"
        minimum: 4.5
      - name: dark-estimate-text
        foreground: "{norux.themes.dark.color.data.estimate}"
        background: "{norux.themes.dark.color.background.surface}"
        minimum: 4.5
      - name: light-primary-text
        foreground: "{norux.themes.light.color.foreground.primary}"
        background: "{norux.themes.light.color.background.canvas}"
        minimum: 4.5
      - name: light-muted-text
        foreground: "{norux.themes.light.color.foreground.muted}"
        background: "{norux.themes.light.color.background.canvas}"
        minimum: 4.5
      - name: light-action-text
        foreground: "{norux.themes.light.color.action.primary}"
        background: "{norux.themes.light.color.background.surface}"
        minimum: 4.5
      - name: light-focus-ring
        foreground: "{norux.themes.light.color.focus.ring}"
        background: "{norux.themes.light.color.background.canvas}"
        minimum: 3
      - name: light-control-border
        foreground: "{norux.themes.light.color.border.strong}"
        background: "{norux.themes.light.color.background.surface}"
        minimum: 3
      - name: light-wordmark-period
        foreground: "{norux.themes.light.color.action.period}"
        background: "{norux.themes.light.color.background.canvas}"
        minimum: 3
      - name: dark-primary-text
        foreground: "{norux.themes.dark.color.foreground.primary}"
        background: "{norux.themes.dark.color.background.canvas}"
        minimum: 4.5
      - name: dark-muted-text
        foreground: "{norux.themes.dark.color.foreground.muted}"
        background: "{norux.themes.dark.color.background.canvas}"
        minimum: 4.5
      - name: dark-action-text
        foreground: "{norux.themes.dark.color.action.primary}"
        background: "{norux.themes.dark.color.background.canvas}"
        minimum: 4.5
      - name: dark-focus-ring
        foreground: "{norux.themes.dark.color.focus.ring}"
        background: "{norux.themes.dark.color.background.canvas}"
        minimum: 3
      - name: dark-control-border
        foreground: "{norux.themes.dark.color.border.strong}"
        background: "{norux.themes.dark.color.background.surface}"
        minimum: 3
      - name: dark-wordmark-period
        foreground: "{norux.themes.dark.color.action.period}"
        background: "{norux.themes.dark.color.background.canvas}"
        minimum: 3
---

# norux design system

## Overview

norux interfaces are calm, direct, readable, and low-noise. State and available actions must be visible without relying on hover, memory, or behavioral personalization. Typography and spacing establish hierarchy before decoration. The pastel-blue accent marks focus, status, and the terminal period in the wordmark; it is not ambient decoration.

## Colors

The frontmatter is the normative token source. Use semantic theme roles from `norux.themes`, not palette values, in product code. Light and dark themes are independent semantic assignments; do not invert a light palette mechanically.

Use `action.primary` for an explicit action or a text link. Use `action.soft` for selection and quiet emphasis. Use `focus.ring` only for focus visibility. Use `border.strong` for the visible boundary of an input or a control. Feedback colors must always pair with a text label or icon—never color alone.

Use `data.estimate` for estimated-value labels and `data.estimate-fill` for their apricot chart fills. Keep the visible estimate label beside the chart; translucent fills are supplementary to the numeric value, not status or warning colors.

## Typography

Use Pretendard Variable for Korean and Latin UI and prose. Self-host it through the pinned `pretendard@1.3.9` package or an equivalent reviewed copy under SIL OFL 1.1; keep its license with any redistributed binary. Use the code family only for code and technical identifiers.

Keep prose at `body-lg` with the 720px / 72ch reading limit. Use hierarchy through size, weight, and spacing rather than extra colors. Do not use all-caps body text.

## Layout

Use the 4px spacing rhythm in `spacing`. Touch controls are at least `norux.size.control-touch` (44px). The page shell is no wider than 1180px; long-form prose is no wider than 720px. At browser zoom, preserve reflow and avoid horizontal scrolling except for authored code and data tables.

## Elevation & Depth

Surfaces are mostly flat. Prefer spacing, a surface change, and a border to imply grouping. Only modal or popover-like overlays may use `norux.shadow.overlay`; never add decorative card shadows.

## Shapes

Use `rounded.sm` through `rounded.lg` for rectangular controls and containers. Use `rounded.full` only for compact tags, filters, and intentional status pills. Do not mix unrelated corner styles in one component.

## Components

Every component documents anatomy, variants, states, keyboard behavior, accessible names, token mapping, examples, and non-goals in `docs/components/`. React implementations use Base UI primitives and retain shadcn's copy-and-own model. Non-React consumers use these tokens and behavior rules without a React dependency.

State must be visible. A theme control exposes the current theme and its destination. Loading, empty, and error states use text and semantic status—not a color-only cue. Dialogs return focus to their trigger, and all interactive controls keep a 3:1 or stronger focus indicator.

Responsive changes preserve capability. Primary navigation destinations remain reachable at every width; an expanded navigation may collapse only when a visible, named trigger exposes the same destinations with explicit open state, keyboard dismissal, and focus return. Never solve a narrow header by hiding its only navigation path.

## Do's and Don'ts

- Do write `norux` in lowercase and use `norux.` only for the approved wordmark.
- Do use the blue terminal period only at its specified optical size and alignment.
- Do keep visible clear space between the terminal period and the preceding glyph; they never touch or overlap.
- Do honor `prefers-reduced-motion`; motion only explains a state transition.
- Don't stretch, recolor, shadow, re-space, or remove the wordmark period.
- Don't place small white text on a pastel-blue fill.
- Don't introduce a new component until an existing documented pattern cannot meet the need.
- Don't infer or persist a behavioral interest profile from casual use.
