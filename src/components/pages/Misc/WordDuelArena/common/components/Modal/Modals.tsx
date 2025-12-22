import { createContext, ReactNode, useContext, useState } from 'react'
import { Modal } from './Modal'
import { InvitationModal } from '../../../Home/InvitationModal/InvitationModal'

export const MODALS = {
    invite: InvitationModal,
}

export type ModalName = keyof typeof MODALS
export type ModalState = { name: null } | { name: ModalName; props?: any }

type ModalContextType = {
    isOpen: boolean
    setOpen: (name: ModalName, props?: any) => void
    setClose: () => void
}

const ModalContext = createContext<ModalContextType | null>(null)

export const ModalProvider = ({ children }: { children: ReactNode }) => {
    const [modal, setModal] = useState<ModalState>({ name: null })
    const setOpen = (name: ModalName, props?: any) => setModal({ name, props })
    const setClose = () => setModal({ name: null })

    return (
        <ModalContext.Provider
            value={{ isOpen: !!modal.name, setOpen, setClose }}
        >
            {children}
            <Modal modal={modal} onClose={setClose} />
        </ModalContext.Provider>
    )
}

export const useModal = () => {
    const context = useContext(ModalContext)
    if (!context) {
        throw new Error('useModal must be used within a ModalProvider')
    }
    return context
}
