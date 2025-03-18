import { gql } from '@apollo/client';

export const GET_ALL_CHARITIES = gql`
  query Query {
    charities {
      id
      name
    }
  }
`;

export const GET_CHARITY_BENEFICIARIES = gql`
  query Query($id: Int!) {
    charity(id: $id) {
      id
      name
      beneficiaries {
        email
        first_name
        last_name
        id
      }
    }
  }
`;