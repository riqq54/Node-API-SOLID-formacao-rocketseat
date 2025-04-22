import { prisma } from "@/lib/prisma";
import { UsersRepository } from "../users-repository";
import { Prisma, User } from "../../../prisma/generated/prisma";

export class PrismaUserRepository implements UsersRepository{
    
    findById(id: string): Promise<User | null> {
        throw new Error("Method not implemented.");
    }

    async findByEmail(email: string){
        const user = await prisma.user.findUnique({
            where:{
                email,
            }
        })

        return user
    }

    async create(data: Prisma.UserCreateInput){
        const user = prisma.user.create({
            data
        })

        return user
    }
}