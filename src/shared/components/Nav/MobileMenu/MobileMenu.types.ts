import type { ReactNode } from 'react'
import type { MenuItem } from '../Nav.types'

export type MobileMenuProps = {
    items: MenuItem[]
    pageName: string
    className?: string
    renderImage?: (imageName: string) => ReactNode
    extras?: ReactNode
}
