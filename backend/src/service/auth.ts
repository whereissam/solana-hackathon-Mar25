import jwt from 'jsonwebtoken'

export const createJWT = (user: User) => {
    const payload = { id: user.id, role: user.role }
    const fourWeeksInSeconds = 4 * 7 * 24 * 60 * 60; // Calculate 4 weeks in seconds
    const options = { expiresIn: fourWeeksInSeconds }; // Use the numeric value
    return jwt.sign(payload, process.env.JWT_SECRET || 'fallback_secret', options)
};

export interface User {
    id: number,
    role: string
}