import * as yup from 'yup'
import { XmasFormData } from './Xmas2025.types'

const msgRegExp = /^[a-zA-Z0-9\s.,?!]*$/
const alphaNumRegExp = /^[a-zA-Z0-9]*$/
export const xmasSchema: yup.ObjectSchema<XmasFormData> = yup.object({
    name: yup
        .string()
        .required("Required")
        .min(4, "Min 4 chars")
        .max(16, "Max 16 chars")
        .matches(alphaNumRegExp, 'Only alphanumerics'),
    message: yup
        .string()
        .required("Required")
        .min(1, "Cannot be empty")
        .max(50, "Max 50 chars")
        .matches(msgRegExp, 'No special characters')
})