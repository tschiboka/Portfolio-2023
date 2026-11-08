import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Const } from '@common-ux'
import { ValidationMessage } from '@common-utils'
import { Icons } from './components/Icons'
import type { ObjectSchema } from 'yup'
import type { CategoryFormData } from './Categories.types'

const schema = (parentOptions: string[]): ObjectSchema<CategoryFormData> =>
    yup.object({
        name: yup.string().required().max(20),
        description: yup.string().required().min(10).max(255),
        hasParent: yup.boolean().required(),
        parent: yup
            .string()
            .test('is-valid-parent', ValidationMessage.Invalid('option'), (value) => {
                if (!value) return true
                return parentOptions.includes(value)
            })
            .optional(),
        icon: yup
            .string()
            .required()
            .test(
                'is-valid-icon',
                ValidationMessage.Invalid('option'),
                (value) => Boolean(Icons[value]),
            ),
        color: yup
            .string()
            .required()
            .test(
                'is-valid-color',
                ValidationMessage.Invalid('option'),
                (value) => Boolean(Const.ColorSign[value]),
            ),
    })

export const CategoriesSchema = {
    schema,
    resolver: (parentOptions: string[]) => yupResolver(schema(parentOptions)),
}
