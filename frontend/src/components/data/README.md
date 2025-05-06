# Consolidated Data Structure with GraphQL Integration

## Overview

This folder contains the centralized data structure for the application. All data that was previously scattered across component-specific folders has been consolidated here for better maintainability and organization.

The data in this folder is now integrated with GraphQL, providing a unified API for data access across the application.

## Folder Structure

```
data/
  README.md          - This documentation file
  USAGE-EXAMPLE.tsx  - Example component showing how to use the data with GraphQL
  about/             - About page data
    data.ts          - Data for the about page
    types.ts         - TypeScript types for about data
  charities/         - Charities data
    data.ts          - Data for charities
    types.ts         - TypeScript types for charity data
  contact/           - Contact page data
    data.ts          - Data for the contact page
    types.ts         - TypeScript types for contact data
  dashboard/         - Dashboard data
    data.ts          - Data for the dashboard
    types.ts         - TypeScript types for dashboard data
  donate/            - Donation data
    data.ts          - Data for donations
    types.ts         - TypeScript types for donation data
```

## GraphQL Integration

The consolidated data structure is now integrated with GraphQL, allowing for efficient data fetching and manipulation through GraphQL queries and mutations.

### How It Works

1. **Data Structure**: Each data domain (charities, donations, etc.) has its own folder with data files and type definitions.

2. **GraphQL Schema**: The GraphQL schema (in `schema/graphql/`) defines the types and operations that can be performed on the data.

3. **Data Service**: A data service (`backend/src/service/dataService.ts`) serves as an intermediary between the GraphQL resolvers and the consolidated data structure.

4. **Resolvers**: The GraphQL resolvers use the data service to fetch and manipulate data according to the schema.

5. **Frontend Components**: Components use Apollo Client to make GraphQL queries and mutations, which are resolved using the data from the consolidated structure.

### Using the Data with GraphQL

To use the data with GraphQL in a component:

```tsx
import { useQuery, gql } from '@apollo/client';
import { Charity } from '../data/charities/types';

// Define your GraphQL query
const GET_CHARITIES = gql`
  query GetCharities {
    charities {
      id
      name
      description
      // ... other fields
    }
  }
`;

// Use the query in your component
const { loading, error, data } = useQuery(GET_CHARITIES);

// Data is typed according to your consolidated data structure
const charities: Charity[] = data?.charities || [];
```

See `USAGE-EXAMPLE.tsx` for a complete example of using the data with GraphQL.

## Benefits

- **Centralized Data Management**: All data is now in one location, making it easier to find and update
- **Consistent Structure**: Each data domain follows the same pattern with data files and type definitions
- **Simplified Imports**: Components can import data from a consistent location
- **Better Maintainability**: Changes to data structure only need to be made in one place
- **Type Safety**: TypeScript types ensure consistency between data and GraphQL schema
- **Flexible Data Access**: GraphQL provides a flexible API for accessing the consolidated data

## Adding New Data

To add a new data domain:

1. Create a new folder in the `data/` directory for your domain
2. Create a `types.ts` file defining the TypeScript types for your data
3. Create a `data.ts` file containing your data, typed according to your definitions
4. Update the GraphQL schema in `schema/graphql/` to include your new data types
5. Update the data service in `backend/src/service/dataService.ts` to handle your new data
6. Create or update resolvers to use your new data

## Further Documentation

For more detailed information on the data migration and GraphQL integration, see:

- `maps/DATA-MIGRATION-GUIDE.md` - Guide for the data folder consolidation
- `maps/GRAPHQL-DATA-INTEGRATION.md` - Detailed guide for the GraphQL integration

For questions or issues, please contact the development team.