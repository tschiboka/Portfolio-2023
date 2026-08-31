import { useModal } from './Modals'

type ModalHeaderProps = {
    title: string
}

export const ModalHeader = ({ title }: ModalHeaderProps) => {
    const { setClose } = useModal()
    return (
        <div className="modal-header">
            <h2>{title}</h2>
            <button className="close-btn" aria-label="Close" onClick={setClose}>
                ✕
            </button>
        </div>
    )
}
