import { useFullScreen } from "../../common/utils"
import { useSessionWS } from "../SessionWebSocket"
import { InteractionModes, InteractionOverlayConfig } from "./InteractionOverlya.types"

export const interactionOverlayState = (
    mode: InteractionModes,
): InteractionOverlayConfig => {
    const { connect } = useSessionWS()
    const { enterFullScreen } = useFullScreen()

    switch (mode) {
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
}
