import { kebabCase } from "lodash-es";
import { version } from "./version.generated";

export { version };

export function printVersion(): string {
  const line = `${kebabCase("@gh-actions/lib-a")} v${version}`;
  console.log(line);
  return line;
}
