import { SearchInputOption } from '../../../sharedComponents/WrappedFormComponents/WrappedFormComponents'
import { GetCategoryResponse } from '@common/types'
import { icons } from './icons'

export const getParents = {
    fromApi: (categories: GetCategoryResponse[]): SearchInputOption[] =>
        categories.map((c) => ({
            label: c.name,
            value: c._id,
            icon: icons[c.icon],
            iconColor: c.color,
        })),
}
