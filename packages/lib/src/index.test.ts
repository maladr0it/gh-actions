import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { expect, test, vi } from "vitest";
import { printVersion, version } from "./index";

const packageJson = JSON.parse(
  readFileSync(
    join(dirname(fileURLToPath(import.meta.url)), "..", "package.json"),
    "utf8",
  ),
) as { version: string };

test("version matches package.json", () => {
  expect(version).toBe(packageJson.version);
});

test("printVersion logs and returns the version line", () => {
  const log = vi.spyOn(console, "log").mockImplementation(() => {});
  expect(printVersion()).toBe(`@gh-actions/lib v${version}`);
  expect(log).toHaveBeenCalledWith(`@gh-actions/lib v${version}`);
  log.mockRestore();
});
