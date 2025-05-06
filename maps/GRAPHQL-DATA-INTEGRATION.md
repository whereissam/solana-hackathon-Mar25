# GraphQL Integration with Consolidated Data Structure

## Overview

This document outlines the steps to connect the newly consolidated data structure with GraphQL. The integration will allow for efficient data fetching and manipulation through GraphQL queries and mutations while maintaining the benefits of the centralized data management approach.

## Current Setup

### GraphQL Infrastructure

- **Backend**: GraphQL server with resolvers for charities, donations, and authentication
- **Frontend**: Apollo Client for making GraphQL queries and mutations
- **Schema**: Defined in `.graphql` files in the `schema/graphql/` directory

### Consolidated Data Structure

```
components/
  data/
    README.md          - Documentation for the new structure
    USAGE-EXAMPLE.tsx  - Example component showing how to use the new data structure
    about/             - About page data
    charities/         - Charities data
    contact/           - Contact page data
    dashboard/         - Dashboard data
    donate/            - Donation data
```

## Integration Steps

### 1. Create Data Access Layer

Create a data access layer that will serve as an intermediary between the GraphQL resolvers and the consolidated data structure.

```typescript
// backend/src/service/dataService.ts
import { charityData } from '../../../components/data/charities/data';
import { donationData } from '../../../components/data/donate/data';
// Import other data as needed

export const dataService = {
  getCharities: (query) => {
    // Filter and paginate charity data based on query parameters
    const { skip, take, where } = query;
    let filteredData = [...charityData];
    
    if (where && where.id) {
      filteredData = filteredData.filter(charity => charity.id === where.id);
    }
    
    return filteredData.slice(skip, skip + take);
  },
  
  // Add other methods for different data types
};

export default dataService;
```

### 2. Update Resolvers to Use Consolidated Data

Modify the existing resolvers to use the new data service instead of direct database queries.

```typescript
// backend/src/resolvers/charityResolver.ts
import dataService from '../service/dataService';

const resolver = {
  Query: {
    charities: async (_parent, args) => {
      return await dataService.getCharities({
        skip: args.offset,
        take: args.limit,
        where: args.id ? { id: args.id } : {}
      });
    },
    // Other queries
  },
  // Rest of the resolver
};
```

### 3. Create TypeScript Types for Data Models

Ensure that the data models in the consolidated structure have proper TypeScript types that align with the GraphQL schema.

```typescript
// components/data/charities/types.ts
export interface Charity {
  id: number;
  name: string;
  website?: string;
  mission?: string;
  sector?: 'charity' | 'ug_partner' | 'animals';
  description: string;
  address: Address;
  beneficiaries?: CharityUser[];
}

export interface Address {
  city: string;
  country: string;
  lat: number;
  lng: number;
  postcode: string;
}

export interface CharityUser {
  id: number;
  email: string;
  first_name?: string;
  last_name?: string;
}
```

### 4. Update Frontend Queries

The frontend queries can remain largely unchanged since they interact with the GraphQL API, not directly with the data structure.

### 5. Add Data Synchronization (Optional)

If the data needs to be synchronized between the frontend and backend, implement a synchronization mechanism.

```typescript
// backend/src/service/syncService.ts
import fs from 'fs';
import path from 'path';

export const syncDataToFiles = async (dataType, data) => {
  const filePath = path.resolve(__dirname, `../../../components/data/${dataType}/data.ts`);
  const fileContent = `export const ${dataType}Data = ${JSON.stringify(data, null, 2)};
`;
  
  await fs.promises.writeFile(filePath, fileContent);
};
```

### 6. Testing the Integration

1. Create test queries to verify that the GraphQL API returns the expected data from the consolidated structure.
2. Test mutations to ensure data updates are properly reflected.
3. Verify that the frontend components display the correct data.

## Benefits of the Integration

- **Single Source of Truth**: All data is managed in one centralized location
- **Type Safety**: TypeScript types ensure consistency between data and GraphQL schema
- **Simplified Data Access**: GraphQL provides a flexible API for accessing the consolidated data
- **Improved Maintainability**: Changes to data structure only need to be made in one place

## Considerations

### Static vs. Dynamic Data

Determine which data should be static (defined in files) and which should be dynamic (stored in a database):

- **Static Data**: Content that rarely changes (e.g., team information, about page content)
- **Dynamic Data**: User-generated content or frequently updated information (e.g., donations, user profiles)

### Development vs. Production

Consider different approaches for development and production environments:

- **Development**: Use file-based data for rapid iteration
- **Production**: Use database storage for dynamic data while keeping static content in files

## Next Steps

1. Implement the data access layer
2. Update resolvers to use the consolidated data
3. Create TypeScript types for all data models
4. Test the integration with existing frontend components
5. Document any API changes for the development team

By following these steps, you'll successfully connect the consolidated data structure to GraphQL, maintaining the benefits of centralized data management while leveraging the power of GraphQL for data fetching and manipulation.

## Map Integration

### Map-Specific GraphQL Schema

We've created a dedicated GraphQL schema for map-related queries in `maps/src/graphql/mapSchema.graphql`:

```graphql
# Location type for map display
type Location {
  lat: Float!
  lng: Float!
  address: String
  city: String
  country: String
}

# Charity with location data for map display
type CharityLocation {
  id: Int!
  name: String!
  description: String
  sector: CharitySector
  location: Location!
}

# Extend the existing Query type with map-specific queries
extend type Query {
  charitiesWithLocation(offset: Int = 0, limit: Int = 100, sector: CharitySector): [CharityLocation!]!
  charityLocationById(id: Int!): CharityLocation
}
```

### Map Resolver Implementation

The map resolver in `maps/src/graphql/mapResolver.ts` uses the data service to fetch and format charity location data:

```typescript
const resolver = {
  Query: {
    charitiesWithLocation: async (_parent, args) => {
      // Get charities from the data service
      const charities = await dataService.getCharities({
        skip: args.offset || 0,
        take: args.limit || 100,
        where: args.sector ? { sector: args.sector } : {}
      });
      
      // Filter and format for map display
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
    // Other resolvers...
  }
};
```

### React Integration

We've created a custom hook `useCharityLocations` to fetch charity location data from the GraphQL API:

```typescript
export function useCharityLocations({ 
  offset = 0, 
  limit = 100, 
  sector 
}: UseCharityLocationsProps = {}) {
  // Implementation details...
  
  return {
    charityLocations,
    loading,
    error,
    fetchCharityLocations,
  };
}
```

This hook is used by the `CharityMapWithData` component to display charities on the map using the consolidated data structure.