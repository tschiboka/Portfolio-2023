import { useSession } from '../Session.context'

export const MomentumBar = () => {
    const { sessionState } = useSession()
    const match = sessionState?.currentMatch
    if (!match || !sessionState?.role)
        return <div className="momentum-bar"></div>

    const role = sessionState.role
    const opponentRole = role === 'player1' ? 'player2' : 'player1'

    const playersPoints = match.perPlayerStatus[role]?.points || 0
    const opponentPoints = match.perPlayerStatus[opponentRole]?.points || 0
    const totalPoints = playersPoints + opponentPoints

    const playerPercentage =
        totalPoints > 0 ? (playersPoints / totalPoints) * 100 : 50
    const opponentPercentage =
        totalPoints > 0 ? (opponentPoints / totalPoints) * 100 : 50

    return (
        <div className="momentum-bar">
            <div
                className="momentum-bar-fill player"
                style={{ width: `${playerPercentage}%` }}
            ></div>
            <div
                className="momentum-bar-fill opponent"
                style={{ width: `${opponentPercentage}%` }}
            ></div>
        </div>
    )
}
