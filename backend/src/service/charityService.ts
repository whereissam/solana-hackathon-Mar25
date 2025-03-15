import prisma from '../repository/prisma'
import { Prisma } from '@prisma/client'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'

const charityService = {
    getCharities: (args: Prisma.charityFindManyArgs) => {
        return prisma.charity.findMany({
            ...args
        })
    },
    getBeneficiaries: (charityId: number, args) => {
        return prisma.charity.findUnique({
            where: {
                id: charityId,
            },
        }).user_recipient({
            ...args
        })
    }
}


export default charityService