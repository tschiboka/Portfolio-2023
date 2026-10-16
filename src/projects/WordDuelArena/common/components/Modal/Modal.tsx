import { MouseEvent } from 'react'
import { ModalDefaults } from './Modal.defaults'
import { ModalHeader } from './components/ModalHeader'
import { ModalBody } from './components/ModalBody'
import { ModalActions } from './components/ModalActions'
import type { ModalState } from './Modal.types'
import './Modal.styles.css'

type ModalProps = {
    modal: ModalState
    onClose: () => void
}

export const Modal = ({ modal, onClose }: ModalProps) => {
    if (!modal.name) return null
    const ModalComponent = ModalDefaults[modal.name]

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div onClick={(e: MouseEvent) => e.stopPropagation()}>
                <ModalComponent {...modal.props} />
            </div>
        </div>
    )
}

Modal.Header = ModalHeader
Modal.Body = ModalBody
Modal.Actions = ModalActions
