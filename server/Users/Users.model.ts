import mongoose from 'mongoose'
import type { IUser } from './Users.types'
import { UserFieldLimits, UserPassword } from './Users.constants'

const schema = new mongoose.Schema<IUser>({
    fullName: {
        type: String,
        required: true,
        minLength: UserFieldLimits.fullName.min,
        maxLength: UserFieldLimits.fullName.max,
        trim: true,
    },
    userName: {
        type: String,
        unique: true,
        required: true,
        minLength: UserFieldLimits.userName.min,
        maxLength: UserFieldLimits.userName.max,
        trim: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        minLength: UserFieldLimits.email.min,
        maxLength: UserFieldLimits.email.max,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        minLength: UserFieldLimits.password.min,
        maxLength: UserPassword.hashLength,
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
