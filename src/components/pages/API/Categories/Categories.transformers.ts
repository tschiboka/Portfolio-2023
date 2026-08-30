import { GetCategoryResponse } from '@types'
import { icons } from './icons'
import { SearchInputOption } from '@ux'

export const getParents = {
    fromApi: (categories: GetCategoryResponse[]): SearchInputOption[] =>
        categories.map((c) => ({
            label: c.name,
            value: c._id,
            icon: icons[c.icon],
            iconColor: c.color,
        })),
}
