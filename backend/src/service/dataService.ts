/**
 * Data Service
 * 
 * This service provides an interface between GraphQL resolvers and the consolidated data structure.
 * It allows for seamless integration of the centralized data with the GraphQL API.
 */

// Import types from GraphQL generated code
// It's good practice to alias imported types if they might conflict with local ones.
import { Charity as GQLCharity, CharityUser as GQLCharityUser, Address as GQLAddress, CharitySector as GQLCharitySector } from '../generated/graphql';

// Import data from consolidated data structure
// Note: These imports should be updated to point to the actual location of your data files
// after completing the data migration
import { charityData } from '../../../frontend/src/components/data/charities/data';
import { donationData } from '../../../frontend/src/components/data/donate/data';

// Import CharitySector from frontend types for the mapping function
import { CharitySector as FrontendCharitySector } from '../../../frontend/src/components/data/charities/types'; // Adjust path if needed

// Helper function to map FrontendCharitySector to GQLCharitySector
function mapFrontendSectorToGQLSector(sector: FrontendCharitySector | undefined): GQLCharitySector | null {
  if (sector === undefined) {
    return null; // Or a default GQLCharitySector if appropriate and GQLCharity.sector is non-nullable
  }
  switch (sector) {
    case FrontendCharitySector.ANIMALS:
      return GQLCharitySector.Animals; // Ensure GQLCharitySector has an 'Animals' member
    case FrontendCharitySector.CHARITY:
      return GQLCharitySector.Charity; // Ensure GQLCharitySector has a 'Charity' member
    case FrontendCharitySector.UG_PARTNER:
      return GQLCharitySector.UgPartner; // Ensure GQLCharitySector has a 'UgPartner' member
    default:
      // This handles cases where a frontend sector value doesn't have a GQL counterpart
      // console.warn(`Unmapped frontend sector: ${sector}`);
      return null; // Or throw an error, or return a default
  }
}

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
  getCharityById: (id: number): GQLCharity | null => {
    const charityFromFrontend = charityData.find(charity => charity.id === id);
    if (!charityFromFrontend) {
      return null;
    }

    const mappedSector = mapFrontendSectorToGQLSector(charityFromFrontend.sector);

    // If GQLCharity.sector is non-nullable, you must ensure mappedSector is never null here.
    // For example, by providing a default in mapFrontendSectorToGQLSector or throwing an error.
    // If GQLCharity.sector is nullable, 'mappedSector' (which can be null) is fine.

    const gqlCharity: GQLCharity = {
      id: charityFromFrontend.id,
      name: charityFromFrontend.name,
      website: charityFromFrontend.website || null,
      mission: charityFromFrontend.mission || null,
      sector: mappedSector, // Use the mapped sector value
      description: charityFromFrontend.description || "",
      address: charityFromFrontend.address as GQLAddress,
      beneficiaries: charityFromFrontend.beneficiaries
        ? charityFromFrontend.beneficiaries.map(b => ({ ...b } as GQLCharityUser))
        : [],
    };
    return gqlCharity;
  },
  
  /**
   * Get beneficiaries for a charity
   * @param charityId Charity ID
   * @param pagination Pagination parameters
   * @returns Array of beneficiaries
   */
  getBeneficiaries: (charityId: number, pagination: { skip: number; take: number }): GQLCharityUser[] => {
    const { skip, take } = pagination;
    const charity = charityData.find(c => c.id === charityId);

    if (!charity || !charity.beneficiaries) {
      return [];
    }

    // Map frontend CharityUser to GQLCharityUser if their structures differ significantly
    // For now, assuming a direct cast is mostly fine after ensuring essential fields.
    return charity.beneficiaries.slice(skip, skip + take).map(b => ({
      id: b.id,
      email: b.email,
      first_name: b.first_name || null,
      last_name: b.last_name || null,
      story: b.story || null, // Include if GQLCharityUser has 'story'
      // Ensure all fields required by GQLCharityUser are present and correctly typed
      // createdAt: b.createdAt ? new Date(b.createdAt) : null, // Example for date transformation
      // updatedAt: b.updatedAt ? new Date(b.updatedAt) : null,
    })) as GQLCharityUser[];
  },
  
  /**
   * Get a beneficiary by ID
   * @param id Beneficiary ID
   * @returns Beneficiary or null if not found
   */
  getBeneficiaryById: (id: number): GQLCharityUser | null => {
    for (const charity of charityData) {
      if (charity.beneficiaries) {
        const beneficiary = charity.beneficiaries.find(b => b.id === id);
        if (beneficiary) {
          // Assuming frontend beneficiary type is compatible enough with GQLCharityUser
          // Add any necessary transformations here
          return { 
            id: beneficiary.id,
            email: beneficiary.email,
            first_name: beneficiary.first_name || null,
            last_name: beneficiary.last_name || null,
            // Ensure all fields of GQLCharityUser are present
           } as GQLCharityUser;
        }
      }
    }
    // If beneficiary is not found after checking all charities, return null.
    // The previous problematic block that caused TS2353 is removed.
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