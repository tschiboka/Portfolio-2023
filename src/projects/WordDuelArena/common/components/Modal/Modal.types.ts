import type { Dictionary } from '@common-utils'
import { ModalRegistry } from './Modal.defaults'

export type ModalName = keyof typeof ModalRegistry

export type ModalState = { name: null } | { name: ModalName; props?: Dictionary }

export type ModalContextType = {
    isOpen: boolean
    setOpen: (name: ModalName, props?: Dictionary) => void
    setClose: () => void
}

export type ModalAction = {
    label: string
    onClick: () => void
    disabled?: boolean
}
