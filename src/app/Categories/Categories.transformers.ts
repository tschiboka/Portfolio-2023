import { GetCategoryResponse } from '@common-types'
import { SearchInputOption } from '@common-ux'
import { icons } from './icons'

export const CategoriesTransformers = {
    fromApi: (categories: GetCategoryResponse[]): SearchInputOption[] =>
        categories.map((c) => ({
            label: c.name,
            value: c._id,
            icon: icons[c.icon],
            iconColor: c.color,
        })),
}
