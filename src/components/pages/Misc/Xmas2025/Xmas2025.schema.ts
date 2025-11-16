import * as yup from 'yup'
import { XmasFormData } from './Xmas2025.types'

export const xmasSchema: yup.ObjectSchema<XmasFormData> = yup.object({
    name: yup.string().required().min(4).max(20),
    message: yup.string().required().min(1).max(40)
})