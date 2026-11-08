import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Const } from '@common-ux'
import { isEmpty, isString, ValidationMessage } from '@common-utils'
import { CategoriesConstants } from './Categories.constants'
import { Icons } from './components/Icons'
import type { ObjectSchema } from 'yup'
import type { CategoryFormData } from './Categories.types'

const { name, description } = CategoriesConstants.fieldLimits

const schema = (parentOptions: string[]): ObjectSchema<CategoryFormData> =>
    yup.object({
        name: yup.string().required().max(name.max),
        description: yup.string().required().min(description.min).max(description.max),
        hasParent: yup.boolean().required(),
        parent: yup
            .string()
            .test('is-valid-parent', ValidationMessage.Invalid('option'), (value) =>
                isEmpty(value) || (isString(value) && parentOptions.includes(value)),
            )
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
