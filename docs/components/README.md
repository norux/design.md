# Component authoring

The initial set is: Button, IconButton, Link, PrimaryNavigation, Input/SearchField, Dialog, Popover, Tag, Card/ListItem, Breadcrumb, TableOfContents, CodeBlock treatment, Theme control, and empty/loading/error states.

Do not add a React implementation until a React consumer needs it. When it does, use Base UI primitives and publish a narrow `registry:ui` item that consumers own after installation.

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
**Tokens:** `background.surface`, `border.strong`, `focus.ring`, `size.control-touch`.<br>
**Example:** `<button type="button" aria-label="Close dialog">…</button>`.<br>
**Non-goals:** 34px-only controls.<br>
**Verification:** target size, focus, and name in an accessibility tree.

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
