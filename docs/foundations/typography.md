# Typography

Use Pretendard Variable for prose and UI. The approved source is `pretendard@1.3.9`, licensed under SIL OFL 1.1. A consumer self-hosts the font through its own bundled dependency, keeping the upstream license alongside any redistributed font files.

```bash
pnpm add pretendard@1.3.9
```

Then import its variable-font stylesheet before application styles. Keep the fallback stack from `--norux-font-sans`; do not fetch a third-party font at runtime.

Use `--norux-typography-body-lg-*` for long-form prose and keep its measure at `--norux-size-reading-measure`. Use the generated `code-md` tokens only for authored code and technical identifiers.
