import Joi from 'joi'
import joiObjectId from 'joi-objectid'
import { UsersConstants } from './Users.constants'
import type { LoginInput, TokenInput, UserInput } from './Users.types'
;(Joi as unknown as { objectId: unknown }).objectId = joiObjectId(Joi)

const schema = Joi.object({
    fullName: Joi.string()
        .required()
        .min(UsersConstants.fieldLimits.fullName.min)
        .max(UsersConstants.fieldLimits.fullName.max),
    userName: Joi.string()
        .required()
        .min(UsersConstants.fieldLimits.userName.min)
        .max(UsersConstants.fieldLimits.userName.max),
    email: Joi.string()
        .required()
        .min(UsersConstants.fieldLimits.email.min)
        .max(UsersConstants.fieldLimits.email.max)
        .email({ tlds: { allow: false } }),
    password: Joi.string()
        .min(UsersConstants.fieldLimits.password.min)
        .max(UsersConstants.fieldLimits.password.max)
        .required(),
    isAdmin: Joi.boolean(),
    capabilities: Joi.array().items(
        Joi.string()
            .min(UsersConstants.fieldLimits.capability.min)
            .max(UsersConstants.fieldLimits.capability.max),
    ),
    avatarId: (Joi as unknown as { objectId: (schema: unknown) => Joi.Schema }).objectId(
        Joi as never,
    ),
    created: Joi.date(),
    updated: Joi.date(),
    lastLogin: Joi.date().optional(),
})

const validators = {
    validateUser: (user: UserInput) => schema.validate(user),
    validateLogin: (loginDetails: LoginInput) =>
        Joi.object({
            email: Joi.string()
                .required()
                .email({ tlds: { allow: false } }),
            password: Joi.string().required(),
        }).validate(loginDetails),
    validateToken: (token: TokenInput) =>
        Joi.object({
            token: Joi.string().required(),
        }).validate(token),
    schema,
}

export const UsersSchema = validators
