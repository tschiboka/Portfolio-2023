import { CheckMark, Coin, Star } from '../../common/components'
import { useSession } from '../Session.context'

export const Info = () => {
    const { sessionState } = useSession()
    if (!sessionState?.players || !sessionState.role) return null

    const { role } = sessionState
    const opponentRole = role === 'player1' ? 'player2' : 'player1'

    const playerPoints =
        sessionState.currentMatch?.perPlayerStatus[role]?.points || '-'
    const opponentPoints =
        sessionState.currentMatch?.perPlayerStatus[opponentRole]?.points || '-'

    const { level } = sessionState || {}
    const targetWords = level?.targetWords || []
    const extraWords = level?.extraWords || []

    const playerTargetWords =
        targetWords.filter(
            (word) => word.status === 'SOLVED' && word.solvedBy === role,
        ).length || '-'
    const playerExtraWords =
        extraWords.filter(
            (word) => word.status === 'SOLVED' && word.solvedBy === role,
        ).length || '-'

    const opponentTargetWords =
        targetWords.filter(
            (word) =>
                word.status === 'SOLVED' && word.solvedBy === opponentRole,
        ).length || '-'
    const opponentExtraWords =
        extraWords.filter(
            (word) =>
                word.status === 'SOLVED' && word.solvedBy === opponentRole,
        ).length || '-'

    return (
        <div className="session-player-info">
            <div className="session-header-difficulty">
                <Star />
                <Star />
                <Star />
                <Star />
                <Star isFilled={false} />
                <div></div>
            </div>
            <div className="session-header-score">
                <div className="player-score">
                    <div className="player-points">
                        <span>{playerPoints}</span>
                    </div>
                    <div className="player-words">
                        <div className="player-target-words">
                            {playerTargetWords}{' '}
                        </div>
                        <div className="player-extra-words">
                            {playerExtraWords}
                        </div>
                    </div>
                </div>
                <div className="session-header-icons">
                    <div>
                        <Coin />
                    </div>
                    <div>
                        <CheckMark />
                    </div>
                </div>
                <div className="opponent-score">
                    <div className="opponent-points">
                        <span>{opponentPoints}</span>
                    </div>
                    <div className="opponent-words">
                        <div className="opponent-target-words">
                            {opponentTargetWords}
                        </div>
                        <div className="opponent-extra-words">
                            {opponentExtraWords}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
