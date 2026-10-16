import mongoose from 'mongoose'
import type { IMessage } from './Message.types'
import { MessageConstants } from './Message.constants'

const schema = new mongoose.Schema<IMessage>({
    name: {
        type: String,
        required: true,
        maxlength: MessageConstants.fieldLimits.name.max,
        minlength: MessageConstants.fieldLimits.name.min,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        maxlength: MessageConstants.fieldLimits.email.max,
        trim: true,
        lowercase: true,
    },
    phone: {
        type: String,
        maxlength: MessageConstants.fieldLimits.phone.max,
        minlength: MessageConstants.fieldLimits.phone.min,
        trim: true,
    },
    message: {
        type: String,
        required: true,
        trim: true,
    },
    date: {
        type: Date,
        default: Date.now(),
    },
    isRead: {
        type: Boolean,
        default: false,
    },
})

export const MessageModel = mongoose.model<IMessage>('Message', schema)
