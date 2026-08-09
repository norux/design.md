import { execFile } from "node:child_process";
import { promisify } from "node:util";

const exec = promisify(execFile);
const exports = [
  ["brand/social/norux-social.svg", "brand/social/norux-social.png"],
  ["brand/logo/norux-wordmark.svg", "brand/logo/norux-wordmark.png"],
  ["brand/logo/norux-app-icon.svg", "brand/logo/norux-app-icon.png"],
  ["brand/logo/norux-favicon-draft.svg", "brand/logo/norux-favicon-draft.png"]
] as const;

for (const [source, output] of exports) {
  await exec("sips", ["-s", "format", "png", source, "--out", output]);
  console.log(`Exported ${output}`);
}
