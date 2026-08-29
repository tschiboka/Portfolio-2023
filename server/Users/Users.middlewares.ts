import jwt from 'jsonwebtoken'
import type { Request, Response, NextFunction } from 'express'
import { ApiMessage, ApiResponder } from '../../common/utils/Server'
import { isError } from '../../common/utils/Predicate'
import type { AuthedRequest, UserToken } from './Users.types'

/** Verifies the bearer JWT and attaches its payload to `req.user`; throws UNAUTHORIZED otherwise. */
export const auth = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.header('x-auth-token')
    if (!token) throw ApiResponder.unauthorized(ApiMessage.missingToken())

    try {
        const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY as string)
        if (typeof decoded === 'string')
            throw ApiResponder.unauthorized(ApiMessage.invalid('token'))

        const expired = (decoded as jwt.JwtPayload).exp! <= Math.floor(Date.now() / 1000)
        if (expired) throw ApiResponder.unauthorized(ApiMessage.expired('token'))
        ;(req as AuthedRequest).user = decoded as unknown as UserToken

        next()
    } catch (error) {
        if (isError(error)) throw ApiResponder.unauthorized(ApiMessage.invalid('token'))
        throw error
    }
}

/** Throws FORBIDDEN unless the authenticated user is an admin. */
export const admin = (req: Request, _: Response, next: NextFunction): void => {
    const isAdmin = (req as AuthedRequest).user?.isAdmin
    if (!isAdmin) throw ApiResponder.forbidden()
    next()
}

/** Auth/authorisation middlewares for the Users feature, grouped under `UsersMiddleware`. */
export const UsersMiddleware = {
    auth,
    admin,
}
