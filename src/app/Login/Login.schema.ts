import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { LoginConstants } from './Login.constants'
import type { ObjectSchema } from 'yup'
import type { LoginFormData } from './Login.types'

const { email, password } = LoginConstants.fieldLimits

const schema: ObjectSchema<LoginFormData> = yup.object({
    email: yup.string().required().min(email.min).max(email.max),
    password: yup.string().required().min(password.min).max(password.max),
})

export const LoginSchema = { schema, resolver: yupResolver(schema) }
