import type { ReactNode, RefObject } from 'react'
import type { AccessibleProps } from '../index.types'

export type ActionMenuItem = {
    id: string
    label: string
    icon?: ReactNode
    variant?: string
    disabled?: boolean
    onClick: () => void
}

export type ActionMenuProps = AccessibleProps & {
    anchorRef: RefObject<HTMLElement | null>
    items: ActionMenuItem[]
    align?: 'center' | 'start' | 'end'
    onClose: () => void
}
