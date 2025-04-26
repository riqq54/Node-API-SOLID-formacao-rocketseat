import { defineConfig } from "vitest/config"
import tsconfigPaths from "vite-tsconfig-paths"
import { loadEnv } from "vite"

export default defineConfig({
    plugins: [tsconfigPaths()],
    test:{
        coverage:{
            include:['src/**/*.{ts,spec.ts}']
        },
        dir: 'src',
        workspace: [
            {
                extends: true,
                test: {
                    name: 'unit',
                    dir: 'src/use-cases'
                }
            },
            {
                extends: true,
                test: {
                    name: 'e2e',
                    dir: 'src/http/controllers',
                    environment: './prisma/vitest-environment-prisma/prisma-test-environment.ts',
                    env : {
                        NODE_ENV: "test",
                        PORT: "3333",
                        DATABASE_URL: "postgresql://docker:docker@localhost:5432/apisolid?schema=public",
                    }
                }
            },
        ]
    }
})