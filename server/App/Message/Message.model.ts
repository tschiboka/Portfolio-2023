import mongoose from 'mongoose'
import type { IMessage } from './Message.types'
import { MessageFieldLimits } from './Message.constants'

const schema = new mongoose.Schema<IMessage>({
    name: {
        type: String,
        required: true,
        maxlength: MessageFieldLimits.name.max,
        minlength: MessageFieldLimits.name.min,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        maxlength: MessageFieldLimits.email.max,
        trim: true,
        lowercase: true,
    },
    phone: {
        type: String,
        maxlength: MessageFieldLimits.phone.max,
        minlength: MessageFieldLimits.phone.min,
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
