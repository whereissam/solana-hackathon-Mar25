import prisma from '../repository/prisma'
import { DonationStatus, DonationType, Prisma } from '@prisma/client'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import charityService from './charityService'
import { connect } from 'http2'
import { getSolanaMemo, mintReceipt} from './solanaService'

interface IDonationMemo {
    DonationId: string,
    Ver: string,
    Amount: number,
    Currency: string
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
    getDonations: async (donorId: number, args?: Prisma.donationFindManyArgs) => {
        return await prisma.donation.findMany({
            where: {
                donor_id: donorId
            },
            ...args
        })
    },
    cryptoPaymentCompleted: async (donationId: string, txHash: string) => {
        try {
            const memo = JSON.parse(await getSolanaMemo(txHash)) as IDonationMemo
            // Check db for donation
            // TODO: check user id as well
            console.log(donationId)

            // TODO: Use memo id instead
            const donation = await prisma.donation.findUniqueOrThrow({
                where: { id: donationId }
            })
            await prisma.donation.update({
                where: { id: donationId },
                data: {
                    status: DonationStatus.completed,
                    updated_at: new Date(),
                    payment_id: txHash,
                }
            })
            return await mintReceipt(donationId)
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError && error.code === 'P2023') {
                throw "invalid donation id"
            }
            else throw error
        }
    }
}

export default donationService