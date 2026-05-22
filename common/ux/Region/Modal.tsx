import { Region } from './Region'
import type { ModalProps } from './Region.types'

export const Modal = ({ ...rest }: ModalProps) => <Region variant="modal" {...rest} />
