/**
 * Charity Data Types
 * 
 * This file defines the TypeScript types for charity data in the consolidated data structure.
 * These types align with the GraphQL schema to ensure type safety across the application.
 */

/**
 * Charity sector enumeration
 */
export enum CharitySector {
  CHARITY = 'charity',
  UG_PARTNER = 'ug_partner',
  ANIMALS = 'animals'
}

/**
 * Address interface
 */
export interface Address {
  city: string;
  country: string;
  lat: number;
  lng: number;
  postcode: string;
  line1?: string;
  line2?: string;
  state?: string;
}

/**
 * Charity user/beneficiary interface
 */
export interface CharityUser {
  id: number;
  email: string;
  first_name?: string;
  last_name?: string;
  story?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

/**
 * Charity interface
 */
export interface Charity {
  id: number;
  name: string;
  website?: string;
  mission?: string;
  sector?: CharitySector;
  description: string;
  address: Address;
  beneficiaries?: CharityUser[];
  createdAt?: Date;
  updatedAt?: Date;
}

/**
 * Input type for creating a new charity
 */
export interface NewCharityInput {
  name: string;
  website?: string;
  mission?: string;
  sector: CharitySector;
  description: string;
  location: Omit<Address, 'lat' | 'lng'>;
  charityAdmin: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  };
  image?: File;
}