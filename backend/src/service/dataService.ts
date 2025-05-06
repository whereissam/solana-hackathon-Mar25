/**
 * Data Service
 * 
 * This service provides an interface between GraphQL resolvers and the consolidated data structure.
 * It allows for seamless integration of the centralized data with the GraphQL API.
 */

// Import types from GraphQL generated code
import { Charity, CharityUser, Address, CharitySector } from '../generated/graphql';

// Import data from consolidated data structure
// Note: These imports should be updated to point to the actual location of your data files
// after completing the data migration
import { charityData } from '../../../frontend/src/components/data/charities/data';
import { donationData } from '../../../frontend/src/components/data/donate/data';

/**
 * Data service for accessing and manipulating consolidated data
 */
export const dataService = {
  /**
   * Get charities based on query parameters
   * @param query Query parameters including pagination and filters
   * @returns Array of charities matching the query
   */
  getCharities: (query: { skip: number; take: number; where: any }) => {
    const { skip, take, where } = query;
    let filteredData = [...charityData];
    
    // Apply filters if specified
    if (where) {
      if (where.id) {
        filteredData = filteredData.filter(charity => charity.id === where.id);
      }
      
      if (where.sector) {
        filteredData = filteredData.filter(charity => charity.sector === where.sector);
      }
    }
    
    // Apply pagination
    return filteredData.slice(skip, skip + take);
  },
  
  /**
   * Get a charity by ID
   * @param id Charity ID
   * @returns Charity or null if not found
   */
  getCharityById: (id: number): Charity | null => {
    return charityData.find(charity => charity.id === id) || null;
  },
  
  /**
   * Get beneficiaries for a charity
   * @param charityId Charity ID
   * @param pagination Pagination parameters
   * @returns Array of beneficiaries
   */
  getBeneficiaries: (charityId: number, pagination: { skip: number; take: number }): CharityUser[] => {
    const { skip, take } = pagination;
    const charity = charityData.find(c => c.id === charityId);
    
    if (!charity || !charity.beneficiaries) {
      return [];
    }
    
    return charity.beneficiaries.slice(skip, skip + take);
  },
  
  /**
   * Get a beneficiary by ID
   * @param id Beneficiary ID
   * @returns Beneficiary or null if not found
   */
  getBeneficiaryById: (id: number): CharityUser | null => {
    for (const charity of charityData) {
      if (charity.beneficiaries) {
        const beneficiary = charity.beneficiaries.find(b => b.id === id);
        if (beneficiary) {
          return beneficiary;
        }
      }
    }
    
    return null;
  },
  
  /**
   * Get donations based on query parameters
   * @param query Query parameters including pagination and filters
   * @returns Array of donations matching the query
   */
  getDonations: (query: { skip: number; take: number; where: any }) => {
    const { skip, take, where } = query;
    let filteredData = [...donationData];
    
    // Apply filters if specified
    if (where) {
      if (where.userId) {
        filteredData = filteredData.filter(donation => donation.userId === where.userId);
      }
      
      if (where.charityId) {
        filteredData = filteredData.filter(donation => donation.charityId === where.charityId);
      }
    }
    
    // Apply pagination
    return filteredData.slice(skip, skip + take);
  },
};

export default dataService;