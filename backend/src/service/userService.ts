import prisma from '../repository/prisma'
// Prisma types like Prisma.UserWhereInput are typically imported from '@prisma/client'
// PrismaClientKnownRequestError might be from '@prisma/client/runtime/library' or just '@prisma/client'
// depending on your Prisma version and setup. If '@prisma/client/runtime/library' gives an error, try '@prisma/client'.
import { Prisma } from '@prisma/client'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library' // Or '@prisma/client'
import bcrypt from 'bcrypt'
// import { createJWT } from './auth'; // Assuming createJWT is correctly located in './auth.ts'

export async function hashPassword(password: string){ // Added type for password
    return await bcrypt.hash(password, bcrypt.genSaltSync())
}

const userService = {
    login: async (email: string, password: string) => {
        // TODO: Implement login logic
        // This typically involves:
        // 1. Finding the user by email
        // 2. Comparing the provided password with the hashed password in the DB
        // 3. If valid, generating a JWT
        // Example:
        // const user = await prisma.user.findUnique({ where: { email } });
        // if (!user) { throw new Error("User not found"); }
        // const isValidPassword = await bcrypt.compare(password, user.passwordHash); // Assuming you have passwordHash field
        // if (!isValidPassword) { throw new Error("Invalid password"); }
        // const token = createJWT(user); // Assuming createJWT takes user object
        // return { user, token };
        console.log('Login attempt for:', email); // Placeholder
        return null; // Placeholder
    }, // Added comma here

    getUserByAuthId: async (authId: string) => { // Moved getUserByAuthId to be a separate method
        // Assuming authId here is the email or another unique identifier present in your User model
        // If 'authId' is not a direct field in your User model, adjust the 'where' clause accordingly.
        // For example, if authId refers to the 'email' field:
        const user = await prisma.user.findFirstOrThrow({
            where: {
                // If you added authId to your Prisma schema:
                // authId: authId
                // If authId is meant to be the email:
                email: authId
            }
        });
        return user; // Return the user
    }
    // Add other user service methods here if needed
};

export default userService;