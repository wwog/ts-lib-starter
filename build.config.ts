import { defineBuildConfig } from "unbuild";
/* Only ESModule */
export default defineBuildConfig({
  // If entries is not provided, will be automatically inferred from package.json
  entries: [
    // default
    "./src/index",
    // mkdist builder transpiles file-to-file keeping original sources structure
    // {
    //   builder: "mkdist",
    //   input: "./src/package/components/",
    //   outDir: "./build/components",
    // },
  ],
  clean: true,
  declaration: true,
  rollup: {
    emitCJS: false,
    output: {
      format: "esm",
      entryFileNames: "[name].js",
    },
    esbuild: {
      minify: true,
    },
  },
});
