# Adopt and maintain Norux

## Classify the repository

Inspect before changing files:

- **Design source:** contains the canonical Norux `DESIGN.md`, token generator, and registry.
- **Adopted consumer:** imports CSS defining `--norux-*` variables.
- **Unadopted consumer:** has no Norux semantic tokens.

Local repository instructions and documented product constraints remain authoritative. Record intentional visual differences with a short reason.

## Design source

Read its complete `DESIGN.md` and only the relevant local docs. Edit the canonical source, not generated CSS. Use repository scripts only when they exist in its `package.json`. Regenerate artifacts and run its contrast, registry, type, test, and full checks in proportion to the change.

Do not add token formats, packages, registries, release automation, or component catalogs until a real consumer requires them.

## Adopted consumer

Locate the token import and theme attribute before editing. Keep semantic roles stable across light and dark themes and preserve consumer-only layout tokens locally. Use the consumer's existing framework, component conventions, formatter, and verification commands; do not run design-source commands there.

Map local roles to Norux semantics:

| Local role | Norux variable |
| --- | --- |
| page/canvas | `--norux-color-background-canvas` |
| raised surface/control | `--norux-color-background-surface` |
| recessed surface | `--norux-color-background-sunken` |
| main text | `--norux-color-foreground-primary` |
| supporting text | `--norux-color-foreground-muted` |
| input/control border | `--norux-color-border-strong` |
| divider border | `--norux-color-border-subtle` |
| primary accent/action | `--norux-color-action-primary` |
| selection/quiet accent | `--norux-color-action-soft` |
| focus | `--norux-color-focus-ring` |

## Unadopted consumer

Adopt Norux only when the user requested it or the scoped UI change clearly requires it. Copy `../assets/norux.css` from this skill into a consumer-owned generated/styles directory and import it once before application styles. Do not edit the copied file; replace it from a reviewed skill or design revision when updating.

Set `data-theme="light"` or `data-theme="dark"` on the document root. No attribute defaults to light. Load Pretendard Variable from a reviewed self-hosted dependency and keep its license; do not fetch fonts from a third party at runtime.

If adoption would broaden the request materially, report the missing token foundation and ask before migrating unrelated UI.

## Verification

Discover commands from the repository rather than assuming `pnpm` or script names. Run focused tests first and the consumer's normal gate when implementation changes warrant it.

For visual UI changes, verify:

- light and dark themes;
- keyboard traversal and activation;
- visible focus and accessible names;
- 44px pointer targets;
- 200% zoom and narrow viewport reflow;
- transparent icon edges and surface continuity;
- invalid, disabled, loading, empty, and error states that the component supports.
