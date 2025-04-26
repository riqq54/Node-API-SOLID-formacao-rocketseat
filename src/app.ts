import fastify from "fastify";
import { z, ZodError } from "zod";
import { prisma } from "./lib/prisma";
import { register } from "./http/controllers/register";
import { appRoutes } from "./http/routes";
import { env } from "./env";
import fastifyJwt from "@fastify/jwt";

export const app = fastify()

app.register(fastifyJwt, {
    secret: env.JWT_SECRET
})

app.register(appRoutes)

app.setErrorHandler((error, _req, res) => {
    if (error instanceof ZodError){
        return res.status(400)
                .send({ message: 'Validation Error.', issues: error.format()})
    }

    if (env.NODE_ENV != 'production'){
        console.error(error)
    } else {
        // Log to an external tool
    }

    return res.status(500).send({ message: 'Internal Server Error.'} )
})