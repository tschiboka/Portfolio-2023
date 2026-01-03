import { LetterWheel } from './LetterWheel/LetterWheel'
import { useSession } from './Session.context'
import { SolutionBoard } from './SolutionBoard/SolutionBoard'
import { WaitingMessage } from './WaitingMessage'

export const SessionGame = () => {
    const { derivedState } = useSession()
    const meConnected = derivedState?.meData?.connected
    const opponentConnected = derivedState?.opponentData?.connected
    const isInLobby = derivedState?.completeSessionState?.status === 'LOBBY'
    const isWaitingForOpponent = isInLobby && !opponentConnected && meConnected

    return (
        <div className="session-game">
            {isWaitingForOpponent ? (
                <WaitingMessage />
            ) : (
                <>
                    <SolutionBoard />
                    <LetterWheel inputLetters="ABCDEFGH" />
                </>
            )}
        </div>
    )
}
