import prisma from '../repository/prisma'
import { Prisma, CharitySector } from '@prisma/client'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import geocoding from './geocoding'
import { hashPassword } from './userService'
import { connect } from 'http2'

export interface ICharityAdmin {
    email: string, password: string, firstName: string, lastName: string 
}

export interface ICharityDetail { 
    name: string, description: string, postcode?: string, city?: string, country?: string,
    mission?: string, sector: CharitySector, address?: string, website?: string
}

const charityService = {
    getCharities: (args: Prisma.charityFindManyArgs) => {
        return prisma.charity.findMany({
            ...args,
        })
    },
    getCharityById: (charityId: number, args) => {
        return prisma.charity.findUnique({
            where: {
                id: charityId,
            },
            ...args
        })
    },
    getBeneficiaryById: (beneficiaryId: number) => {
        return prisma.users.findUniqueOrThrow({
            where: {
                id: beneficiaryId,
                role: 'recipient'
            }
        })
    },
    getBeneficiaries: (charityId: number, args) => {
        return prisma.charity.findUnique({
            where: {
                id: charityId,
            },
        }).user_recipient({
            ...args
        })
    },
    createBeneficiary: async(
        { charityId, detail: { first_name, last_name, email, password } }: { charityId: number, detail: { first_name: string, last_name: string, email: string, password: string } }) => {
        return prisma.users.create({
            data: {
                email, 
                password: await hashPassword(password), 
                first_name, last_name,
                agree_to_terms: true,
                role: 'recipient',
                status: 'active',
                charity_recipient: {
                    connect: {
                        id: charityId
                    }
                }
            }
        })
    },
    createCharity: async (
        { email, password, firstName, lastName }: ICharityAdmin,
        { name, description, postcode, city, country, sector, mission, address, website }: ICharityDetail 
    ) => {
        // create the location from google api
        const fullAddress = [address, city, country, postcode].filter(Boolean).join(", ")
        const { lat, lng, address: geoAddress } = await geocoding(fullAddress)

        return prisma.charity.create({
            data: {
                name,
                description,
                mission,
                sector,
                postcode,
                city,
                country,
                website,
                contact: email,
                address: address?? geoAddress,
                lng,
                lat,
                user_admin: {
                    connectOrCreate: {
                        where: {
                            email: email
                        },
                        create: {
                            first_name: firstName,
                            last_name: lastName,
                            email: email,
                            password: await hashPassword(password),
                            agree_to_terms: true,
                            status: "active",
                            role: "charity"
                        }
                    }
                }
            }
        })
    }
}


export default charityService