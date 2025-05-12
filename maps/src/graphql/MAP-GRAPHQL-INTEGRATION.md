# Map GraphQL Integration

## Overview

This document explains how the map functionality has been integrated with the consolidated data structure using GraphQL. The integration allows the map components to fetch location data for charities through GraphQL queries, providing a consistent data access pattern across the application.

## Components

### GraphQL Schema

The `mapSchema.graphql` file defines the GraphQL types and queries specific to map functionality:

- `Location`: A type representing geographical coordinates and address information
- `CharityLocation`: A type representing a charity with its location data
- Query extensions:
  - `charitiesWithLocation`: Fetches all charities with location data
  - `charityLocationById`: Fetches a single charity with location data by ID

### Resolver

The `mapResolver.ts` file implements the resolvers for the map-specific GraphQL queries. It uses the data service to access the consolidated data structure and formats the data for map display.

### React Hook

The `useCharityLocations` hook in `hooks/useCharityLocations.ts` provides a convenient way to fetch charity location data from the GraphQL API. It handles loading states, errors, and data formatting.

### Map Component

The `CharityMapWithData` component in `components/Charities/CharityMapWithData.tsx` uses the `useCharityLocations` hook to fetch charity data and display it on the map. It handles marker creation, popup display, and user interactions.

## Usage

To use the map with the consolidated data structure:

1. Import the `CharityMapWithData` component
2. Wrap your application with the `ApolloProvider` from Apollo Client
3. Use the component in your page or layout

```tsx
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from '@/lib/apollo-client';
import CharityMapWithData from '@/components/Charities/CharityMapWithData';

function MyPage() {
  const [selectedCharity, setSelectedCharity] = useState<number | null>(null);
  
  const handleCharitySelect = (charityId: number) => {
    setSelectedCharity(prevSelected => 
      prevSelected === charityId ? null : charityId
    );
  };

  return (
    <ApolloProvider client={apolloClient}>
      <CharityMapWithData 
        selectedCharity={selectedCharity} 
        handleCharitySelect={handleCharitySelect} 
      />
    </ApolloProvider>
  );
}
```

## Benefits

- **Consistent Data Access**: Uses the same data service as other parts of the application
- **Type Safety**: Leverages TypeScript for type checking
- **Efficient Data Fetching**: Only fetches the data needed for map display
- **Caching**: Apollo Client provides caching for improved performance
- **Real-time Updates**: Can be extended to support real-time updates with GraphQL subscriptions

## Next Steps

- Add filtering capabilities to the map queries
- Implement clustering for markers when zoomed out
- Add search functionality to find charities on the map
- Implement user location tracking to show nearby charities