import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { ValidationMessage } from '@common-utils'
import { ContactConstants } from './Contact.constants'
import type { ObjectSchema } from 'yup'
import type { ContactFormData } from './Contact.types'

const schema: ObjectSchema<ContactFormData> = yup.object({
    name: yup
        .string()
        .required()
        .max(50)
        .matches(/^[a-z '-]+$/i, {
            message: ValidationMessage.Allowed('name', "letters, space, ' and -"),
        }),
    email: yup
        .string()
        .required()
        .min(6)
        .max(255)
        .email(ValidationMessage.Invalid('email', 'a valid email address')),
    phone: yup
        .string()
        .defined()
        .default('')
        .test('phone-format', ValidationMessage.Invalid('phone', 'a valid phone number'), (val) => {
            if (!val || val.length === 0) return true
            return /^[0-9]+$/.test(val)
        })
        .test('phone-min', ValidationMessage.Bound('phone', 10, 'digits', 'at least'), (val) => {
            if (!val || val.length === 0) return true
            return val.length >= 10
        })
        .test('phone-max', ValidationMessage.Bound('phone', 16, 'digits', 'at most'), (val) => {
            if (!val || val.length === 0) return true
            return val.length <= 16
        }),
    message: yup
        .string()
        .required()
        .min(10, ValidationMessage.Bound('message', 10, 'characters', 'at least'))
        .max(ContactConstants.maxMessageCharacters)
        .matches(/^[a-zA-Z0-9,.!?()&£$*\\[\]:;@'"\-\s]*$/, {
            message: ValidationMessage.Allowed('message', 'letters, numbers and punctuation'),
        }),
})

export const ContactSchema = { schema, resolver: yupResolver(schema) }
