import type { ReactNode } from 'react'
import type { MenuItem, NavProps, SubmenuState } from '../Nav.types'

export type NavMenuProps = Pick<
    NavProps,
    'visible' | 'className' | 'ariaLabel' | 'logo' | 'burger'
> & {
    items: MenuItem[]
    pageName: string
    isLoading?: boolean
    submenu?: SubmenuState
    renderImage?: (imageName: string) => ReactNode
    onItemClick?: (item: MenuItem) => void
    onSubmenuToggle?: () => void
}
