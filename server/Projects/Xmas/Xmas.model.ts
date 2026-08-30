import mongoose from 'mongoose'
import type { IXmasMessage } from './Xmas.types'
import { XmasFieldLimits } from './Xmas.constants'

const xmasMessageSchema = new mongoose.Schema<IXmasMessage>(
    {
        name: {
            type: String,
            required: true,
            minLength: XmasFieldLimits.name.min,
            maxLength: XmasFieldLimits.name.max,
            trim: true,
        },
        message: {
            type: String,
            required: true,
            minLength: XmasFieldLimits.message.min,
            maxLength: XmasFieldLimits.message.max,
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

const XmasMessageModel = mongoose.model<IXmasMessage>('XmasMessage', xmasMessageSchema)

const XmasCandleSchema = new mongoose.Schema({
    candle1: { type: Boolean, default: false },
    candle2: { type: Boolean, default: false },
    candle3: { type: Boolean, default: false },
    candle4: { type: Boolean, default: false },
})

const XmasCandleModel = mongoose.model('XmasCandle', XmasCandleSchema)

export { XmasMessageModel, XmasCandleModel }
