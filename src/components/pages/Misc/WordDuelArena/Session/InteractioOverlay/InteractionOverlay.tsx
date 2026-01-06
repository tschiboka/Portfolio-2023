import { useSession } from '../Session.context'
import { InteractionModes } from './InteractionOverlya.types'
import { useGetInteractionOverlayState } from './InteractionOverlay.hooks'
import './InteractionOverlay.styles.css'
import { useOrientation } from '../../common/utils'
import { useSessionWS } from '../SessionWebSocket'

export const InteractionOverlay = ({
    enterFullScreen,
    isFullscreen,
}: {
    enterFullScreen: () => void
    isFullscreen: boolean
}) => {
    const { orientation, isMobile } = useOrientation()
    const { sessionState } = useSession()
    const { errorMessage } = useSessionWS()
    if (!sessionState) return null

    let mode: InteractionModes = 'none'

    if (!sessionState?.players || !sessionState.role) mode = 'connect'
    else {
        const player =
            sessionState?.players[
                sessionState.role as keyof typeof sessionState.players
            ]
        const meConnected = player?.connected
        const opponentConnected =
            sessionState?.players[
                sessionState.role === 'player1' ? 'player2' : 'player1'
            ]?.connected
        const isInLobby = sessionState?.status === 'LOBBY'
        const isWaitingForOpponent =
            isInLobby && !opponentConnected && meConnected

        if (isMobile && orientation === 'landscape') mode = 'landscape'
        else if (
            !sessionState?.players[
                sessionState.role as keyof typeof sessionState.players
            ]
        )
            mode = 'connect'
        else if (
            sessionState?.players[
                sessionState.role as keyof typeof sessionState.players
            ] &&
            isMobile &&
            !isFullscreen
        )
            mode = 'no-fullscreen'
        else if (isWaitingForOpponent) mode = 'wait-opponent'
    }

    if (errorMessage) mode = 'error'

    const { title, type, description, actions } = useGetInteractionOverlayState(
        mode,
        errorMessage,
        enterFullScreen,
    )

    return (
        mode !== 'none' && (
            <div className={`interaction-overlay ${type || 'info'}`}>
                {title && <h2>{title}</h2>}
                {description && <p>{description}</p>}
                {actions &&
                    actions.map((action, index) => (
                        <button key={index} onClick={action.onClick}>
                            {action.label}
                        </button>
                    ))}
            </div>
        )
    )
}
