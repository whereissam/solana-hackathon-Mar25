import prisma from '../repository/prisma'
import { Prisma } from '@prisma/client'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import geocoding from './geocoding'
import { hashPassword } from './userService'

const charityService = {
    getCharities: (args: Prisma.charityFindManyArgs) => {
        return prisma.charity.findMany({
            ...args,
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
    createCharity: async (
        { email, password, firstName, lastName }: { email: string, password: string, firstName: string, lastName: string },
        { name, description, postcode, city, country }: { name: string, description: string, postcode?: string, city?: string, country?: string }
    ) => {
        // create the location from google api
        const fullAddress = [city, country, postcode].filter(Boolean).join(", ")
        const { lat, lng, address } = await geocoding(fullAddress)
        return prisma.charity.create({
            data: {
                name: name,
                description: description,
                postcode: postcode,
                city: city,
                country: country,
                contact: email,
                address: address,
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