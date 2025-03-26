// lib/queries/beneficiary-queries.js
import { gql } from '@apollo/client';

export const GET_BENEFICIARY = gql`
  query Beneficiary($beneficiaryId2: Int!) {
    beneficiary(id: $beneficiaryId2) {
      email
      first_name
      id
      last_name
    }
  }
`;