/// <reference types='vitest' />
import path from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig(() => {
  return {
    root: __dirname,
    cacheDir: "./node_modules/.vite",
    plugins: [
      dts({
        entryRoot: "src",
        tsconfigPath: path.join(__dirname, "tsconfig.lib.json"),
      }),
    ],
    // Configuration for building your library.
    // See: https://vitejs.dev/guide/build.html#library-mode
    build: {
      outDir: "./dist",
      emptyOutDir: true,
      reportCompressedSize: true,
      lib: {
        // Could also be a dictionary or array of multiple entry points.
        entry: "src/index.ts",
        fileName: "index",
        // Change this to the formats you want to support.
        // Don't forget to update your package.json as well.
        formats: ["es" as const],
      },
    },
    test: {
      watch: false,
      globals: true,
      environment: "node",
      include: ["{src,tests}/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
      reporters: ["default"],
      coverage: {
        reportsDirectory: "./test-output/vitest/coverage",
        provider: "v8" as const,
      },
    },
  };
});
