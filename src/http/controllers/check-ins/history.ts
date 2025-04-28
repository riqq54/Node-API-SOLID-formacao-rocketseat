import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeFetchUsersCheckInsHistoryUseCase } from "@/use-cases/factories/make-fetch-users-check-ins-history-use-case";

export async function history(req: FastifyRequest, res: FastifyReply) {

    const checkInHistoryQuerySchema = z.object({
        page: z.coerce.number().min(1).default(1)
    })

    const { page } = checkInHistoryQuerySchema.parse(req.query);

    const fetchUsersCheckInsHistoryUseCase = makeFetchUsersCheckInsHistoryUseCase()

    const { checkIns } = await fetchUsersCheckInsHistoryUseCase.execute({
        userId: req.user.sub,
        page
    })

    return res.status(200).send({ checkIns })
}