/** Keep in sync with package.json — `index.test.ts` enforces this. */
export const version = "0.1.0";

export function printVersion(): string {
  const line = `@gh-actions/lib v${version}`;
  console.log(line);
  return line;
}
