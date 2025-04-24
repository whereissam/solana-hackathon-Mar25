import prisma from '../repository/prisma'
import { Prisma } from '@prisma/client'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import bcrypt from 'bcrypt'
import { createJWT } from './auth'

export async function hashPassword(password) {
    return await bcrypt.hash(password, bcrypt.genSaltSync())
}

const userService = {
    login: async (email: string, password: string) => {
        const user = await prisma.users.findFirstOrThrow({
            where: {
                email: email
            }
        })

        if (!user.password || !(await bcrypt.compare(password, user.password))) {
            throw "INVALID_PASSWORD"
        }
        return {
            user,
            token: createJWT(user)
        }
    },
    loginWithWallet: async (walletAddress: string) => {
        const user = await prisma.users.findFirstOrThrow({
            where: {
                wallet_address: walletAddress
            }
        })
        return {
            user,
            token: createJWT(user)
        }
    },
    createWalletUser: async (walletAddress: string) => {
        return await prisma.users.create({
            data: {
                wallet_address: walletAddress,
                agree_to_terms: true,
                role: 'donor',
                status: 'active'
            }
        });
    },
    getWalletUserIdOrCreate: async (walletAddress: string) => {
        let userId = -1
        try {
            const user = await prisma.users.findFirstOrThrow({
                where: { wallet_address: walletAddress }
            })
            userId = user.id
        }catch {
            const user = await userService.createWalletUser(walletAddress)
            userId = user.id
        }
        return userId
    },
}

export default userService