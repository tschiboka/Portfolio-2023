import { ReactNode, RefObject } from 'react'
import { AccessibleProps } from '../index.types'

export type OverlayProps = AccessibleProps & {
    children: ReactNode
}

export type PopupSize = 'sm' | 'md' | 'lg'
export type PopupMode = 'primary' | 'warning' | 'danger' | 'info'
export type PopupArrow = 'top' | 'bottom' | 'left' | 'right'

export type PopupAction = {
    label: string
    variant?: 'primary' | 'secondary'
    when?: boolean
    onClick: () => void
}

export type PopupProps = AccessibleProps & {
    children?: ReactNode
    title?: string
    message?: ReactNode
    icon?: ReactNode
    size?: PopupSize
    mode?: PopupMode
    anchorRef: RefObject<HTMLElement | null>
    actions?: PopupAction[]
    showClose?: boolean
    onClose: () => void
}
