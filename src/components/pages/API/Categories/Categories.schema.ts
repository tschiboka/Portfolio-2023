import * as yup from 'yup'
import { CategoryResource } from '../common/types'
import { colors } from './colors'
import { icons } from './icons'

export const categoriesSchema: yup.ObjectSchema<CategoryResource> = yup.object({
    name: yup.string().required().max(20),
    isParent: yup.boolean().required(),
    parent: yup.string().optional(),
    description: yup.string().required().min(10).max(255),
    icon: yup.string().oneOf(Object.keys(icons),  "Must be one of the selections").required(),
    color: yup.string().oneOf(Object.keys(colors), "Must be one of the selections")
})