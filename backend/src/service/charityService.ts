import prisma from '../repository/prisma'; // This should be your Prisma Client instance
import { Prisma, PrismaClient } from '@prisma/client'; // Import Prisma types and PrismaClient itself

// Import the CharitySector enum from your GraphQL generated types
// Removed NewBeneficiaryInput as it's not exported. See note above.
import { CharitySector as GQLCharitySector, QueryBeneficiaryArgs } from '../generated/graphql'; 

// Interface mentioned in the error log (ensure it matches your actual interface)
// The 'sector' type should align with your GraphQL schema.
export interface ICharityDetail {
    name: string;
    description: string;
    mission?: string;
    sector: GQLCharitySector; // Use the imported GQLCharitySector
    address?: string; // Will be stringified location
    website?: string;
    charityAdminId?: string; // Changed from number to string for MongoDB ObjectId
}

const charityService = {
    getCharities: (args: Prisma.CharityFindManyArgs) => {
        // If TS2694 persists after 'npx prisma generate', double-check your 'Charity' model name in schema.prisma
        return prisma.charity.findMany(args);
    },

    getCharityById: (charityId: string, args?: Prisma.CharityFindUniqueArgs) => { // Changed charityId to string
        // If TS2694 persists after 'npx prisma generate', double-check your 'Charity' model name in schema.prisma
        return prisma.charity.findUnique({ where: { id: charityId }, ...args });
    },

    createCharity: async (detail: ICharityDetail) => {
        // Map GQLCharitySector to what Prisma expects if they are different
        // This assumes Prisma's Charity model has a 'sector' field compatible with GQLCharitySector values.
        // Also assumes a field like 'charityAdminId' or a relation for it exists on the Prisma Charity model.
        return prisma.charity.create({
            data: {
                name: detail.name,
                description: detail.description,
                mission: detail.mission,
                sector: detail.sector, 
                address: detail.address,
                website: detail.website,
                charityAdminId: detail.charityAdminId, // Will now be a string
            },
        });
    },

    // Added missing beneficiary methods
    getBeneficiaryById: async (beneficiaryId: string, args?: Prisma.BeneficiaryFindUniqueArgs) => { // Changed beneficiaryId to string
        // Assumes a 'Beneficiary' model in your Prisma schema.
        // If TS error for BeneficiaryFindUniqueArgs, ensure 'npx prisma generate' and correct model name.
        return prisma.beneficiary.findUnique({ where: { id: beneficiaryId }, ...args });
    },

    getBeneficiaries: async (charityId: string, args: { skip?: number, take?: number }) => { // Changed charityId to string
        // Assumes 'Beneficiary' model has a 'charityId' field or relation to 'Charity'.
        return prisma.beneficiary.findMany({
            where: { charityId: charityId }, // Adjust if relation is named differently
            skip: args.skip,
            take: args.take,
        });
    },

    // Changed 'detail: NewBeneficiaryInput' to 'detail: any' as a temporary workaround.
    // Ideally, define NewBeneficiaryInput in your GraphQL schema and regenerate types.
    createBeneficiary: async (charityId: string, detail: any) => { // Changed charityId to string
        // Assumes 'Beneficiary' model in your Prisma schema and
        // NewBeneficiaryInput fields map to Beneficiary model fields.
        return prisma.beneficiary.create({
            data: {
                ...detail, // Spread fields from NewBeneficiaryInput (e.g., email, first_name, last_name)
                charity: { // Assuming a relation named 'charity' on the Beneficiary model
                    connect: { id: charityId }
                }
                // If not using a relation, it might be: charityId: charityId,
            }
        });
    },
};

export default charityService;

// IMPORTANT:
// 1. Remove any line like 'const prisma = new PrismaClient();' from this file
//    to resolve the TS2440 conflict with the import on line 1.
// 2. If there's a local 'enum CharitySector { ... }' defined in this file,
//    either update it to include all necessary values (like 'Animals') or remove it
//    and use GQLCharitySector consistently.