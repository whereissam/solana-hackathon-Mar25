import charityService from '../service/charityService'
import { MutationLoginArgs, MutationResolvers, AuthPayload, RoleType } from '../generated/graphql'
import { valueToEnum } from '../utils/valueToEnum'
import { withAuth, isAdmin, inRole, any, isEqUserId } from './authorization'
import {
    QueryCharitiesArgs, CharityBeneficiariesArgs,
    Charity, MutationCreateCharityArgs, MutationCreateBeneficiaryArgs,
    QueryBeneficiaryArgs
} from '../generated/graphql'
import { uploadImage } from '../service/spacesService'

const resolver = {
    Query: {
        charities: async (_parent, args: QueryCharitiesArgs) => {
            let query = {
                skip: args.offset,
                take: args.limit,
                where: {}
            }
            if (args.id)
                query.where = { id: args.id }
            return await charityService.getCharities(query)
        },
        beneficiary: async (_parent, { id }: QueryBeneficiaryArgs) => {
            return await charityService.getBeneficiaryById(id)
        },
    },
    Charity: {
        beneficiaries: async (parent: Charity, args: CharityBeneficiariesArgs) => {
            return charityService.getBeneficiaries(parent.id, {
                skip: args.offset,
                take: args.limit
            })
        },
        address: (parent) => {
            return {
                ...parent
            }
        },
    },
    Mutation: {
        createCharity: withAuth([isAdmin()],
            async (_parent, { detail: { charityAdmin, name, description, location, mission, sector, website, image } }: MutationCreateCharityArgs) => {
                console.log(image)
                const charity = await charityService.createCharity(charityAdmin,
                    {
                        name,
                        description,
                        mission,
                        sector,
                        website,
                        ...location
                    })

                if (image) {
                    const { createReadStream, filename, mimetype, encoding } = await image;
                    await uploadImage(createReadStream(), filename, "charityImage/" + charity.id)
                }
                return charity
            }),
        createBeneficiary: withAuth([any(isAdmin())],
            async (_parent, { charityId, detail }: MutationCreateBeneficiaryArgs) => {
                return await charityService.createBeneficiary({
                    charityId, detail
                })
            }
        ),
    }
}

export default resolver