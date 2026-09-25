import { ModalHooks } from '../Modal.hooks'

type ModalHeaderProps = {
    title: string
}

export const ModalHeader = ({ title }: ModalHeaderProps) => {
    const { setClose } = ModalHooks.useContext()
    return (
        <div className="modal-header">
            <h2>{title}</h2>
            <button className="close-btn" aria-label="Close" onClick={setClose}>
                ✕
            </button>
        </div>
    )
}
