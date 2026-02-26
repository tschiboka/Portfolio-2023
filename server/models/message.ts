import mongoose, { Document } from 'mongoose'
import Joi from 'joi'

interface IMessage extends Document {
    name: string
    email: string
    phone?: string
    message: string
    date: Date
    isRead: boolean
}

const schema = new mongoose.Schema<IMessage>({
    name: {
        type: String,
        required: true,
        maxlength: 50,
        minlength: 1,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        maxlength: 255,
        trim: true,
        lowercase: true,
    },
    phone: {
        type: String,
        maxlength: 16,
        minlength: 10,
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

interface MessageInput {
    name: string
    email: string
    phone?: string
    message: string
    isRead?: boolean
    date?: Date
}

function validateMessage(message: MessageInput) {
    const schema = Joi.object({
        name: Joi.string().max(50).required(),
        email: Joi.string()
            .required()
            .email({ tlds: { allow: false } }),
        phone: Joi.string().regex(/^\d+$/).max(16).allow(''),
        message: Joi.string().required(),
        isRead: Joi.boolean(),
        date: Joi.date(),
    })
    return schema.validate(message)
}

const Message = mongoose.model<IMessage>('Message', schema)

export { Message, validateMessage }
