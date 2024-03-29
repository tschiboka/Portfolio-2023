import * as yup from 'yup'
import { RegistrationForm } from './Register.types'

export const registrationSchema: yup.ObjectSchema<RegistrationForm> = yup.object({
    fullName: yup
        .string()
        .required()
        .min(5)
        .max(20)
        .matches(/^[a-z '-]+$/ig, { 
            message: "Only letters, space ' and - allowed."
        }),
    userName: yup
        .string()
        .required()
        .min(5)
        .max(20),
    email: yup
        .string()
        .required()
        .min(8)
        .max(255),
    password: yup
        .string()
        .required()
        .min(8)
        .max(40)
        .matches(/^(?=.*[a-z])/, 'Must contain at least one lowercase character')
        .matches(/^(?=.*[A-Z])/, 'Must contain at least one uppercase character')
        .matches(/^(?=.*[0-9])/, 'Must contain at least one number')
        .matches(/^(?=.*[~`!@#\$%\^&\*\(\)_\-\+={\[\}\]\|\\:;"'<,>\.\?])/, 'Must contain at least one special character'),
    passwordConfirmation: yup
        .string()
        .required()
        .oneOf([yup.ref("password")], "Passwords must match.")
})