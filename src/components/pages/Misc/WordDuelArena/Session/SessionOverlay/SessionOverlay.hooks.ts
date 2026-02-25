import { useSessionWS } from '../SessionWebSocket'
import {
    InteractionModes,
    InteractionOverlayConfig,
} from './SessionOverlay.types'

type UseGetInteractionOverlayStateProps = {
    mode: InteractionModes
    message: string | null
    enterFullScreen: () => void
}

export const useGetInteractionOverlayState = ({
    mode,
    message,
    enterFullScreen,
}: UseGetInteractionOverlayStateProps) => {
    const { connect } = useSessionWS()

    const config: InteractionOverlayConfig = (() => {
        switch (mode) {
            case 'error':
                return {
                    title: 'Server Error',
                    description: message || 'An error occurred.',
                    type: 'error',
                }
            case 'landscape':
                return {
                    title: 'Landscape Mode Detected',
                    description:
                        'Please rotate your device to portrait mode for the best experience.',
                    type: 'warning',
                }
            case 'no-fullscreen':
                return {
                    title: 'Fullscreen Mode Recommended',
                    description:
                        'Please enter fullscreen mode for the best experience.',
                    type: 'info',
                    actions: [
                        {
                            label: 'Enter Fullscreen',
                            onClick: enterFullScreen,
                        },
                    ],
                }
            case 'connect':
                return {
                    title: 'Not Connected Yet',
                    description: 'Press start',
                    type: 'info',
                    actions: [
                        {
                            label: 'Start',
                            onClick: () => {
                                connect()
                                enterFullScreen()
                            },
                        },
                    ],
                }
            case 'load-session':
                return {
                    title: 'Loading Session',
                    description: 'Please wait while the session loads.',
                    type: 'info',
                }
            case 'wait-opponent':
                return {
                    title: 'Waiting for Opponent',
                    description:
                        'Waiting for your opponent to connect to the session.',
                    type: 'info',
                }
            case 'ended':
                return {
                    title: 'Game Over',
                    description: message || 'The game has ended.',
                    type: 'info',
                    actions: [
                        {
                            label: 'Play Again',
                            onClick: () => {
                                connect()
                                enterFullScreen()
                            },
                        },
                        {
                            label: 'Back to Lobby',
                            onClick: () => {
                                connect()
                                enterFullScreen()
                            },
                        },
                    ],
                }
            case 'none':
            default:
                return {}
        }
    })()

    return { ...config }
}
