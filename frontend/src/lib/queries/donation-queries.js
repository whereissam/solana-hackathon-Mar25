// lib/queries/donation-queries.js
import { gql } from '@apollo/client';

export const GET_DONATIONS = gql`
  query Query($donorId: Int) {
    donations(donorId: $donorId) {
      amount
      created_at
      currency
      id
      payment_id
      receipt_addr
      status
      type
    }
  }
`;

export const GET_DONATION_BY_ID = gql`
  query Query($donationId: ID!) {
    donation(id: $donationId) {
      amount
      created_at
      currency
      id
      payment_id
      receipt_addr
      status
      type
    }
  }
`;