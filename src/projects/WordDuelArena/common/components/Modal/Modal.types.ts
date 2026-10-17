import { ModalDefaults } from './Modal.defaults'
import type { Dictionary } from '@common-utils'

export type ModalName = keyof typeof ModalDefaults

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
