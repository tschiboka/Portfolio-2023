import { useSession } from '../Session.context'
import { InteractionModes } from './InteractionOverlya.types'
import { interactionOverlayState } from './InteractionOverlay.states'
import './InteractionOverlay.styles.css'

export const InteractionOverlay = () => {
    const { derivedState } = useSession()
    const meConnected = derivedState?.meData?.connected
    const opponentConnected = derivedState?.opponentData?.connected
    const isInLobby = derivedState?.completeSessionState?.status === 'LOBBY'
    const isWaitingForOpponent = isInLobby && !opponentConnected && meConnected

    let mode: InteractionModes = 'none'
    if (!derivedState?.meData) mode = 'connect'
    else if (isWaitingForOpponent) mode = 'wait-opponent'

    const { title, description, actions } = interactionOverlayState(mode)

    console.log('Derived State:', derivedState)
    console.log('InteractionOverlay mode:', mode)
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
