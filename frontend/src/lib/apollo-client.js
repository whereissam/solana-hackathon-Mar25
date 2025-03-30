// src/lib/apollo-client.js
'use client';

import { ApolloClient, InMemoryCache, from } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { createUploadLink } from 'apollo-upload-client';
import { useAuthStore } from '@/store/authStore';

// Replace the HTTP link with an upload link
const uploadLink = createUploadLink({
  uri: 'https://solana-hackathon-mar25.onrender.com/graphql',
  headers: {
    // This header will tell the server this is a preflight-exempt request
    'apollo-require-preflight': 'true'
  }
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
      'x-apollo-operation-name': 'CreateCharity'
    }
  };
});

const client = new ApolloClient({
  // Change the link setup to use uploadLink instead of httpLink
  link: from([errorLink, authLink, uploadLink]),
  cache: new InMemoryCache(),
});

export default client;