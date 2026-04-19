import { GetCategoryResponse } from '@common/types'
import { icons } from './icons'
import { SearchInputOption } from '@common/ux'

export const getParents = {
    fromApi: (categories: GetCategoryResponse[]): SearchInputOption[] =>
        categories.map((c) => ({
            label: c.name,
            value: c._id,
            icon: icons[c.icon],
            iconColor: c.color,
        })),
}
