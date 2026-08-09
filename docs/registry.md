# Registry

The public GitHub repository is a shadcn source registry. It needs no hosted registry service, credentials, package publishing, or generated registry endpoint.

Install a reviewed revision in a shadcn-compatible consumer:

```bash
pnpm dlx shadcn@latest add norux/design.md/norux-base#<commit-sha>
```

`norux-base` contains framework-neutral CSS tokens only. It has no runtime dependency and does not assume Tailwind or React.

When a React consumer needs an initial component, add one focused `registry:ui` item backed by Base UI. Include its accessible behavior and test fixture first; do not add a whole catalog. Validate source registry changes with:

```bash
pnpm registry:validate
```

No custom MCP is planned. Use the `norux-design` skill, these files, and the official shadcn MCP/CLI before documenting a concrete read-only workflow gap.
