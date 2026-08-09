import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const source = await readFile(resolve("docs/components/README.md"), "utf8");
const target = resolve("skills/norux-design/references/components.md");
const generated = `<!-- Generated from docs/components/README.md. Do not edit. -->\n\n${source}`;

if (process.argv.includes("--check")) {
  if (await readFile(target, "utf8") !== generated) {
    throw new Error("skills/norux-design/references/components.md is out of date. Run pnpm generate.");
  }
  console.log("Checked skills/norux-design/references/components.md");
} else {
  await writeFile(target, generated);
  console.log("Generated skills/norux-design/references/components.md");
}
