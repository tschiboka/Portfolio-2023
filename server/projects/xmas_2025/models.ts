import Joi from 'joi'
import mongoose, { Document } from 'mongoose'

interface IXmasMessage extends Document {
    name: string
    message: string
    isRead: boolean
    userId: mongoose.Types.ObjectId
}

interface MessageInput {
    name: string
    message: string
    isRead?: boolean
    userId: string
}

interface CandleInput {
    candle1: boolean
    candle2: boolean
    candle3: boolean
    candle4: boolean
}

const xmasMessageSchema = new mongoose.Schema<IXmasMessage>(
    {
        name: {
            type: String,
            required: true,
            minLength: 4,
            maxLength: 16,
            trim: true,
        },
        message: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 50,
            trim: true,
        },
        isRead: {
            type: Boolean,
            default: false,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
    },
    { timestamps: true },
)

const XmasMessage = mongoose.model<IXmasMessage>('XmasMessage', xmasMessageSchema)

function validateMessage(message: MessageInput) {
    const schema = Joi.object({
        name: Joi.string().required().min(4).max(16),
        message: Joi.string().required().min(1).max(50),
        isRead: Joi.boolean(),
        userId: Joi.string().required(),
    })

    return schema.validate(message)
}

const XmasCandleSchema = new mongoose.Schema({
    candle1: { type: Boolean, default: false },
    candle2: { type: Boolean, default: false },
    candle3: { type: Boolean, default: false },
    candle4: { type: Boolean, default: false },
})
const XmasCandle = mongoose.model('XmasCandle', XmasCandleSchema)

function validateCandle(candle: CandleInput) {
    const schema = Joi.object({
        candle1: Joi.boolean().required(),
        candle2: Joi.boolean().required(),
        candle3: Joi.boolean().required(),
        candle4: Joi.boolean().required(),
    })

    return schema.validate(candle)
}

export { XmasCandle, validateMessage, XmasMessage, validateCandle }
