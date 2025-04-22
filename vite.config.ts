import { defineConfig } from "vitest/config"
import tsconfigPaths from "vite-tsconfig-paths"

export default defineConfig({
    plugins: [tsconfigPaths()],
    test:{
        coverage:{
            include:['src/**/*.{ts,spec.ts}']
        }
    }
})