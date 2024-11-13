import * as yup from 'yup'
import { colors } from './colors'
import { icons } from './icons'
import { CategoryFormData } from './Categories.types'

export const categoriesSchema = (parentOptions: string[]): yup.ObjectSchema<CategoryFormData> => yup.object({
    name: yup.string().required().max(20),
    description: yup.string().required().min(10).max(255),
    isParent: yup.boolean().required(),
    hasParent: yup.boolean().required(),
    parent: yup.string().test('is-valid-parent', 'Invalid option', (value) => {
        if (!value) return true
        return parentOptions.includes(value)
    })
    .optional(),
    icon: yup.string().required().test("is-valid-icon", "Invalid option", (value) => Boolean(icons[value])),
    color: yup.string().required().test("is-valid-color", "Invalid option", (value) => Boolean(colors[value])),
})