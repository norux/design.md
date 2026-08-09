<!-- Generated from docs/components/README.md. Do not edit. -->

# Component authoring

The initial set is: Button, IconButton, Link, PrimaryNavigation, Input/SearchField, Select, Dialog, Popover, Tag, Card/ListItem, Breadcrumb, TableOfContents, CodeBlock treatment, Theme control, and empty/loading/error states.

Do not add a React implementation until a React consumer needs it. When it does, use Base UI primitives and publish a narrow `registry:ui` item that consumers own after installation.

## Contents

- [Button](#button)
- [IconButton](#iconbutton)
- [Link](#link)
- [PrimaryNavigation](#primarynavigation)
- [Input and SearchField](#input-and-searchfield)
- [Select](#select)
- [Dialog and Popover](#dialog-and-popover)
- [Tag and Card/ListItem](#tag-and-cardlistitem)
- [Breadcrumb and TableOfContents](#breadcrumb-and-tableofcontents)
- [CodeBlock, Theme control, and status states](#codeblock-theme-control-and-status-states)

Every component document must include anatomy, variants and states, keyboard behavior, accessible names and semantics, token mapping, example, non-goals, and verification. The following definitions are the initial contract for future AI and human implementation.

## Button

**Anatomy:** label, optional icon, visible focus ring.<br>
**Variants and states:** primary, secondary, quiet; default, hover, pressed, disabled, loading.<br>
**Keyboard:** Enter and Space activate; loading prevents duplicate activation.<br>
**Semantics:** use native `<button>` unless navigation is the actual behavior.<br>
**Tokens:** `action.primary`, `action.on-primary`, `focus.ring`, `size.control-touch`, `radius.md`.<br>
**Example:** `<button type="button">Save changes</button>`.<br>
**Non-goals:** navigation and icon-only actions.<br>
**Verification:** both themes, disabled state, keyboard activation, 44px target.

## IconButton

**Anatomy:** one meaningful icon and visible focus ring.<br>
**Variants and states:** quiet or outlined; default, hover, pressed, disabled.<br>
**Keyboard:** Enter and Space activate.<br>
**Semantics:** require `aria-label` or adjacent visible text; an icon is never its own accessible name.<br>
**Tokens:** transparent background by default, `foreground.primary`, optional `background.sunken` or `action.soft`, `border.strong`, `focus.ring`, `size.control-touch`.<br>
**Example:** `<button type="button" aria-label="Close dialog"><svg aria-hidden="true" fill="none" stroke="currentColor">…</svg></button>`.<br>
**Non-goals:** 34px-only controls, white icon tiles on the canvas, or raster assets with baked-in backgrounds.<br>
**Verification:** target size, focus, name in an accessibility tree, transparent asset edges, and both themes.

Icons inherit `currentColor` and sit directly on their parent surface. Add a container only when it communicates grouping or state. On the canvas, use `background.sunken` for a neutral container or `action.soft` for selected/action emphasis; do not default to the white `background.surface`. Brand artwork that intentionally includes a field is the only exception and must be documented with the asset.

```css
.icon-button {
  display: inline-grid;
  width: var(--norux-size-control-touch);
  min-height: var(--norux-size-control-touch);
  place-items: center;
  color: var(--norux-color-foreground-muted);
  background: transparent;
  border: 0;
  border-radius: var(--norux-radius-md);
}

.icon-button:hover,
.icon-button[aria-pressed="true"] {
  color: var(--norux-color-action-primary);
  background: var(--norux-color-action-soft);
}
```

## Link

**Anatomy:** text, underline, optional external indicator.<br>
**Variants and states:** inline or navigation; default, hover, visited where supplied by the browser.<br>
**Keyboard:** Enter activates.<br>
**Semantics:** use `<a href>`; the label describes the destination.<br>
**Tokens:** `action.primary`, `action.primary-hover`, `focus.ring`.<br>
**Example:** `<a href="/articles">Read articles</a>`.<br>
**Non-goals:** local state buttons.<br>
**Verification:** contrast and visible underline without hover.

## PrimaryNavigation

**Anatomy:** labelled navigation landmark, destination links, current-page state, and an optional compact-menu trigger and panel.<br>
**Variants and states:** expanded desktop navigation; closed/open compact navigation; current destination. Collapse when content no longer fits, not from device detection.<br>
**Keyboard:** links follow native behavior; the compact trigger uses Enter and Space, Escape closes its panel, and closing returns focus to the trigger.<br>
**Semantics:** keep the same destinations reachable at every width. The trigger exposes an accessible name, `aria-expanded`, and `aria-controls`; the current link uses `aria-current="page"`.<br>
**Tokens:** `background.surface`, `foreground.primary`, `foreground.muted`, `border.subtle`, `focus.ring`, `size.control-touch`, `layer.sticky`.<br>
**Example:** `<button aria-expanded="false" aria-controls="primary-menu">Menu</button><nav id="primary-menu" aria-label="Primary">…</nav>`.<br>
**Non-goals:** hiding the only primary navigation with `display: none`, hover-only submenus, or duplicating different destinations for mobile.<br>
**Verification:** 320px width, 200% zoom, keyboard-only open/close, focus return, current-page state, both themes, and JavaScript failure behavior.

## Input and SearchField

**Anatomy:** label, input, optional description, validation message, optional clear action.<br>
**Variants and states:** default, focus, filled, invalid, disabled, loading results.<br>
**Keyboard:** native text editing; result Arrow keys never trap Tab.<br>
**Semantics:** use `<label>` and a polite live region for changing result count.<br>
**Tokens:** `background.surface`, `foreground.primary`, `border.strong`, `feedback.negative`, `focus.ring`.<br>
**Example:** `<label>Search <input type="search" /></label>`.<br>
**Non-goals:** placeholder-only labels.<br>
**Verification:** error/result announcements and 44px height.

## Select

**Anatomy:** visible label, trigger/control, selected value, chevron, option list, optional description and validation message.<br>
**Variants and states:** default, hover, focus, open, filled, invalid, disabled.<br>
**Keyboard:** native Select behavior; Arrow keys change or navigate options, Enter or Space opens where supported, Escape closes, and Tab moves on.<br>
**Semantics:** prefer a labelled native `<select>` for ordinary forms. In React, use Base UI Select only when a custom popup, rich option content, or controlled open state is required; preserve its trigger/listbox semantics and accessible label.<br>
**Tokens:** `background.surface`, `foreground.primary`, `foreground.muted`, `border.strong`, `focus.ring`, `feedback.negative`, `size.control-touch`, `radius.md`.<br>
**Example:** `<label for="sort">Sort by</label><select id="sort"><option>Newest</option></select>`.<br>
**Non-goals:** a browser-default unstyled control, a clickable `<div>`, placeholder-only labels, or custom keyboard logic for a native select.<br>
**Verification:** selected value, open/close and option navigation by keyboard, visible focus, invalid and disabled states, 44px height, 200% zoom, and both themes.

```html
<label for="sort">Sort by</label>
<div class="select-control">
  <select id="sort" name="sort">
    <option value="newest">Newest</option>
    <option value="oldest">Oldest</option>
  </select>
  <svg aria-hidden="true" viewBox="0 0 20 20"><path d="m6 8 4 4 4-4" /></svg>
</div>
```

```css
.select-control {
  position: relative;
}

.select-control select {
  width: 100%;
  min-height: var(--norux-size-control-touch);
  appearance: none;
  padding: 0 var(--norux-space-6) 0 var(--norux-space-3);
  color: var(--norux-color-foreground-primary);
  background: var(--norux-color-background-surface);
  border: var(--norux-border-width) solid var(--norux-color-border-strong);
  border-radius: var(--norux-radius-md);
}

.select-control svg {
  position: absolute;
  top: 50%;
  right: var(--norux-space-3);
  width: 20px;
  pointer-events: none;
  transform: translateY(-50%);
  fill: none;
  stroke: currentColor;
}
```

## Dialog and Popover

**Anatomy:** trigger, surface, title, content, close action; a popover also exposes an anchor.<br>
**Variants and states:** closed, opening, open, closing; destructive dialogs use explicit copy.<br>
**Keyboard:** dialog traps focus and closes on safe Escape; both return focus to trigger.<br>
**Semantics:** use Base UI in React; dialogs need a labelled title and named close action.<br>
**Tokens:** `background.surface`, `border.strong`, `shadow.overlay`, `layer.modal`, `focus.ring`.<br>
**Example:** `<dialog aria-labelledby="dialog-title">…</dialog>`.<br>
**Non-goals:** simple confirmation tooltips.<br>
**Verification:** initial focus, focus return, Escape, and 200% zoom.

## Tag and Card/ListItem

**Anatomy:** tag label; list item title, metadata, optional action, optional media.<br>
**Variants and states:** informational, selected, removable tag; static, linked, actionable, selected list item.<br>
**Keyboard:** only actionable content receives tab focus; a linked item is one link, never nested controls.<br>
**Semantics:** use semantic lists; selected tags expose selection.<br>
**Tokens:** `action.soft`, `action.primary`, `border.subtle`, `background.surface`, `radius.full`.<br>
**Example:** `<li><a href="/post">Article title</a></li>`.<br>
**Non-goals:** decorative archive-card walls.<br>
**Verification:** selection is more than color and link hit areas are clear.

## Breadcrumb and TableOfContents

**Anatomy:** breadcrumb links/current item; ToC label, heading links, active marker.<br>
**Variants and states:** collapsed mobile ToC, sticky desktop ToC, active heading.<br>
**Keyboard:** native links; mobile ToC uses a native disclosure or equivalent button semantics.<br>
**Semantics:** use labelled navigation landmarks and `aria-current`.<br>
**Tokens:** `foreground.muted`, `foreground.primary`, `action.primary`, `border.subtle`.<br>
**Example:** `<nav aria-label="Breadcrumb">…</nav>`.<br>
**Non-goals:** hiding the only navigation path on mobile.<br>
**Verification:** horizontal overflow, active state, keyboard jumps.

## CodeBlock, Theme control, and status states

**Anatomy:** code label/optional filename/scrollable surface; theme control with current state; status heading, explanation, recovery action.<br>
**Variants and states:** authored highlighted/diff code; light/dark theme; empty/loading/error status.<br>
**Keyboard:** optional copy control announces success; theme control exposes current theme and destination.<br>
**Semantics:** live region for copy/loading completion; error names the problem and recovery action.<br>
**Tokens:** `background.code`, `foreground.primary`, `action.primary`, `feedback.*`, `focus.ring`.<br>
**Example:** `<p role="status">Loading articles…</p>`.<br>
**Non-goals:** color-only status, auto-playing code animation, behavioral persistence.<br>
**Verification:** reduced motion, theme persistence, status announcements, horizontal code scrolling.
