// src/lib/queries/auth-queries.js
import { gql } from '@apollo/client';

export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        id
        email
        first_name
        last_name
        role
      }
      token
    }
  }
`;