# Visual fixtures

`fixtures/foundations.html` exercises light and dark semantic tokens, focus-visible styles, touch controls, transparent icons, the styled native Select, code treatment, error state, and dialog behavior.

```bash
python3 -m http.server 4173 --directory .
```

Inspect both URLs at desktop and narrow mobile widths:

```text
http://localhost:4173/fixtures/foundations.html?theme=light
http://localhost:4173/fixtures/foundations.html?theme=dark
```

Use the browser keyboard to tab through controls, change the Select, open and close the dialog, and test both theme states. Add a focused fixture before introducing a new component behavior or visual regression risk.
