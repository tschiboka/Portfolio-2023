import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { HttpStatus } from '../common/HttpStatus/HttpStatus'

export default function auth(req: Request, res: Response, next: NextFunction) {
    const token = req.header('x-auth-token')
    if (!token)
        return res.status(HttpStatus.UNAUTHORIZED).json({
            success: false,
            message: 'Access denied: no JWT token is provided!',
        })

    try {
        const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY as string)
        const expired = (decoded as jwt.JwtPayload).exp! <= Math.floor(Date.now() / 1000)
        if (expired)
            return res
                .status(HttpStatus.UNAUTHORIZED)
                .json({ success: false, message: 'Token expired!' })
        ;(req as any).user = decoded
        next()
    } catch (ex) {
        res.status(HttpStatus.UNAUTHORIZED).send({
            success: false,
            message: 'Invalid token!',
            error: ex,
        })
    }
}
