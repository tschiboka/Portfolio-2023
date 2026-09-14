import { useState } from 'react'
import type { ReactNode } from 'react'
import { ModalContext } from './Modal.context'
import { Modal } from './Modal'
import type { ModalContextType, ModalState } from './Modal.types'

export const ModalProvider = ({ children }: { children: ReactNode }) => {
    const [modal, setModal] = useState<ModalState>({ name: null })

    const setOpen: ModalContextType['setOpen'] = (name, props) => setModal({ name, props })
    const setClose = () => setModal({ name: null })

    return (
        <ModalContext.Provider value={{ isOpen: !!modal.name, setOpen, setClose }}>
            {children}
            <Modal modal={modal} onClose={setClose} />
        </ModalContext.Provider>
    )
}
