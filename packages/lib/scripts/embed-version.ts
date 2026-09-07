import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const dir = dirname(fileURLToPath(import.meta.url));
const pkg = JSON.parse(
  readFileSync(join(dir, "..", "package.json"), "utf8"),
) as { version: string };

const out = join(dir, "..", "src", "version.generated.ts");
writeFileSync(
  out,
  `/** Generated from package.json by scripts/embed-version.ts — do not edit. */\nexport const version = ${JSON.stringify(pkg.version)};\n`,
);
