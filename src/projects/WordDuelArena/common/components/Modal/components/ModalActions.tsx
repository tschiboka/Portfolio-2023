import type { ModalAction } from '../Modal.types'

type ModalActionsProps = {
    actions: ModalAction[]
}

export const ModalActions = ({ actions }: ModalActionsProps) => (
    <div className="modal-actions">
        {actions.map((action, index) => (
            <button key={action.label + index} onClick={action.onClick} disabled={action.disabled}>
                {action.label}
            </button>
        ))}
    </div>
)
