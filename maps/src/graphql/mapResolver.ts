/**
 * Map Resolver with Data Service Integration
 * 
 * This file provides GraphQL resolvers for map-related functionality
 * using the consolidated data structure through the data service.
 */

import { withAuth } from '../../../backend/src/resolvers/authorization';
import dataService from '../../../backend/src/service/dataService';

/**
 * Map resolver that uses the data service
 * to access the consolidated data structure for map-related queries
 */
const resolver = {
  Query: {
    /**
     * Get charities with location data for map display
     * This resolver specifically formats data for map visualization
     */
    charitiesWithLocation: async (_parent, args) => {
      // Get charities from the data service
      const charities = await dataService.getCharities({
        skip: args.offset || 0,
        take: args.limit || 100, // Higher limit for map display
        where: args.sector ? { sector: args.sector } : {}
      });
      
      // Filter out charities without location data and format for map display
      return charities
        .filter(charity => 
          charity.address && 
          charity.address.lat && 
          charity.address.lng
        )
        .map(charity => ({
          id: charity.id,
          name: charity.name,
          description: charity.description,
          sector: charity.sector,
          location: {
            lat: charity.address.lat,
            lng: charity.address.lng,
            address: charity.address.address,
            city: charity.address.city,
            country: charity.address.country
          }
        }));
    },
    
    /**
     * Get a single charity with location data
     */
    charityLocationById: async (_parent, { id }) => {
      const charity = await dataService.getCharityById(id);
      
      if (!charity || !charity.address || !charity.address.lat || !charity.address.lng) {
        return null;
      }
      
      return {
        id: charity.id,
        name: charity.name,
        description: charity.description,
        sector: charity.sector,
        location: {
          lat: charity.address.lat,
          lng: charity.address.lng,
          address: charity.address.address,
          city: charity.address.city,
          country: charity.address.country
        }
      };
    }
  }
};

export default resolver;