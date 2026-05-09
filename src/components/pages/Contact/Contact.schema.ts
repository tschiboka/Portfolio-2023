import * as yup from 'yup'
import { ContactFormData } from './Contact.types'

export const MAX_MESSAGE_CHARACTERS = 1000

export const contactSchema: yup.ObjectSchema<ContactFormData> = yup.object({
    name: yup
        .string()
        .required()
        .max(50)
        .matches(/^[a-z '-]+$/i, {
            message: "Only letters, space, ' and - allowed.",
        }),
    email: yup.string().required().min(6).max(255).email('Invalid email format'),
    phone: yup
        .string()
        .defined()
        .default('')
        .test('phone-format', 'Invalid phone format', (val) => {
            if (!val || val.length === 0) return true
            return /^[0-9]+$/.test(val)
        })
        .test('phone-min', 'Phone must be at least 10 digits', (val) => {
            if (!val || val.length === 0) return true
            return val.length >= 10
        })
        .test('phone-max', 'Phone must be at most 16 digits', (val) => {
            if (!val || val.length === 0) return true
            return val.length <= 16
        }),
    message: yup
        .string()
        .required()
        .min(10, 'Min 10 characters')
        .max(MAX_MESSAGE_CHARACTERS)
        .matches(/^[a-zA-Z0-9,.!?()&£$*\\[\]:;@'"\-\s]*$/, {
            message: 'Contains invalid characters',
        }),
})
