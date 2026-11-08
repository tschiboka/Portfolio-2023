import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import type { ObjectSchema } from 'yup'
import type { LoginFormData } from './Login.types'

const schema: ObjectSchema<LoginFormData> = yup.object({
    email: yup.string().required().min(8).max(255),
    password: yup.string().required().min(8).max(40),
})

export const LoginSchema = { schema, resolver: yupResolver(schema) }
