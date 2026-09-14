import { Const, SearchInputOption } from '@common-ux'
import { icons } from './icons'

export const CategoriesOptions = {
    iconOptions: Object.keys(icons)
        .map((icon) => ({
            label: icon,
            icon: icons[icon],
            value: icon,
        }))
        .sort((a: SearchInputOption, b: SearchInputOption) => a.label.localeCompare(b.label)),

    colorOptions: Object.keys(Const.ColorSign)
        .map((color) => ({
            label: color,
            icon: Const.ColorSign[color],
            value: color,
        }))
        .sort((a: SearchInputOption, b: SearchInputOption) => a.label.localeCompare(b.label)),
}
