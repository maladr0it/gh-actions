import { libAVersion, version } from "@gh-actions/lib-b";
import { render, screen } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import { App } from "./App";

test("renders the lib-b version and logs the lib-a dependency", () => {
  const log = vi.spyOn(console, "log").mockImplementation(() => {});
  render(<App />);
  expect(screen.getByTestId("lib-b-version")).toHaveTextContent(version);
  expect(log).toHaveBeenCalledWith(
    `gh-actions-lib-b v${version} (lib-a v${libAVersion})`,
  );
  log.mockRestore();
});
