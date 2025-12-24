import { useSession } from './Session.context'

export const WaitingMessage = () => {
    const { derivedState } = useSession()
    const meConnected = derivedState?.meData?.connected
    const opponentConnected = derivedState?.opponentData?.connected
    const isInLobby = derivedState?.completeSessionState?.status === 'LOBBY'
    const isWaitingForOpponent = isInLobby && !opponentConnected && meConnected

    return (
        <header className="waiting-message-header">
            {isWaitingForOpponent && <p>Waiting for opponent to join...</p>}
        </header>
    )
}
