import { env } from "@/env";
import { prisma } from "@/lib/prisma";
import { execSync } from "node:child_process";
import { randomUUID } from "node:crypto";
import { Environment } from "vitest/environments";


function generateDatabaseUrl(schema: string){

    const url = new URL(env.DATABASE_URL)

    url.searchParams.set('schema', schema)

    return url.toString()
}


export default <Environment>{
    name: 'prisma',
    transformMode: 'ssr',
    async setup(){

        const schema = randomUUID()
        const databaseUrl = generateDatabaseUrl(schema)

        env.DATABASE_URL = databaseUrl
        process.env.DATABASE_URL = databaseUrl

        execSync('npx prisma migrate deploy')

        return {
            async teardown(){

                await prisma.$executeRawUnsafe(
                    `DROP SCHEMA IF EXISTS "${schema}" CASCADE`
                )

                await prisma.$disconnect()

            }
        }
    }
}