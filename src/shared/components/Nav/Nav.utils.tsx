import { MenuItem, SubmenuState } from './Nav.types'
import type { Optional } from '@common-utils'
import { Strings } from '@common-utils'
import SantaHat from '@projects/assets/xmas/santa_hat.png'

const isArticle = (path: Optional<string>): boolean => /^\/blog\//.test(path || '')

const isActive = (label: string, pageName: string) =>
    Strings.equalIgnoreCase(label, pageName) ? 'active' : ''

const isHighlighted = (item: MenuItem, pageName: string, submenu?: SubmenuState) =>
    submenu ? (submenu.parentLabel === item?.label ? 'active' : '') : isActive(item.label, pageName)

const collectMenuGroups = (menu: MenuItem[]): MenuItem[][] => [
    menu,
    ...menu.filter((item) => item.submenu).flatMap((item) => collectMenuGroups(item.submenu!)),
]

const getMenuItemImage = (imageName: string) => {
    switch (imageName) {
        case 'xmas_hat':
            return <img className="xmas-hat" src={SantaHat} alt="Xmas Hat" />
        default:
            return null
    }
}

export const NavUtils = {
    isArticle,
    isActive,
    isHighlighted,
    collectMenuGroups,
    getMenuItemImage,
}
