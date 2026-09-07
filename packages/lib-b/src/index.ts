import { version as libAVersion } from "@gh-actions/lib-a";
import { version } from "./version.generated";

export { libAVersion, version };

export function printVersion(): string {
  const line = `gh-actions-lib-b v${version} (lib-a v${libAVersion})`;
  console.log(line);
  return line;
}
