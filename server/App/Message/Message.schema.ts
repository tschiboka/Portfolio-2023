import Joi from 'joi'
import { isDigits } from '@common-utils'
import { MessageConstants } from './Message.constants'
import type { MessageInput } from './Message.types'

const schema = Joi.object({
    name: Joi.string().max(MessageConstants.fieldLimits.name.max).required(),
    email: Joi.string()
        .min(MessageConstants.fieldLimits.email.min)
        .max(MessageConstants.fieldLimits.email.max)
        .required()
        .email({ tlds: { allow: false } }),
    phone: Joi.string()
        .custom((value: string) => (value === '' || isDigits(value) ? value : undefined))
        .min(MessageConstants.fieldLimits.phone.min)
        .max(MessageConstants.fieldLimits.phone.max)
        .allow(''),
    message: Joi.string()
        .min(MessageConstants.fieldLimits.message.min)
        .max(MessageConstants.fieldLimits.message.max)
        .required(),
    isRead: Joi.boolean(),
    date: Joi.date(),
})

export const MessageSchema = {
    validate: (message: MessageInput) => schema.validate(message),
    schema,
}
