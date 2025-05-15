
import prisma from '../repository/prisma'
import { DonationStatus, DonationType, Prisma } from '@prisma/client'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import charityService from './charityService'
import { connect } from 'http2'
import { getTransferDetail, mintReceipt, ITransferDetail, IDonationMemo} from './solanaService'
import { get } from 'http'

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
    createCryptoDonation: async (
        donorId: number,
        beneficiaryId: number,
        amountInLamports: number,
        tokenCode: string
    ) => {
        const beneficiary = await charityService.getBeneficiaryById(beneficiaryId)
        const newDonation = prisma.donation.create({
            data: {
                type: DonationType.crypto,
                amount: amountInLamports,
                currency: tokenCode,
                donor: { connect: { id: donorId } },
                recipient: { connect: { id: beneficiaryId } },
                charity: { connect: { id: beneficiary.charity_id_recipient ?? -1 } },
                status: DonationStatus.pending,
            }
        })
        return newDonation
    },
    getDonationById: async (donationId: string, args?: Prisma.donationFindUniqueArgs) => {
        return await prisma.donation.findUniqueOrThrow({
            where: {
                id: donationId,
            }
        })
    },
    getDonations: async (donorId: number, completed: boolean, args?: Prisma.donationFindManyArgs) => {
        if (completed) {
            return await prisma.donation.findMany({
                where: {
                    donor_id: donorId,
                    status: "completed"
                },
                ...args
            })
        }
        else
            return await prisma.donation.findMany({
                where: {
                    donor_id: donorId,
                },
                ...args
            })
    },
    cryptoPaymentCompleted: async (donationId: string, txHash: string) => {
        try {
            const {feePayer, solanaMemo } = await getTransferDetail(txHash)
            console.log("feePayer", feePayer)
            console.log("solanaMemo", solanaMemo, solanaMemo.Amount, solanaMemo.DonationId)
            if (solanaMemo.DonationId != donationId)
                throw "Donation ID in payment does not match"

            const donation = await prisma.donation.findUniqueOrThrow({
                where: { id: donationId }
            })
            
            const solResult = await mintReceipt(feePayer, donationId)
            await prisma.donation.update({
                where: { id: donationId },
                data: {
                    status: DonationStatus.completed,
                    updated_at: new Date(),
                    payment_id: txHash,
                    receipt_addr: solResult.assetKey,
                }
            })
            return solResult
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError && error.code === 'P2023') {
                throw "invalid donation id"
            }
            else throw error
        }
    }
}

export default donationService;