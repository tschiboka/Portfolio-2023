import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import type { Request } from 'express'
import type { CurrentUser } from '@common/types'
import { ApiMessage, ApiResponder } from '../../common/utils/Server'
import { isUndefined } from '../../common/utils/Predicate'
import { Units } from '../../common/utils/DateTime/Units'
import { UsersModel } from './Users.model'
import type { RegistrationPayload, UserToken } from './Users.types'
import { UserPassword } from './Users.constants'
import { SettingsFieldLimits } from '../Settings/Settings.constants'

/** Hashes a plain-text password with bcrypt. */
const hashPassword = (plain: string): Promise<string> => bcrypt.hash(plain, UserPassword.saltRounds)

/** Verifies a plain-text password against a stored bcrypt hash. */
const verifyPassword = (plain: string, hash: string): Promise<boolean> =>
    bcrypt.compare(plain, hash)

/** Signs a user token as an auth JWT using the configured private key. */
const generateToken = (userToken: UserToken): string => {
    const secret = process.env.JWT_PRIVATE_KEY
    if (!secret) throw Error(ApiMessage.jwtSecretMissing())
    return jwt.sign(userToken, secret)
}

/** Verifies an auth JWT and returns its payload, reading the JWT secret here. */
const verifyToken = (token: string): unknown => {
    const secret = process.env.JWT_PRIVATE_KEY
    if (!secret) throw Error(ApiMessage.jwtSecretMissing())
    return jwt.verify(token, secret)
}

/** Builds a registration token payload with the settings' expiry, rejecting an invalid expiry. */
const buildRegistration = (
    payload: RegistrationPayload,
    expiresMs: number | undefined,
): UserToken => {
    const iat = Math.floor(Units.Ms.toSec(Date.now()))
    if (isUndefined(expiresMs) || expiresMs < SettingsFieldLimits.registrationTokensExpireInMs.min)
        throw ApiResponder.badRequest(ApiMessage.invalid('expiration time'))
    return { expires: iat + expiresMs, ...payload }
}

/** Resolves the full user document from the bearer token on the request. */
const getUserToken = async (req: Request) => {
    const token = req.headers['x-auth-token'] as string
    const secret = process.env.JWT_PRIVATE_KEY
    if (!secret) throw Error(ApiMessage.jwtSecretMissing())

    const decoded = jwt.decode(token) as UserToken
    return await UsersModel.findById(decoded.id)
}

/** Gets and shapes the current user from the request, throwing NOT_FOUND if absent. */
const getCurrentUser = async (req: Request): Promise<CurrentUser> => {
    const user = await getUserToken(req)
    if (!user) throw ApiResponder.notFound('user')

    return { _id: user._id.toString(), isAdmin: user.isAdmin }
}

/**
 * Auth utilities for users — grouped by concern: `password`, `token`, `user`.
 * Reads like sentences: `UsersAuth.password.hash(plain)`, `UsersAuth.token.generate({...})`.
 */
export const UsersAuth = {
    password: {
        SALT_ROUNDS: UserPassword.saltRounds,
        hash: hashPassword,
        verify: verifyPassword,
    },
    token: {
        generate: generateToken,
        verify: verifyToken,
        buildRegistration,
    },
    user: {
        get: getUserToken,
        getCurrent: getCurrentUser,
    },
}
