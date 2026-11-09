import type { ReactNode, RefObject } from 'react'
import type { Nullable, VoidFunction } from '@common-utils'
import type { AccessibleProps } from '../index.types'

export type ActionMenuItem = {
    id: string
    label: string
    icon?: ReactNode
    variant?: string
    disabled?: boolean
    onClick: VoidFunction
}

export type ActionMenuProps = AccessibleProps & {
    anchorRef: RefObject<Nullable<HTMLElement>>
    items: ActionMenuItem[]
    align?: 'center' | 'start' | 'end'
    onClose: VoidFunction
}
