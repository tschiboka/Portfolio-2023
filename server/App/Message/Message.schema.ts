import Joi from 'joi'
import { isDigits } from '@common-utils'
import type { MessageInput } from './Message.types'
import { MessageFieldLimits } from './Message.constants'

const schema = Joi.object({
    name: Joi.string().max(MessageFieldLimits.name.max).required(),
    email: Joi.string()
        .min(MessageFieldLimits.email.min)
        .max(MessageFieldLimits.email.max)
        .required()
        .email({ tlds: { allow: false } }),
    phone: Joi.string()
        .custom((value) => (value === '' || isDigits(value) ? value : undefined))
        .min(MessageFieldLimits.phone.min)
        .max(MessageFieldLimits.phone.max)
        .allow(''),
    message: Joi.string()
        .min(MessageFieldLimits.message.min)
        .max(MessageFieldLimits.message.max)
        .required(),
    isRead: Joi.boolean(),
    date: Joi.date(),
})

export const MessageSchema = {
    validate: (message: MessageInput) => schema.validate(message),
    schema,
}
