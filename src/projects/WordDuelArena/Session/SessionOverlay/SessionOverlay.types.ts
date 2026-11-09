import { ReactNode } from 'react'
import type { VoidFunction } from '@common-utils'

export type SessionOverlayActions = {
    label: string
    onClick: VoidFunction
}

export type SessionOverlayConfigType = 'info' | 'warning' | 'error'

export type SessionOverlayConfig = {
    title?: string
    description?: string | ReactNode
    type?: SessionOverlayConfigType
    actions?: SessionOverlayActions[]
}

export type SessionOverlayModes =
    | 'connect'
    | 'load-session'
    | 'no-fullscreen'
    | 'wait-opponent'
    | 'landscape'
    | 'error'
    | 'none'
    | 'ended'
