import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { hasLength, isDigits, isString, Regexp, ValidationMessage } from '@common-utils'
import { ContactConstants } from './Contact.constants'
import type { ObjectSchema } from 'yup'
import type { ContactFormData } from './Contact.types'

const { fieldLimits, messagePattern } = ContactConstants
const { name, email, phone, message } = fieldLimits

/** A rule that only applies once something is typed — an empty phone is not a wrong one. */
const whenFilled =
    (rule: (value: string) => boolean) =>
    (value?: string): boolean =>
        isString(value) && hasLength(value) ? rule(value) : true

const schema: ObjectSchema<ContactFormData> = yup.object({
    name: yup
        .string()
        .required()
        .max(name.max)
        .matches(Regexp.NameText, {
            message: ValidationMessage.Allowed('name', "letters, space, ' and -"),
        }),
    email: yup
        .string()
        .required()
        .min(email.min)
        .max(email.max)
        .email(ValidationMessage.Invalid('email', 'a valid email address')),
    phone: yup
        .string()
        .defined()
        .default('')
        .test(
            'phone-format',
            ValidationMessage.Invalid('phone', 'a valid phone number'),
            whenFilled(isDigits),
        )
        .test(
            'phone-min',
            ValidationMessage.Bound('phone', phone.min, 'digits', 'at least'),
            whenFilled((value) => value.length >= phone.min),
        )
        .test(
            'phone-max',
            ValidationMessage.Bound('phone', phone.max, 'digits', 'at most'),
            whenFilled((value) => value.length <= phone.max),
        ),
    message: yup
        .string()
        .required()
        .min(
            message.min,
            ValidationMessage.Bound('message', message.min, 'characters', 'at least'),
        )
        .max(message.max)
        .matches(messagePattern, {
            message: ValidationMessage.Allowed('message', 'letters, numbers and punctuation'),
        }),
})

export const ContactSchema = { schema, resolver: yupResolver(schema) }
