import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  // Bazel copies sources into bazel-out as symlinks into the execroot. Vite 8 /
  // Rolldown otherwise emit HTML with a `../execroot/...` filename and fail.
  resolve: {
    preserveSymlinks: true,
  },
  build: {
    rollupOptions: {
      input: "index.html",
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/test-setup.ts",
  },
});
