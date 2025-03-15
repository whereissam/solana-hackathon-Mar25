import charityService from '../service/charityService'
import { MutationLoginArgs, MutationResolvers, AuthPayload, RoleType } from '../generated/graphql'
import { valueToEnum } from '../utils/valueToEnum'
import { withAuth, falseFunc, trueFunc, inRole, any, all } from './authorization'
import {QueryCharitiesArgs, CharityBeneficiariesArgs, Charity} from '../generated/graphql'

const resolver = {
    Query:{
        charities: async (_parent, args: QueryCharitiesArgs) => {
            return charityService.getCharities({
                skip: args.offset,
                take: args.limit
            })
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
}

export default resolver