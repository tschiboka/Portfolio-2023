import * as yup from 'yup'
import { CategoriesFormData } from '.'
import { colors } from './colors'
import { icons } from './icons'

export const categoriesSchema: yup.ObjectSchema<CategoriesFormData> = yup.object({
    // name: yup.string().required().max(20),
    name: yup.string(),
    description: yup.string().required().min(10).max(255),
    icon: yup.string().oneOf(Object.keys(icons),  "Must be one of the selections").required(),
    color: yup.string().oneOf(Object.keys(colors), "Must be one of the selections")
})