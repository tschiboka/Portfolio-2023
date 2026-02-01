export type InteractioinOverlayActions = {
    label: string
    onClick: () => void
}

export type InteractionOverlayConfigType = "info" | "warning" | "error"

export type InteractionOverlayConfig = {
    title?: string
    description?: string
    type?: InteractionOverlayConfigType
    actions?: InteractioinOverlayActions[]
}

export type InteractionModes = 
    'connect' | 
    'load-session' | 
    "no-fullscreen"| 
    'wait-opponent' | 
    "landscape" | 
    'error' | 
    'none'