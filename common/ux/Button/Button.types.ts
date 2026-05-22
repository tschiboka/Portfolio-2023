import type { ComponentType } from 'react'
import type { AccessibleProps } from '../index.types'

export type ButtonVariant = 'primary' | 'secondary'
export type ButtonSize = 'sm' | 'md'
export type ButtonType = 'submit' | 'button' | 'reset'

type CommonProps = AccessibleProps & {
    children: React.ReactNode
    variant?: ButtonVariant
    size?: ButtonSize
}

export type AsButton = CommonProps & {
    as?: 'button'
    type?: ButtonType
    disabled?: boolean
    onClick?: () => void
}

export type AsAnchor = CommonProps & {
    as: 'a'
    href: string
    download?: boolean
    target?: string
    rel?: string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AsComponent = CommonProps & { as: ComponentType<any>; [key: string]: unknown }

export type ButtonProps = AsButton | AsAnchor | AsComponent
