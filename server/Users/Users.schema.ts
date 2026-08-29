import Joi from 'joi'
import joiObjectId from 'joi-objectid'
;(Joi as unknown as { objectId: unknown }).objectId = joiObjectId(Joi as never)
import type { LoginInput, TokenInput, UserInput } from './Users.types'
import { UserFieldLimits } from './Users.constants'

const schema = Joi.object({
    fullName: Joi.string()
        .required()
        .min(UserFieldLimits.fullName.min)
        .max(UserFieldLimits.fullName.max),
    userName: Joi.string()
        .required()
        .min(UserFieldLimits.userName.min)
        .max(UserFieldLimits.userName.max),
    email: Joi.string()
        .required()
        .min(UserFieldLimits.email.min)
        .max(UserFieldLimits.email.max)
        .email({ tlds: { allow: false } }),
    password: Joi.string()
        .min(UserFieldLimits.password.min)
        .max(UserFieldLimits.password.max)
        .required(),
    isAdmin: Joi.boolean(),
    capabilities: Joi.array().items(
        Joi.string().min(UserFieldLimits.capability.min).max(UserFieldLimits.capability.max),
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
