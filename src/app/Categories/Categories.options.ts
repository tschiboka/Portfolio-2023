import { Const, SearchInputOption } from '@common-ux'
import { Icons } from './components/Icons'

export const CategoriesOptions = {
    iconOptions: Object.keys(Icons)
        .map((icon) => ({
            label: icon,
            icon: Icons[icon],
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
