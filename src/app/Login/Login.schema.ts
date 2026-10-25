import * as yup from 'yup'
import type { ObjectSchema } from 'yup'
import type { LoginFormData } from './Login.types'

export const LoginSchema: ObjectSchema<LoginFormData> = yup.object({
    email: yup.string().required().min(8).max(255),
    password: yup.string().required().min(8).max(40),
})
