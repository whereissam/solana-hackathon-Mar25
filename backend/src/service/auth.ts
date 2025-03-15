import jwt from 'jsonwebtoken'

export const createJWT = (user: User) => {
    const payload = { id: user.id, role: user.role }
    const options = { expiresIn: '4w' }
    return jwt.sign(payload, process.env.JWT_SECRET, options)
};

export interface User {
    id: number,
    role: string
}