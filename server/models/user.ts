import mongoose, { Document } from 'mongoose'
import Joi from 'joi'
import jwt from 'jsonwebtoken'
import { Request } from 'express'
import joiObjectId from 'joi-objectid'
;(Joi as any).objectId = joiObjectId(Joi)

interface IUser extends Document {
    fullName: string
    userName: string
    email: string
    password: string
    isAdmin: boolean
    capabilities: string[]
    avatarId?: mongoose.Types.ObjectId
    verified: boolean
    active: boolean
    created: Date
    updated: Date
    lastLogin?: Date
}

const schema = new mongoose.Schema<IUser>({
    fullName: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 20,
        trim: true,
    },
    userName: {
        type: String,
        unique: true,
        required: true,
        minLength: 3,
        maxLength: 20,
        trim: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        minLength: 8,
        maxLength: 255,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        minLength: 8,
        maxLength: 255,
        required: true,
        trim: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    capabilities: {
        type: [String],
        default: [],
    },
    avatarId: {
        type: mongoose.Schema.Types.ObjectId,
        default: undefined,
    },
    verified: {
        type: Boolean,
        default: false,
    },
    active: {
        type: Boolean,
        default: false,
    },
    created: {
        type: Date,
        default: Date.now,
    },
    updated: {
        type: Date,
        default: Date.now,
    },
    lastLogin: {
        type: Date,
    },
})

const User = mongoose.model<IUser>('User', schema)

interface UserInput {
    fullName: string
    userName: string
    email: string
    password: string
    isAdmin?: boolean
    capabilities?: string[]
    avatarId?: string
    created?: Date
    updated?: Date
    lastLogin?: Date
}

const validateUser = (user: UserInput) => {
    const schema = Joi.object({
        fullName: Joi.string().required().min(3).max(50),
        userName: Joi.string().required().min(3).max(20),
        email: Joi.string()
            .required()
            .email({ tlds: { allow: false } }),
        // @ts-expect-error pre-existing: .required() doesn't take arguments
        password: Joi.string().min(8).required(40),
        isAdmin: Joi.boolean(),
        capabilities: Joi.array().items(Joi.string().min(5).max(20)),
        avatarId: (Joi as any).objectId(),
        created: Joi.date(),
        updated: Joi.date(),
        lastLogin: Joi.date().optional(),
    })
    return schema.validate(user)
}

interface UserToken {
    id?: string
    isAdmin: boolean
    [key: string]: unknown
}

const generateToken = (userToken: UserToken) => {
    const JWT_PRIVATE_KEY = process.env.JWT_PRIVATE_KEY
    if (!JWT_PRIVATE_KEY) throw Error('Fatal error: JWT Private key is not defined!')

    return jwt.sign(userToken, JWT_PRIVATE_KEY)
}

const getUserToken = async (req: Request) => {
    const userToken = req.headers['x-auth-token'] as string
    const JWT_PRIVATE_KEY = process.env.JWT_PRIVATE_KEY
    if (!JWT_PRIVATE_KEY) throw Error('Fatal error: JWT Private key is not defined!')

    const token = jwt.decode(userToken) as UserToken
    return await User.findById(token.id)
}

export { User, validateUser, generateToken, getUserToken }
