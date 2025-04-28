import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credentials-error";
import { makeAuthenticateUseCase } from "@/use-cases/factories/make-authenticate-use-case";

export async function refresh(req: FastifyRequest, res: FastifyReply) {

    await req.jwtVerify({ onlyCookie: true })

    const { role } = req.user

    const token = await res.jwtSign(
        {
            role
        },
        { 
            sign: {
                sub: req.user.sub
            }
        }
    )

    const refreshToken = await res.jwtSign(
        {
            role
        },
        { 
            sign: {
                sub: req.user.sub,
                expiresIn: '7d'
            }
        }
    )

    return res
    .setCookie('refreshToken', refreshToken, {
        path: '/',
        secure: true,
        sameSite: true,
        httpOnly: true
    })
    .status(200)
    .send({ token })

}