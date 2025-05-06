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
  MutationCreateDonationArgs,
  PaymentStatus
} from '../generated/graphql';
import dataService from '../service/dataService';

/**
 * Updated donation resolver that uses the data service
 * to access the consolidated data structure
 */
const resolver = {
  Query: {
    /**
     * Get donations based on query parameters
     */
    donations: async (_parent, args: QueryDonationsArgs) => {
      return await dataService.getDonations({
        skip: args.offset || 0,
        take: args.limit || 30,
        where: {
          userId: args.userId,
          charityId: args.charityId
        }
      });
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
      return await dataService.getCharityById(parent.charityId);
    },
  },
  
  Mutation: {
    /**
     * Create a new donation
     */
    createDonation: withAuth([],
      async (_parent, { detail }: MutationCreateDonationArgs, { userId }) => {
        // This is where you would implement the logic to create a new donation
        // For now, we'll just return a mock response
        
        // In a real implementation, you would:
        // 1. Process the payment
        // 2. Create the donation record
        // 3. Return the created donation
        
        const mockDonation = {
          id: Math.floor(Math.random() * 1000) + 10, // Generate a random ID
          amount: detail.amount,
          currency: detail.currency,
          type: detail.type,
          status: PaymentStatus.Pending,
          charityId: detail.charityId,
          userId: userId,
          createdAt: new Date(),
          message: detail.message,
          anonymous: detail.anonymous || false
        };
        
        return mockDonation;
      }
    ),
  }
};

export default resolver;