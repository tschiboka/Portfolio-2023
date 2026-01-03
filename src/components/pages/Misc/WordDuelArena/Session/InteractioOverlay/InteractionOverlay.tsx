import { useSession } from '../Session.context'
import { InteractionModes } from './InteractionOverlya.types'
import { useGetInteractionOverlayState } from './InteractionOverlay.hooks'
import './InteractionOverlay.styles.css'
import { useOrientation } from '../../common/utils'

export const InteractionOverlay = ({
    enterFullScreen,
}: {
    enterFullScreen: () => void
}) => {
    const { orientation, isMobile } = useOrientation()
    const { derivedState } = useSession()
    const meConnected = derivedState?.meData?.connected
    const opponentConnected = derivedState?.opponentData?.connected
    const isInLobby = derivedState?.completeSessionState?.status === 'LOBBY'
    const isWaitingForOpponent = isInLobby && !opponentConnected && meConnected

    console.log('InteractionOverlay Debug:', {
        meConnected,
        opponentConnected,
        isInLobby,
        isWaitingForOpponent,
        mode: !derivedState?.meData
            ? 'connect'
            : isWaitingForOpponent
            ? 'wait-opponent'
            : 'none',
    })

    let mode: InteractionModes = 'none'
    if (isMobile && orientation === 'landscape') mode = 'landscape'
    else if (!derivedState?.meData) mode = 'connect'
    else if (isWaitingForOpponent) mode = 'wait-opponent'

    const { title, description, actions } = useGetInteractionOverlayState(
        mode,
        enterFullScreen,
    )

    return (
        mode !== 'none' && (
            <div className="interaction-overlay">
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
