import { CSSProperties, ReactNode, RefObject } from 'react'
import { AccessibleProps } from '../index.types'

export type OverlayProps = AccessibleProps & {
    children: ReactNode
}

export type PopupSize = 'sm' | 'md' | 'lg'
export type PopupMode = 'primary' | 'warning' | 'danger' | 'info'
export type PopupArrow = 'top' | 'bottom' | 'left' | 'right'

export type AnchorAlign = 'center' | 'start' | 'end'

export type AnchorResult = {
    style: CSSProperties
    arrow: PopupArrow
    arrowStyle: CSSProperties
    /** Corner radius overrides when the arrow is near an edge */
    cornerStyle: CSSProperties
}

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

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl'

export type ModalProps = AccessibleProps & {
    children?: ReactNode
    title?: string
    message?: ReactNode
    icon?: ReactNode
    size?: ModalSize
    mode?: PopupMode
    actions?: PopupAction[]
    showClose?: boolean
    onClose: () => void
}
