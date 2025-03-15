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
        return prisma.users.findMany({
            where: {
                charity_id_recipient: charityId,
            },
            ...args
        })
    }
}


export default charityService