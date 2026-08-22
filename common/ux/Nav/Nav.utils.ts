import { MenuItem, SubmenuState } from './Nav.types'
import type { Optional } from '@common/utils'
import { Strings } from '@common/utils/Strings'

export const isArticle = (path: Optional<string>): boolean => /^\/blog\//.test(path || '')

export const isActive = (label: string, pageName: string) =>
    Strings.equalIgnoreCase(label, pageName) ? 'active' : ''

export const isHighlighted = (item: MenuItem, pageName: string, submenu?: SubmenuState) =>
    submenu ? (submenu.parentLabel === item?.label ? 'active' : '') : isActive(item.label, pageName)

export const collectMenuGroups = (menu: MenuItem[]): MenuItem[][] => [
    menu,
    ...menu.filter((item) => item.submenu).flatMap((item) => collectMenuGroups(item.submenu!)),
]
