/**
 * Donation Resolver with Data Service Integration
 * 
 * This file demonstrates how to update the existing donation resolver to use the
 * consolidated data structure through the data service.
 */

import { withAuth } from './authorization';
import {
  QueryDonationsArgs,
  Donation,
  MutationCreateCryptoDonationArgs,
  PaymentStatus,
  DonationType,
  // QueryDonationsQueryVariables, // Example if you have specific query variables type
} from '../generated/graphql';
import dataService from '../service/dataService';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

/**
 * Updated donation resolver that uses the data service
 * to access the consolidated data structure
 */
const resolver = {
  Query: {
    /**
     * Get all donations
     * TODO: Add filtering, pagination, sorting
     */
    donations: async (_parent, args: QueryDonationsArgs /* or ExtendedQueryDonationsArgs if you use it */) => {
      // This is where you would implement the logic to fetch donations
      // For now, we'll just return a mock response
      const mockDonations: Donation[] = [
        // ... mock data
      ];

      // Example of how you might filter if charityId is part of args:
      // if ((args as ExtendedQueryDonationsArgs).charityId) {
      //   return mockDonations.filter(d => d.charityId === (args as ExtendedQueryDonationsArgs).charityId);
      // }
      // When calling actual service:
      // return donationService.getDonations({ 
      //   ...args, 
      //   where: { charityId: (args as ExtendedQueryDonationsArgs).charityId } 
      // });

      return mockDonations;
    },
    
    /**
     * Get a donation by ID
     */
    donation: async (_parent, { id }) => {
      const donations = await dataService.getDonations({
        skip: 0,
        take: 1,
        where: { id }
      });
      
      return donations.length > 0 ? donations[0] : null;
    },
  },
  
  Donation: {
    /**
     * Get the charity associated with a donation
     */
    charity: async (parent: Donation) => {
      // This assumes your GraphQL 'Donation' type has a 'charityId' field.
      // If not, you need to add it to your schema.graphql and regenerate types.
      // TypeScript error TS2339 indicates 'charityId' is not defined on 'parent'.
      // For a temporary workaround if you're sure it exists at runtime, you could use (parent as any).charityId
      // But the correct fix is to ensure the type definition is accurate.
      if (typeof (parent as any).charityId === 'number') {
        return await dataService.getCharityById((parent as any).charityId as number);
      }
      // console.error('Charity ID not found or invalid on donation parent:', parent);
      return null; // Or handle error appropriately
    },
  },
  
  Mutation: {
    /**
     * Create a new donation
     */
    createDonation: withAuth([],
      async (_parent, args: MutationCreateCryptoDonationArgs, { userId }) => {
        const { beneficiaryId, amountInLamports, tokenCode } = args; // beneficiaryId here is likely the charityId or a direct beneficiary string ID
        
        const mockDonation = {
          id: String(Date.now()) + String(Math.random()), 
          amount: BigInt(amountInLamports), 
          currency: tokenCode,            
          type: DonationType.Crypto,       
          status: PaymentStatus.Pending,
          charityId: beneficiaryId, // Assuming beneficiaryId is the string ID for the charity or beneficiary
          userId: userId, // userId from context should also be a string
          createdAt: new Date(),
          message: null, 
          anonymous: false 
        };
        
        return mockDonation as unknown as Donation; 
      }
    ),
  }
};

export default resolver;