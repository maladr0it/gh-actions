import react from "@vitejs/plugin-react";
import { playwright } from "@vitest/browser-playwright";
import { defaultExclude, defineConfig } from "vitest/config";

const vrtPattern = "**/*.vrt.test.{ts,tsx}";
const compareScreenshots = process.platform === "linux";

export default defineConfig({
  plugins: [react()],
  test: {
    projects: [
      {
        test: {
          name: "unit",
          environment: "jsdom",
          globals: true,
          setupFiles: "./src/test-setup.ts",
          exclude: [vrtPattern, ...defaultExclude],
        },
      },
      {
        test: {
          name: "vrt",
          include: [vrtPattern],
          browser: {
            enabled: true,
            headless: true,
            provider: playwright(),
            instances: [
              {
                browser: "chromium",
                viewport: { width: 1280, height: 720 },
              },
            ],
          },
        },
        define: {
          "import.meta.env.VITE_COMPARE_SCREENSHOTS": JSON.stringify(
            compareScreenshots ? "true" : "false",
          ),
        },
      },
    ],
  },
});
