import charityService from '../service/charityService'
import { MutationLoginArgs, MutationResolvers, AuthPayload, RoleType } from '../generated/graphql'
import { valueToEnum } from '../utils/valueToEnum'
import { withAuth, isAdmin, inRole } from './authorization'
import { QueryCharitiesArgs, CharityBeneficiariesArgs, Charity, MutationCreateCharityArgs } from '../generated/graphql'

const resolver = {
    Query: {
        charities: async (_parent, args: QueryCharitiesArgs) => {
            return (await charityService.getCharities({
                skip: args.offset,
                take: args.limit
            })).map((charity) => ({
                ...charity,
                address: {
                    ...charity
                }
            }))
        }
    },
    Charity: {
        beneficiaries: async (parent: Charity, args: CharityBeneficiariesArgs) => {
            return charityService.getBeneficiaries(parent.id, {
                skip: args.offset,
                take: args.limit
            })
        }
    },
    Mutation: {
        createCharity: withAuth([isAdmin()],
            async (_parent, { detail: { charityAdmin, name, description, address } }: MutationCreateCharityArgs) => {
                console.log()
                const charity = await charityService.createCharity(charityAdmin,
                    {
                        name,
                        description,
                        ...address
                    })
                return charity
            })
    }
}

export default resolver