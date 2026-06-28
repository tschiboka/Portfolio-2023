import { ActionMenu } from './ActionMenu'
import { FullScreen } from './FullScreen'
import { Modal } from './Modal'
import { Popup } from './Popup'

export const Overlay = {
    ActionMenu,
    FullScreen,
    Modal,
    Popup,
}

export type { ActionMenuItem, ActionMenuProps } from './ActionMenu'
export type { OverlayProps, ModalProps, ModalSize } from './Overlay.types'
