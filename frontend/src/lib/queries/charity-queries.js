import { gql } from "@apollo/client";

export const GET_ALL_CHARITIES = gql`
  query GetAllCharities {
    charities {
      id
      name
      address {
        city
        country
        lat
        lng
        postcode
      }
      beneficiaries {
        id
        first_name
        last_name
        email
      }
    }
  }
`;

export const GET_CHARITY_BY_ID = gql`
  query GetCharityById($id: Int!) {
    charities(id: $id) {
      id
      name
      address {
        city
        country
        lat
        lng
        postcode
      }
      beneficiaries {
        id
        first_name
        last_name
        email
      }
    }
  }
`;