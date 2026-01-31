import BoyAvatar from '../../../../../assets/images/projects/wordduelarena/player_1.jpg'
import GirlAvatar from '../../../../../assets/images/projects/wordduelarena/player_2.jpg'
import { useSession } from './Session.context'

type PlayerSlot = 'me' | 'opponent'

type SessionPlayerInfoProps = {
    slot: PlayerSlot
}

export const SessionPlayerInfo = ({ slot }: SessionPlayerInfoProps) => {
    const { sessionState } = useSession()
    if (!sessionState?.players || !sessionState.role) return null

    const { role, players } = sessionState
    const playerRole =
        slot === 'me' ? role : role === 'player1' ? 'player2' : 'player1'
    const player = players[playerRole]
    const activeClass = player?.connected ? ' active' : ' inactive'
    const playerLabel = slot === 'me' ? 'You' : 'Opponent'
    const avatar = playerRole === 'player1' ? BoyAvatar : GirlAvatar
    const points =
        sessionState.currentMatch?.perPlayerStatus[playerRole]?.points || 0

    return (
        <div
            className={`session-player-info-container ${slot}${activeClass} ${slot}`}
        >
            <img className="avatar" src={avatar} alt={`Player ${role}`} />
            <div className="session-player-info-details">
                <div className="player-label">{playerLabel}</div>
                <div className="player-points">{points} pts</div>
            </div>
        </div>
    )
}
