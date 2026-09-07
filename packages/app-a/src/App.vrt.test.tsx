import { version } from "@gh-actions/lib-a";
import { expect, test } from "vitest";
import { render } from "vitest-browser-react";
import { App } from "./App";
import "./index.css";

test("home", async () => {
  const screen = await render(<App />);

  await expect
    .element(screen.getByText("app-a · @gh-actions/lib-a"))
    .toBeVisible();
  await expect
    .element(screen.getByRole("heading"))
    .toHaveTextContent(`v${version}`);
  await expect
    .element(screen.getByText(/consuming @gh-actions\/lib-a/))
    .toBeVisible();

  if (import.meta.env.VITE_COMPARE_SCREENSHOTS === "true") {
    await expect(screen.getByRole("main")).toMatchScreenshot("home");
  }
});
