# Component authoring

The initial set is: Button, IconButton, Link, PrimaryNavigation, Input/SearchField, Dialog, Popover, Tag, Card/ListItem, Breadcrumb, TableOfContents, CodeBlock treatment, Theme control, and empty/loading/error states.

Do not add a React implementation until a React consumer needs it. When it does, use Base UI primitives and publish a narrow `registry:ui` item that consumers own after installation.

Every component document must include anatomy, variants and states, keyboard behavior, accessible names and semantics, token mapping, example, non-goals, and verification. The following definitions are the initial contract for future AI and human implementation.

## Button

**Anatomy:** label, optional icon, visible focus ring.  
**Variants and states:** primary, secondary, quiet; default, hover, pressed, disabled, loading.  
**Keyboard:** Enter and Space activate; loading prevents duplicate activation.  
**Semantics:** use native `<button>` unless navigation is the actual behavior.  
**Tokens:** `action.primary`, `action.on-primary`, `focus.ring`, `size.control-touch`, `radius.md`.  
**Example:** `<button type="button">Save changes</button>`.  
**Non-goals:** navigation and icon-only actions.  
**Verification:** both themes, disabled state, keyboard activation, 44px target.

## IconButton

**Anatomy:** one meaningful icon and visible focus ring.  
**Variants and states:** quiet or outlined; default, hover, pressed, disabled.  
**Keyboard:** Enter and Space activate.  
**Semantics:** require `aria-label` or adjacent visible text; an icon is never its own accessible name.  
**Tokens:** `background.surface`, `border.strong`, `focus.ring`, `size.control-touch`.  
**Example:** `<button type="button" aria-label="Close dialog">…</button>`.  
**Non-goals:** 34px-only controls.  
**Verification:** target size, focus, and name in an accessibility tree.

## Link

**Anatomy:** text, underline, optional external indicator.  
**Variants and states:** inline or navigation; default, hover, visited where supplied by the browser.  
**Keyboard:** Enter activates.  
**Semantics:** use `<a href>`; the label describes the destination.  
**Tokens:** `action.primary`, `action.primary-hover`, `focus.ring`.  
**Example:** `<a href="/articles">Read articles</a>`.  
**Non-goals:** local state buttons.  
**Verification:** contrast and visible underline without hover.

## PrimaryNavigation

**Anatomy:** labelled navigation landmark, destination links, current-page state, and an optional compact-menu trigger and panel.  
**Variants and states:** expanded desktop navigation; closed/open compact navigation; current destination. Collapse when content no longer fits, not from device detection.  
**Keyboard:** links follow native behavior; the compact trigger uses Enter and Space, Escape closes its panel, and closing returns focus to the trigger.  
**Semantics:** keep the same destinations reachable at every width. The trigger exposes an accessible name, `aria-expanded`, and `aria-controls`; the current link uses `aria-current="page"`.  
**Tokens:** `background.surface`, `foreground.primary`, `foreground.muted`, `border.subtle`, `focus.ring`, `size.control-touch`, `layer.sticky`.  
**Example:** `<button aria-expanded="false" aria-controls="primary-menu">Menu</button><nav id="primary-menu" aria-label="Primary">…</nav>`.  
**Non-goals:** hiding the only primary navigation with `display: none`, hover-only submenus, or duplicating different destinations for mobile.  
**Verification:** 320px width, 200% zoom, keyboard-only open/close, focus return, current-page state, both themes, and JavaScript failure behavior.

## Input and SearchField

**Anatomy:** label, input, optional description, validation message, optional clear action.  
**Variants and states:** default, focus, filled, invalid, disabled, loading results.  
**Keyboard:** native text editing; result Arrow keys never trap Tab.  
**Semantics:** use `<label>` and a polite live region for changing result count.  
**Tokens:** `background.surface`, `foreground.primary`, `border.strong`, `feedback.negative`, `focus.ring`.  
**Example:** `<label>Search <input type="search" /></label>`.  
**Non-goals:** placeholder-only labels.  
**Verification:** error/result announcements and 44px height.

## Dialog and Popover

**Anatomy:** trigger, surface, title, content, close action; a popover also exposes an anchor.  
**Variants and states:** closed, opening, open, closing; destructive dialogs use explicit copy.  
**Keyboard:** dialog traps focus and closes on safe Escape; both return focus to trigger.  
**Semantics:** use Base UI in React; dialogs need a labelled title and named close action.  
**Tokens:** `background.surface`, `border.strong`, `shadow.overlay`, `layer.modal`, `focus.ring`.  
**Example:** `<dialog aria-labelledby="dialog-title">…</dialog>`.  
**Non-goals:** simple confirmation tooltips.  
**Verification:** initial focus, focus return, Escape, and 200% zoom.

## Tag and Card/ListItem

**Anatomy:** tag label; list item title, metadata, optional action, optional media.  
**Variants and states:** informational, selected, removable tag; static, linked, actionable, selected list item.  
**Keyboard:** only actionable content receives tab focus; a linked item is one link, never nested controls.  
**Semantics:** use semantic lists; selected tags expose selection.  
**Tokens:** `action.soft`, `action.primary`, `border.subtle`, `background.surface`, `radius.full`.  
**Example:** `<li><a href="/post">Article title</a></li>`.  
**Non-goals:** decorative archive-card walls.  
**Verification:** selection is more than color and link hit areas are clear.

## Breadcrumb and TableOfContents

**Anatomy:** breadcrumb links/current item; ToC label, heading links, active marker.  
**Variants and states:** collapsed mobile ToC, sticky desktop ToC, active heading.  
**Keyboard:** native links; mobile ToC uses a native disclosure or equivalent button semantics.  
**Semantics:** use labelled navigation landmarks and `aria-current`.  
**Tokens:** `foreground.muted`, `foreground.primary`, `action.primary`, `border.subtle`.  
**Example:** `<nav aria-label="Breadcrumb">…</nav>`.  
**Non-goals:** hiding the only navigation path on mobile.  
**Verification:** horizontal overflow, active state, keyboard jumps.

## CodeBlock, Theme control, and status states

**Anatomy:** code label/optional filename/scrollable surface; theme control with current state; status heading, explanation, recovery action.  
**Variants and states:** authored highlighted/diff code; light/dark theme; empty/loading/error status.  
**Keyboard:** optional copy control announces success; theme control exposes current theme and destination.  
**Semantics:** live region for copy/loading completion; error names the problem and recovery action.  
**Tokens:** `background.code`, `foreground.primary`, `action.primary`, `feedback.*`, `focus.ring`.  
**Example:** `<p role="status">Loading articles…</p>`.  
**Non-goals:** color-only status, auto-playing code animation, behavioral persistence.  
**Verification:** reduced motion, theme persistence, status announcements, horizontal code scrolling.
