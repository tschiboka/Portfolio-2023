import Joi from 'joi'
import type { XmasMessageInput, XmasCandleInput } from './Xmas.types'
import { XmasFieldLimits } from './Xmas.constants'

const messageSchema = Joi.object({
    name: Joi.string().required().min(XmasFieldLimits.name.min).max(XmasFieldLimits.name.max),
    message: Joi.string()
        .required()
        .min(XmasFieldLimits.message.min)
        .max(XmasFieldLimits.message.max),
    isRead: Joi.boolean(),
    userId: Joi.string().required(),
})

const MessageSchema = {
    schema: messageSchema,
    validate: (input: XmasMessageInput) => messageSchema.validate(input),
}

const candleSchema = Joi.object({
    candle1: Joi.boolean().required(),
    candle2: Joi.boolean().required(),
    candle3: Joi.boolean().required(),
    candle4: Joi.boolean().required(),
})

const CandleSchema = {
    schema: candleSchema,
    validate: (input: XmasCandleInput) => candleSchema.validate(input),
}

export { MessageSchema, CandleSchema }
// keybinding test bottom
