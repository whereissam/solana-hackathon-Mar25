/**
 * Charity Resolver with Data Service Integration
 * 
 * This file demonstrates how to update the existing charity resolver to use the
 * consolidated data structure through the data service.
 */

import { withAuth, isAdmin } from './authorization';
import {
  QueryCharitiesArgs,
  CharityBeneficiariesArgs,
  Charity,
  MutationCreateCharityArgs,
  MutationCreateBeneficiaryArgs,
  QueryBeneficiaryArgs
} from '../generated/graphql';
import { uploadImage } from '../service/spacesService';
import dataService from '../service/dataService';

/**
 * Updated charity resolver that uses the data service
 * to access the consolidated data structure
 */
const resolver = {
  Query: {
    /**
     * Get charities based on query parameters
     */
    charities: async (_parent, args: QueryCharitiesArgs) => {
      return await dataService.getCharities({
        skip: args.offset,
        take: args.limit,
        where: args.id ? { id: args.id } : {}
      });
    },
    
    /**
     * Get a beneficiary by ID
     */
    beneficiary: async (_parent, { id }: QueryBeneficiaryArgs) => {
      return await dataService.getBeneficiaryById(id);
    },
  },
  
  Charity: {
    /**
     * Get beneficiaries for a charity
     */
    beneficiaries: async (parent: Charity, args: CharityBeneficiariesArgs) => {
      return dataService.getBeneficiaries(parent.id, {
        skip: args.offset,
        take: args.limit
      });
    },
    
    /**
     * Get address for a charity
     */
    address: (parent) => {
      return {
        ...parent
      };
    },
  },
  
  Mutation: {
    /**
     * Create a new charity
     */
    createCharity: withAuth([isAdmin()],
      async (_parent, { detail: { charityAdmin, name, description, location, mission, sector, website, image } }: MutationCreateCharityArgs) => {
        // This is where you would implement the logic to create a new charity
        // For now, we'll just return a mock response
        
        // In a real implementation, you would:
        // 1. Create the charity in your data store
        // 2. Upload the image if provided
        // 3. Return the created charity
        
        const mockCharity = {
          id: Math.floor(Math.random() * 1000) + 10, // Generate a random ID
          name,
          description,
          mission,
          sector,
          website,
          address: {
            ...location,
            lat: 0, // These would be set by geocoding in a real implementation
            lng: 0
          }
        };
        
        return mockCharity;
      }
    ),
    
    /**
     * Create a new beneficiary for a charity
     */
    createBeneficiary: withAuth([isAdmin()],
      async (_parent, { detail }: MutationCreateBeneficiaryArgs) => {
        // This is where you would implement the logic to create a new beneficiary
        // For now, we'll just return a mock response
        
        const mockBeneficiary = {
          id: Math.floor(Math.random() * 1000) + 10, // Generate a random ID
          email: detail.email,
          first_name: detail.first_name,
          last_name: detail.last_name
        };
        
        return mockBeneficiary;
      }
    ),
  }
};

export default resolver;