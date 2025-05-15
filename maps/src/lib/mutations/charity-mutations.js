import { gql } from "@apollo/client";

export const CREATE_CHARITY = gql`
  mutation CreateCharity($detail: NewCharity!) {
    createCharity(detail: $detail) {
      address {
        city
        country
        postcode
      }
      id
      name
    }
  }
`;