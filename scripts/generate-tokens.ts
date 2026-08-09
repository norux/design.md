import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { createTokenArtifacts } from "./token-artifacts.ts";

const artifacts = await createTokenArtifacts();
const files = [
  ["packages/tokens/css/norux.css", artifacts.css],
  ["packages/tokens/src/norux.tokens.json", artifacts.dtcg],
  ["packages/tokens/ts/index.ts", artifacts.typescript],
  ["registry/norux-base/norux.css", artifacts.css]
] as const;

for (const [file, content] of files) {
  const output = resolve(file);
  await mkdir(dirname(output), { recursive: true });
  await writeFile(output, content);
  console.log(`Generated ${file}`);
}
