import charityService from '../service/charityService'
import { MutationLoginArgs, MutationResolvers, AuthPayload, RoleType, MutationCreateCryptoDonationArgs, QueryDonationsArgs } from '../generated/graphql'
import { valueToEnum } from '../utils/valueToEnum'
import { withAuth, isAdmin, inRole, any, isEqUserId } from './authorization'
import donationService from '../service/donationService'
// Remove the import from @prisma/client and define enum locally if needed
// Define the enum locally to match what's in the GraphQL schema
import { DonationStatus } from '../generated/graphql'

const resolver = {
    Query: {

        donations: withAuth([isAdmin(), isEqUserId("donorId")],
            async (_parent, args: QueryDonationsArgs, context) => {
            return await donationService.getDonations(
                args.donorId || context.user.id, args.completed?? true,
                {
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
                // Convert beneficiaryId from number to string
                String(args.beneficiaryId),
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