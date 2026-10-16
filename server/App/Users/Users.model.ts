import mongoose from 'mongoose'
import type { IUser } from './Users.types'
import { UsersConstants } from './Users.constants'

const schema = new mongoose.Schema<IUser>({
    fullName: {
        type: String,
        required: true,
        minLength: UsersConstants.fieldLimits.fullName.min,
        maxLength: UsersConstants.fieldLimits.fullName.max,
        trim: true,
    },
    userName: {
        type: String,
        unique: true,
        required: true,
        minLength: UsersConstants.fieldLimits.userName.min,
        maxLength: UsersConstants.fieldLimits.userName.max,
        trim: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        minLength: UsersConstants.fieldLimits.email.min,
        maxLength: UsersConstants.fieldLimits.email.max,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        minLength: UsersConstants.fieldLimits.password.min,
        maxLength: UsersConstants.password.hashLength,
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

export const UsersModel = mongoose.model<IUser>('User', schema)
