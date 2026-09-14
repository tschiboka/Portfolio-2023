import { ContextBuilder, Functions } from '@common-utils'
import type { ModalContextType } from './Modal.types'

export const ModalContext = ContextBuilder.CreateContext<ModalContextType>('Modal', {
    isOpen: false,
    setOpen: Functions.noop,
    setClose: Functions.noop,
})
