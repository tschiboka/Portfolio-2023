import { ReactNode } from 'react'

export type InteractioinOverlayActions = {
    label: string
    onClick: () => void
}

export type InteractionOverlayConfigType = 'info' | 'warning' | 'error'

export type InteractionOverlayConfig = {
    title?: string
    description?: string | ReactNode
    type?: InteractionOverlayConfigType
    actions?: InteractioinOverlayActions[]
}

export type InteractionModes =
    | 'connect'
    | 'load-session'
    | 'no-fullscreen'
    | 'wait-opponent'
    | 'landscape'
    | 'error'
    | 'none'
    | 'ended'
