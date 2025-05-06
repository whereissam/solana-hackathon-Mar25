/**
 * Apollo Client Configuration
 * 
 * This file configures the Apollo Client for GraphQL integration
 * with the consolidated data structure.
 */

import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

// Create an HTTP link to the GraphQL API
const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || 'http://localhost:4000/graphql',
});

// Create the Apollo Client instance
export const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
  },
});