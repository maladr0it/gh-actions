import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const dir = dirname(fileURLToPath(import.meta.url));
const pkgPath = process.argv[2] ?? join(dir, "..", "package.json");
const out = process.argv[3] ?? join(dir, "..", "src", "version.generated.ts");
const pkg = JSON.parse(readFileSync(pkgPath, "utf8")) as { version: string };

mkdirSync(dirname(out), { recursive: true });
writeFileSync(
  out,
  `\
/** Generated — do not edit. */
export const version = ${JSON.stringify(pkg.version)};
`,
);
