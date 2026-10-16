import * as yup from 'yup'
import { LoginFormData } from './Login.types'

export const LoginSchema: yup.ObjectSchema<LoginFormData> = yup.object({
    email: yup.string().required().min(8).max(255),
    password: yup.string().required().min(8).max(40),
})
