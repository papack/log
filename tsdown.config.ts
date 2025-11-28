import { defineConfig } from "tsdown";

export default defineConfig([
  {
    entry: ["./core/index.ts"],
    format: "esm",
    outDir: "dist",
    minify: true,
    dts: {
      sourcemap: true,
    },
  },
  {
    entry: ["./core/index.ts"],
    format: "cjs",
    outDir: "dist",
    minify: true,
  },
]);
