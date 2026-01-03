import { useSessionWS } from "../SessionWebSocket"
import { InteractionModes, InteractionOverlayConfig } from "./InteractionOverlya.types"

export const useGetInteractionOverlayState = (
    mode: InteractionModes,
    enterFullScreen: () => void,
) => {
    const { connect } = useSessionWS()

    const config: InteractionOverlayConfig = (() => {
        switch (mode) {
        case 'landscape':
            return {
                title: 'Landscape Mode Detected',
                description: 'Please rotate your device to portrait mode for the best experience.',
            }
        case 'connect':
            return {
                title: 'Not Connected Yet',
                description: 'Press start',
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
            }
        case 'wait-opponent':
            return {
                title: 'Waiting for Opponent',
                description:
                    'Waiting for your opponent to connect to the session.',
            }
        case 'none':
        default:
            return {}
    }
    })()

    return { ...config }
}
