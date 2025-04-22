import { Gym, Prisma } from "../../prisma/generated/prisma";

export interface GymsRepository {
    findById(id: string): Promise<Gym | null>
    create(data: Prisma.GymCreateInput): Promise<Gym>
}