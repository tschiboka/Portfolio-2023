import Joi from 'joi'
import { XmasConstants } from './Xmas.constants'
import type { XmasMessageInput, XmasCandleInput } from './Xmas.types'

const { fieldLimits } = XmasConstants

const messageSchema = Joi.object({
    name: Joi.string().required().min(fieldLimits.name.min).max(fieldLimits.name.max),
    message: Joi.string().required().min(fieldLimits.message.min).max(fieldLimits.message.max),
    isRead: Joi.boolean(),
    userId: Joi.string().required(),
})

const candleSchema = Joi.object({
    candle1: Joi.boolean().required(),
    candle2: Joi.boolean().required(),
    candle3: Joi.boolean().required(),
    candle4: Joi.boolean().required(),
})

export const XmasSchema = {
    Message: {
        schema: messageSchema,
        validate: (input: XmasMessageInput) => messageSchema.validate(input),
    },
    Candle: {
        schema: candleSchema,
        validate: (input: XmasCandleInput) => candleSchema.validate(input),
    },
}
