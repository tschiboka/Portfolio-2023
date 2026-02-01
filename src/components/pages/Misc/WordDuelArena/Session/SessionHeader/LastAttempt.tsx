import { useSession } from '../Session.context'

export const LastAttempt = () => {
    const { sessionState } = useSession()
    if (!sessionState?.role) return null

    const { role } = sessionState
    const opponentRole = role === 'player1' ? 'player2' : 'player1'

    const playerLastAttempt =
        sessionState.currentMatch?.perPlayerStatus[role]?.lastWordAttempt
    const opponentLastAttempt =
        sessionState.currentMatch?.perPlayerStatus[opponentRole]
            ?.lastWordAttempt

    const getCharClass = (attempt: typeof playerLastAttempt) => {
        if (!attempt) return 'last-attempt-char'
        if (attempt.isTarget) return 'last-attempt-char target'
        if (attempt.isExtra) return 'last-attempt-char extra'

        // Check if the word was already found by someone
        const { level } = sessionState
        const targetWords = level?.targetWords || []
        const extraWords = level?.extraWords || []

        const foundInTarget = targetWords.find(
            (w) => w.status === 'SOLVED' && w.word === attempt.word,
        )
        const foundInExtra = extraWords.find(
            (w) => w.status === 'SOLVED' && w.word === attempt.word,
        )

        if (foundInTarget || foundInExtra) return 'last-attempt-char found'

        return 'last-attempt-char invalid'
    }

    return (
        <div className="last-attempt">
            <div className="player-last-attempt" key={playerLastAttempt?.word}>
                {playerLastAttempt?.word.split('').map((char, index) => (
                    <div
                        className={getCharClass(playerLastAttempt)}
                        key={index}
                    >
                        {char}
                    </div>
                )) || ''}
            </div>
            <div
                className="opponent-last-attempt"
                key={opponentLastAttempt?.word}
            >
                {opponentLastAttempt?.word.split('').map((char, index) => (
                    <div
                        className={getCharClass(opponentLastAttempt)}
                        key={index}
                    >
                        {char}
                    </div>
                )) || ''}
            </div>
        </div>
    )
}
