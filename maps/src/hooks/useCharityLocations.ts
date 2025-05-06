/**
 * useCharityLocations Hook
 * 
 * This hook fetches charity location data from the GraphQL API
 * using the consolidated data structure.
 */

import { useState, useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';

// GraphQL query for fetching charity locations
const GET_CHARITY_LOCATIONS = gql`
  query GetCharityLocations($offset: Int, $limit: Int, $sector: CharitySector) {
    charitiesWithLocation(offset: $offset, limit: $limit, sector: $sector) {
      id
      name
      description
      sector
      location {
        lat
        lng
        address
        city
        country
      }
    }
  }
`;

// Types for charity location data
export interface CharityLocation {
  id: number;
  name: string;
  description?: string;
  sector?: string;
  location: {
    lat: number;
    lng: number;
    address?: string;
    city?: string;
    country?: string;
  };
}

interface UseCharityLocationsProps {
  offset?: number;
  limit?: number;
  sector?: string;
}

/**
 * Hook for fetching charity locations from the GraphQL API
 */
export function useCharityLocations({ 
  offset = 0, 
  limit = 100, 
  sector 
}: UseCharityLocationsProps = {}) {
  const [charityLocations, setCharityLocations] = useState<CharityLocation[]>([]);

  // Query for charity locations
  const { loading, error, data, refetch } = useQuery(GET_CHARITY_LOCATIONS, {
    variables: { offset, limit, sector },
    fetchPolicy: 'cache-and-network',
  });

  // Update state when data changes
  useEffect(() => {
    if (data?.charitiesWithLocation) {
      setCharityLocations(data.charitiesWithLocation);
    }
  }, [data]);

  // Function to refetch data with new parameters
  const fetchCharityLocations = (params: UseCharityLocationsProps = {}) => {
    return refetch({
      offset: params.offset ?? offset,
      limit: params.limit ?? limit,
      sector: params.sector ?? sector,
    });
  };

  return {
    charityLocations,
    loading,
    error,
    fetchCharityLocations,
  };
}