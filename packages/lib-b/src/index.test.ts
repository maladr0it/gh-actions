import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { expect, test, vi } from "vitest";
import { libAVersion, printVersion, version } from "./index";

const packageJson = JSON.parse(
  readFileSync(
    join(dirname(fileURLToPath(import.meta.url)), "..", "package.json"),
    "utf8",
  ),
) as { version: string };

test("version matches package.json", () => {
  expect(version).toBe(packageJson.version);
});

test("printVersion logs lib-b and the lib-a version it depends on", () => {
  const log = vi.spyOn(console, "log").mockImplementation(() => {});
  expect(printVersion()).toBe(
    `gh-actions-lib-b v${version} (lib-a v${libAVersion})`,
  );
  expect(log).toHaveBeenCalledWith(
    `gh-actions-lib-b v${version} (lib-a v${libAVersion})`,
  );
  log.mockRestore();
});
