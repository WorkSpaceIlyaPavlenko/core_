import { defineConfig } from 'tsup';
import path from "path";

export default defineConfig({
    entry: ['src/index.ts'],
    format: ['esm'],
    dts: true,
    clean: true,
    sourcemap: true,
    treeshake: true,

    esbuildOptions(options) {
        options.alias = {
            "@/core": path.resolve(__dirname, "src")
        };
    },
});
