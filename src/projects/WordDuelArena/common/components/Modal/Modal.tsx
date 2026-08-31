import { MouseEvent } from 'react'
import { MODALS, ModalState } from './Modals'
import { ModalHeader } from './ModalHeader'
import { ModalBody } from './ModalBody'
import { ModalActions } from './ModalActions'
import './Modal.styles.css'

type ModalProps = {
    modal: ModalState
    onClose: () => void
}

export const Modal = ({ modal, onClose }: ModalProps) => {
    if (!modal.name) return null
    const ModalComponent = MODALS[modal.name]

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
