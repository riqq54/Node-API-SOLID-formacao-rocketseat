import fastify from "fastify";
import { z, ZodError } from "zod";
import { prisma } from "./lib/prisma";
import { register } from "./http/controller/register";
import { appRoutes } from "./http/routes";
import { env } from "./env";

export const app = fastify()

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