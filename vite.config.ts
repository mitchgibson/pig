/// <reference types="vitest" />
import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import tsConfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/guide/build.html#library-mode
export default defineConfig(({mode}) => ({
    mode: mode,
    plugins: [
        tsConfigPaths(),
        dts({
            include: ["src"],
            exclude: ["**/__tests__/**/*"],
        }),
    ],
    build: {
        lib: {
            entry: {
                index: resolve(__dirname, "src/index.ts"),
            },
            name: "pig-fwk",
            formats: ["es", "cjs"],
        },
        sourcemap: true,
        minify: mode !== "development",
    },
    test: {
        threads: true,
        include: ["src/**/__tests__/**/*.spec.ts"],
    },
}));
