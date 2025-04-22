import { UserAlreadyExistsError } from "@/use-cases/errors/user-already-exists-error"
import { UsersRepository } from "@/repositories/users-repository"
import { hash } from "bcryptjs"
import { User } from "../../prisma/generated/prisma"

interface registerUseCaseParams{
    name: string,
    email: string,
    password: string,
}

interface registerUseCaseResponse {
    user: User
}

export class RegisterUseCase{

    constructor(private usersRepository: UsersRepository){}

    async execute ({name, email, password}: registerUseCaseParams): Promise<registerUseCaseResponse>{
        
        const password_hash = await hash(password, 6)

        const userWithSameEmail = await this.usersRepository.findByEmail(email)

        if (userWithSameEmail){
            throw new UserAlreadyExistsError()
        }

        const user = await this.usersRepository.create({
                name,
                email,
                password_hash
        })

        return { user }

    }
}