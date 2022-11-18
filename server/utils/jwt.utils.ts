import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
if(process.env.NODE_ENV !== 'production') {
    dotenv.config();
}

export const signJwt = (payload: Object, options?: jwt.SignOptions | undefined): string => {
    const privateKey = process.env.PRIVATE_KEY as string
    return jwt.sign(payload, privateKey, {
        ...(options && options),
        algorithm: 'RS256'
    })
}

export const verifyJwt = (token: string) => {
    const publicKey = process.env.PUBLIC_KEY as string
    try {
        const decoded = jwt.verify(token, publicKey);
        return {
            decoded,
            expired: false,
            valid: true
        }
    }
    catch (err: any) {
        return {
            valid: false,
            expired: true,
            decoded: null
        }
    }
}