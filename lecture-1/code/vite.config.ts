import { defineConfig, lazyPlugins } from "vite-plus";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import { resolve } from "node:path";

export default defineConfig({
  plugins: lazyPlugins(() => {
    const routerPlugin = tanstackRouter({ target: "react" });
    return Array.isArray(routerPlugin) ? routerPlugin : [routerPlugin];
  }),
  resolve: {
    alias: { "@": resolve(__dirname, "./src") },
  },
  server: {
    port: 3000,
  },
  lint: {
    ignorePatterns: ["dist/**", "node_modules/**"],
    plugins: ["react", "typescript", "oxc"],
    rules: {
      "react/rules-of-hooks": "error",
    },
    options: {
      typeAware: true,
      typeCheck: true,
    },
  },
  fmt: {},
  staged: {
    "*": "vp check --fix",
  },
});
