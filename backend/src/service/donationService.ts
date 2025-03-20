import prisma from '../repository/prisma'
import { DonationStatus, DonationType, Prisma } from '@prisma/client'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import charityService from './charityService'
import { connect } from 'http2'

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
                recipient: { connect: {id: beneficiaryId}},
                charity: {connect: {id: beneficiary.charity_id_recipient ?? -1 }},
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
    }
}

export default donationService