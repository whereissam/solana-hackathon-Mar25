import repository from '../repository/prisma'; // This is your PrismaClient instance

import {
  Donation,
  DonationStatus,
  DonationType,
  // Assuming you have types like these for your resolver arguments/inputs:
  // QueryDonationsArgs, // Example: For the arguments of a donations query
  // CreateDonationInput, // Example: For the input to create a donation
  // If these exact names don't exist, find the corresponding generated types.
} from '../generated/graphql';

import charityService from './charityService';
import { Prisma } from '@prisma/client'; // Import Prisma

// Define an interface for donation creation data if not already available from GraphQL types
interface CreateDonationData {
  amount: bigint; // Prisma expects BigInt for BigInt fields
  currency: string;
  type: DonationType; // Ensure this matches your GQL enum
  status: DonationStatus; // Ensure this matches your GQL enum
  charityId: string; // Changed to string for MongoDB ObjectId
  userId?: string; // Changed to string for MongoDB ObjectId, optional
  message?: string;
  anonymous?: boolean;
  payment_id?: string;
  receipt_addr?: string;
}


const donationService = {
  /**
   * Get donations by donor ID
   * @param donorId - The ID of the donor
   * @param args - Optional arguments for pagination, filtering, etc.
   * @returns A list of donations
   */
  getDonationsByDonor: (donorId: string, args?: Prisma.DonationFindManyArgs) => {
    // Ensure 'findDonationsByDonor' exists in your repository
    // return repository.findDonationsByDonor(donorId, args);
    return repository.donation.findMany({
      where: { donorId: donorId },
      ...args,
    });
  },

  /**
   * Create a new donation record
   * @param data - The donation data
   * @returns The created donation
   */
  createDonation: (data: CreateDonationData) => {
    // Ensure 'createDonationRecord' exists in your repository
    // return repository.createDonationRecord(data);
    return repository.donation.create({
      data: {
        ...data,
        // Ensure amount is BigInt if your schema defines it as BigInt
        amount: BigInt(data.amount),
      },
    });
  },

  /**
   * Get a donation by its ID
   * @param donationId - The ID of the donation
   * @returns The donation or null if not found
   */
  getDonationById: (donationId: string) => { // Changed donationId to string
    return repository.donation.findUnique({
      where: { id: donationId },
    });
  },

  /**
   * Update the status of a donation to 'Completed' and store the transaction hash
   * @param donationId - The ID of the donation to update
   * @param txHash - The transaction hash
   * @returns The updated donation
   */
  completeDonation: (donationId: string, txHash: string) => { // Changed donationId to string
    // return repository.updateDonationStatus(donationId, txHash, DonationStatus.Completed); // Changed to Completed
    return repository.donation.update({
      where: { id: donationId },
      data: {
        status: DonationStatus.Completed, // Make sure DonationStatus.Completed is a string value Prisma expects
        payment_id: txHash, // Assuming txHash is stored in payment_id
      },
    });
  },

  createCryptoDonation: async (donorId: string, beneficiaryId: string, amountInLamports: number, tokenCode: string): Promise<Donation> => { // Changed donorId and beneficiaryId to string
    console.log('Creating crypto donation for donor:', donorId, 'beneficiary:', beneficiaryId, 'amount:', amountInLamports, 'token:', tokenCode);
    // This is a placeholder. You need to implement the actual logic using your repository.
    // Example: const newDonationData = await repository.createCryptoDonationRecord({ donorId, beneficiaryId, amountInLamports, tokenCode, type: DonationType.Crypto, status: DonationStatus.Pending });
    // return newDonationData;

    // Mock implementation for now:
    const mockNewDonation = {
        id: String(Date.now()) + String(Math.random()),
        amount: BigInt(amountInLamports),
        currency: tokenCode,
        type: DonationType.Crypto,
        status: DonationStatus.Pending,
        created_at: new Date(), // Ensure GQL Donation type expects Date or string for created_at
        payment_id: null,
        receipt_addr: null,
        charityId: beneficiaryId, // beneficiaryId is now a string, aligns with Prisma's Donation.charityId (String)
        // Ensure all fields required by the GQL Donation type are present
    };
    return mockNewDonation as Donation; // Cast to the imported Donation type
  },

  cryptoPaymentCompleted: async (donationId: string, txHash: string) => {
    console.log('Crypto payment completed for donation:', donationId, 'txHash:', txHash);
    // Corrected to use repository.donation.update
    return repository.donation.update({
      where: { id: donationId },
      data: {
        status: DonationStatus.Completed, // Ensure DonationStatus.Completed is a valid string for your schema
        payment_id: txHash,
      },
    });
  }
  // ... other methods if any
};

export default donationService;