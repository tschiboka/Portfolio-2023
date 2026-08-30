import { SearchInputOption } from '@ux'
import { GetCategoryResponse } from '@types'
import { colors } from './colors'
import { icons } from './icons'
import { isDefined } from '@utils'
import { ReactNode } from 'react'
import { CellMeta, CellValue } from '@ux'

export const iconOptions: SearchInputOption[] = Object.keys(icons)
    .map((icon) => ({
        label: icon,
        icon: icons[icon],
        value: icon,
    }))
    .sort((a: SearchInputOption, b: SearchInputOption) => a.label.localeCompare(b.label))

export const colorOptions: SearchInputOption[] = Object.keys(colors)
    .map((color) => ({
        label: color,
        icon: colors[color],
        value: color,
    }))
    .sort((a: SearchInputOption, b: SearchInputOption) => a.label.localeCompare(b.label))

export const getParentCategory = (
    cell: CellValue<GetCategoryResponse>,
    { data }: CellMeta<GetCategoryResponse>,
): ReactNode => {
    const parent = data.find((c) => c._id === cell)
    return isDefined(parent?.name)
}
