// src/lib/apollo-client.js
'use client';

import { ApolloClient, InMemoryCache, createHttpLink, from } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { useAuthStore } from '@/store/authStore';

const httpLink = createHttpLink({
  uri: 'https://solana-hackathon-mar25.onrender.com/graphql',
});

// Error handling link
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      );
      
      // If we get an authentication error, clear the credentials
      if (message.includes('Authentication') || message.includes('token')) {
        useAuthStore.getState().clearCredentials();
      }
    });

  if (networkError) console.error(`[Network error]: ${networkError}`);
});

// Auth link - adds the token to every request
const authLink = setContext((_, { headers }) => {
  // Get the authentication token from the store
  const token = useAuthStore.getState().token;
  console.log("token", token);
  
  // Return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      token: token,
    }
  };
});

const client = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
});

export default client;