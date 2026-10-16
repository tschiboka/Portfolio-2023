import { GetCategoryResponse } from '@common-types'
import { SearchInputOption } from '@common-ux'
import { Icons } from './components/Icons'

export const CategoriesTransformers = {
    fromApi: (categories: GetCategoryResponse[]): SearchInputOption[] =>
        categories.map((c) => ({
            label: c.name,
            value: c._id,
            icon: Icons[c.icon],
            iconColor: c.color,
        })),
}
