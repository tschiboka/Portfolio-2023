import { ReactNode } from 'react'
import { AccessibleProps } from '../index.types'

export type SideMenuItem = {
    icon: ReactNode
    label: string
    onClick?: () => void
    highlighted?: boolean
    badge?: ReactNode
}

export type SideMenuProps = AccessibleProps & {
    items: SideMenuItem[]
    visible?: boolean
    onClose?: () => void
}
