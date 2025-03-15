import prisma from '../repository/prisma'
import { Prisma } from '@prisma/client'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import bcrypt from 'bcrypt'
import { createJWT } from './auth'

class UserService {
    async login(email: string, password: string){
        const user = await prisma.users.findFirstOrThrow({
            where: {
                email: email
            }
        })

        if (!user.password || await bcrypt.compare(password, user.password)){
            throw "INVALID_PASSWORD"
        }
        return {
            user,
            token: createJWT(user)
        }
    }
}

const userService = new UserService()
export default userService