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
        donationsByDonor: withAuth([], async (_parent, args, context) => { // Renamed for clarity, or adjust service call
            if (!context.user?.id) {
                throw new Error("User not authenticated");
            }
            // Corrected to use getDonationsByDonor
            return await donationService.getDonationsByDonor(context.user.id, args); 
        }),
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