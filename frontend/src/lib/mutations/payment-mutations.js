import { gql } from "@apollo/client";

export const CREATE_CRYPTO_DONATION = gql`
  mutation CreateCryptoDonation(
    $beneficiaryId: Int!
    $amountInLamports: Int!
    $tokenCode: String!
  ) {
    createCryptoDonation(
      beneficiaryId: $beneficiaryId
      amountInLamports: $amountInLamports
      tokenCode: $tokenCode
    ) {
      amount
      currency
      id
      status
    }
  }
`;

export const CRYPTO_PAYMENT_COMPLETED = gql`
  mutation CryptoPaymentCompleted($donationId: String!, $txHash: String!) {
    cryptoPaymentCompleted(donationId: $donationId, txHash: $txHash) {
      assetKey
      signature
    }
  }
`;