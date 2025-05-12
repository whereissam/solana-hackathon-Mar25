/**
 * Donation Data Types
 * 
 * This file defines the TypeScript types for donation data in the consolidated data structure.
 * These types align with the GraphQL schema to ensure type safety across the application.
 */

/**
 * Donation type enumeration
 */
export enum DonationType {
  ONE_TIME = 'ONE_TIME',
  MONTHLY = 'MONTHLY',
  ANNUAL = 'ANNUAL'
}

/**
 * Payment status enumeration
 */
export enum PaymentStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED',
  ACTIVE = 'ACTIVE',
  CANCELLED = 'CANCELLED'
}

/**
 * Donation interface
 */
export interface Donation {
  id: number;
  amount: number;
  currency: string;
  type: DonationType;
  status: PaymentStatus;
  charityId: number;
  userId: number;
  createdAt: Date;
  completedAt?: Date;
  message?: string;
  anonymous?: boolean;
  transactionId?: string;
  paymentMethod?: string;
}

/**
 * Input type for creating a new donation
 */
export interface NewDonationInput {
  amount: number;
  currency: string;
  type: DonationType;
  charityId: number;
  message?: string;
  anonymous?: boolean;
  paymentMethod: string;
}