import { ReactNode } from 'react'
import { AccessibleProps } from '../index.types'
import type { VoidFunction } from '@common-utils'

export type SideMenuItem = {
    icon: ReactNode
    label: string
    onClick?: VoidFunction
    highlighted?: boolean
    badge?: ReactNode
}

export type SideMenuProps = AccessibleProps & {
    items: SideMenuItem[]
    visible?: boolean
    onClose?: VoidFunction
}
