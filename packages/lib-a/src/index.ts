import { kebabCase } from "lodash-es";
import { version } from "./version.generated.js";

export { version };

export function printVersion(): string {
  const line = `${kebabCase("@gh-actions/lib-a")} v${version}`;
  console.log(line);
  return line;
}
