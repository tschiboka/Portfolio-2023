import { MenuItem, SubmenuState } from './Nav.types'

export const isArticle = (path: string | undefined): boolean => /^\/blog\//.test(path || '')

export const isActive = (label: string, pageName: string) =>
    label.toLowerCase() === pageName.toLowerCase() ? 'active' : ''

export const isHighlighted = (item: MenuItem, pageName: string, submenu?: SubmenuState) =>
    submenu ? (submenu.parentLabel === item?.label ? 'active' : '') : isActive(item.label, pageName)

export const collectMenuGroups = (menu: MenuItem[]): MenuItem[][] => [
    menu,
    ...menu.filter((item) => item.submenu).flatMap((item) => collectMenuGroups(item.submenu!)),
]
