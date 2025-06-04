import jwt from 'jsonwebtoken'

export const createJWT = (user: User) => {
    const payload = { id: user.id, role: user.role }
    const options = { expiresIn: '4w' }
    return jwt.sign(payload, process.env.JWT_SECRET, options)
};

export const verifyJWT = (token: string | null): User | null => {
    if (!token) return null;
    console.log("Verifying JWT:", token);
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET) as User;
        return decoded;
    } catch (error) {
        console.error("JWT verification failed:", error);
        return null;
    }
};

export interface User {
    id: number,
    role: string
}