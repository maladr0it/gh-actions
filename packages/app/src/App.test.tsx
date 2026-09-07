import { version } from "@gh-actions/lib";
import { render, screen } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import { App } from "./App";

test("renders the library version from the workspace package", () => {
  const log = vi.spyOn(console, "log").mockImplementation(() => {});
  render(<App />);
  expect(screen.getByTestId("lib-version")).toHaveTextContent(version);
  expect(log).toHaveBeenCalledWith(`gh-actions-lib v${version}`);
  log.mockRestore();
});
