import fastify from "fastify";
import { z, ZodError } from "zod";
import { usersRoutes } from "./http/controllers/users/routes";
import { env } from "./env";
import fastifyJwt from "@fastify/jwt";
import { gymsRoutes } from "./http/controllers/gyms/routes";

export const app = fastify()

app.register(fastifyJwt, {
    secret: env.JWT_SECRET
})

app.register(usersRoutes)
app.register(gymsRoutes)

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