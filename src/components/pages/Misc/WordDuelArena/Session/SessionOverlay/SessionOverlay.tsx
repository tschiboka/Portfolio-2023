import { useSession } from '../Session.context'
import { InteractionModes } from './SessionOverlay.types'
import { useGetInteractionOverlayState } from './SessionOverlay.hooks'
import './SessionOverlay.styles.css'
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
    let message = errorMessage
    let mode: InteractionModes = 'none'

    if (!sessionState) {
        mode = 'none'
    } else if (!sessionState?.players || !sessionState.role) {
        mode = 'connect'
    } else {
        const player = sessionState.players[sessionState.role]
        const meConnected = player?.connected
        const opponentConnected =
            sessionState.players[
                sessionState.role === 'player1' ? 'player2' : 'player1'
            ]?.connected
        const isInLobby = sessionState.status === 'LOBBY'
        const isEnded = sessionState.currentMatch?.status === 'FINISHED'
        const isWaitingForOpponent =
            isInLobby && !opponentConnected && meConnected

        if (isMobile && orientation === 'landscape') mode = 'landscape'
        else if (!sessionState.players[sessionState.role]) mode = 'connect'
        else if (
            sessionState.players[sessionState.role] &&
            isMobile &&
            !isFullscreen
        )
            mode = 'no-fullscreen'
        else if (isWaitingForOpponent) mode = 'wait-opponent'
        if (isEnded) {
            const playersPoints = sessionState?.currentMatch?.perPlayerStatus
            const player = playersPoints?.[sessionState.role]?.points || 0
            const opponent =
                playersPoints?.[
                    sessionState.role === 'player1' ? 'player2' : 'player1'
                ]?.points || 0

            if (player === opponent) message = "It's a draw!"
            else if (player > opponent) message = 'You won! Congratulations!'
            else message = 'You lost! Better luck next time!'

            message += ` Your points: ${player}, Opponent points: ${opponent}`
            mode = 'ended'
        }
    }

    if (errorMessage) mode = 'error'
    const overlayProps = { mode, message, enterFullScreen }
    const { title, type, description, actions } =
        useGetInteractionOverlayState(overlayProps)

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
