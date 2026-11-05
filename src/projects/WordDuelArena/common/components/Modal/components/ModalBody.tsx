import { ReactNode } from 'react'

type ModalBodyProps = {
    children: ReactNode
}

export const ModalBody = ({ children }: ModalBodyProps) => (
    <div className="modal-body">{children}</div>
)
