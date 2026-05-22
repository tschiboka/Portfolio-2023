import type { ReactNode } from 'react'
import type { AccessibleProps, InteractiveProps } from '../index.types'

export type RegionVariant = 'default' | 'section' | 'modal' | 'sidebar' | 'header' | 'main'

export type RegionProps = AccessibleProps &
    InteractiveProps & {
        children: ReactNode
        variant?: RegionVariant
        collapsible?: boolean
        title?: string
        icon?: ReactNode
        defaultOpen?: boolean
    }

export type CardProps = AccessibleProps &
    InteractiveProps & {
        children: ReactNode
        title?: string
        icon?: ReactNode
    }

export type ModalProps = AccessibleProps &
    InteractiveProps & {
        children: ReactNode
        title?: string
        icon?: ReactNode
    }

export type SidebarProps = AccessibleProps &
    InteractiveProps & {
        children: ReactNode
        title?: string
        icon?: ReactNode
    }

export type HeaderProps = AccessibleProps & {
    children: ReactNode
}

export type MainProps = AccessibleProps & {
    children: ReactNode
}

export type SectionProps = AccessibleProps & {
    children: ReactNode
    title?: string
    icon?: ReactNode
    expandable?: boolean
    defaultOpen?: boolean
}
