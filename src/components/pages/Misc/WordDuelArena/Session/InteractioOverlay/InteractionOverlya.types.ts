export type InteractioinOverlayActions = {
    label: string
    onClick: () => void
}

export type InteractionOverlayConfig = {
    title?: string
    description?: string
    actions?: InteractioinOverlayActions[]
}

export type InteractionModes = 'connect' | 'load-session' | "no-fullscreen"| 'wait-opponent' | "landscape" | 'none'