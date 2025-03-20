import { gql } from "@apollo/client";

export const CREATE_BENEFICIARY = gql`
  mutation CreateBeneficiary($charityId: Int!, $detail: NewCharityBeneficiary!) {
    createBeneficiary(charityId: $charityId, detail: $detail) {
      id
      first_name
      last_name
      email
    }
  }
`;