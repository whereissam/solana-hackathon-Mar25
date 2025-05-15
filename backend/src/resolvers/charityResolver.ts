// Fix import path - assuming authorization is in the same directory
import { withAuth, isAdmin, any } from './authorization';
import charityService, { ICharityDetail } from '../service/charityService'; // Consolidated ICharityDetail import
import { uploadImage } from '../service/spacesService'; // Consolidated uploadImage import
import {
    Charity,
    CharityBeneficiariesArgs,
    MutationCreateBeneficiaryArgs,
    MutationCreateCharityArgs,
    QueryBeneficiaryArgs,
    QueryCharitiesArgs, // Added QueryCharitiesArgs based on usage
    InputAddress, // Assuming InputAddress is the type for location
    NewCharityAdmin // Assuming NewCharityAdmin is the type for charityAdmin
} from '../generated/graphql';
// Removed duplicate imports that were present in the error log

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
            // Convert id from number to string
            return await charityService.getBeneficiaryById(String(id));
        },
    },
    Charity: {
        beneficiaries: async (parent: Charity, args: CharityBeneficiariesArgs) => {
            // Convert parent.id from number to string
            return charityService.getBeneficiaries(String(parent.id), {
                skip: args.offset ?? 0,
                take: args.limit ?? 10
            });
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
                console.log(image);

                const serviceDetail: ICharityDetail = {
                    name,
                    description,
                    mission,
                    sector,
                    website,
                    // Use the correct property names from InputAddress
                    // If you're not sure what properties are available, use a more generic approach:
                    address: `${location.city || ''}, ${location.postcode || ''}, ${location.country || ''}`,
                    charityAdminId: typeof charityAdmin === 'object' ? (charityAdmin as any)?.id : charityAdmin,
                };
                
                const charity = await charityService.createCharity(serviceDetail);

                if (image) {
                    const { createReadStream, filename, mimetype, encoding } = await image;
                    await uploadImage(createReadStream(), filename, "charityImage/" + charity.id);
                }
                return charity;
            }),
        createBeneficiary: withAuth([isAdmin()], 
            async (_parent, { charityId, detail }) => {
                // Convert the charityId from number to string before passing to the service
                return await charityService.createBeneficiary(String(charityId), detail);
            }
        ),
    }
};

export default resolver;