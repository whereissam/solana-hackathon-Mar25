import charityService from '../service/charityService'
import { MutationLoginArgs, MutationResolvers, AuthPayload, RoleType } from '../generated/graphql'
import { valueToEnum } from '../utils/valueToEnum'
import { withAuth, isAdmin, inRole, any, isEqUserId } from './authorization'
import { MutationCreateCryptoDonationArgs, QueryDonationsArgs } from '../generated/graphql'
import donationService from '../service/donationService'
import { DonationStatus } from '@prisma/client'

const resolver = {
    Query: {
        donations: withAuth([isAdmin(), isEqUserId("donorId")],
            async (_parent, args: QueryDonationsArgs, context) => {
            return await donationService.getDonations(context.user.id, 
                {
                    where: {
                        status: DonationStatus.completed,
                    },
                    orderBy: {
                        created_at: 'desc'
                    }
                }
            )
        })
    },
    Mutation: {
        createCryptoDonation: async (_parent, args: MutationCreateCryptoDonationArgs, context)=>{
            return donationService.createCryptoDonation(
                context.user.id,
                args.beneficiaryId,
                args.amountInLamports,
                args.tokenCode
            )
        },
        cryptoPaymentCompleted: async (_parent, args, context)=>{
            return donationService.cryptoPaymentCompleted(args.donationId, args.txHash)
        }
    },
}

export default resolver