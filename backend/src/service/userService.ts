import prisma from '../repository/prisma'
import { Prisma } from '@prisma/client'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import bcrypt from 'bcrypt'
import { createJWT } from './auth'

export async function hashPassword(password){
    return await bcrypt.hash(password, bcrypt.genSaltSync())
}

const userService = {
    login: async (email: string, password: string) => {
        const user = await prisma.users.findFirstOrThrow({
            where: {
                email: email
            }
        })

        if (!user.password || !(await bcrypt.compare(password, user.password))){
            throw "INVALID_PASSWORD"
        }
        return {
            user,
            token: createJWT(user)
        }
    }
}

export default userService