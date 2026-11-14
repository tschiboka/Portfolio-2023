import BoyAvatar from '@projects/assets/wordduelarena/player_1.jpg'
import GirlAvatar from '@projects/assets/wordduelarena/player_2.jpg'
import { SessionHooks } from '../../Session.hooks'
import type { PlayerSlot } from './Avatar.types'

type AvatarProps = {
    slot: PlayerSlot
}

export const Avatar = ({ slot }: AvatarProps) => {
    const { sessionState } = SessionHooks.useContext()
    if (!sessionState?.players || !sessionState.role) return null

    const { role, players } = sessionState
    const playerRole = slot === 'me' ? role : role === 'player1' ? 'player2' : 'player1'
    const player = players[playerRole]
    const activeClass = player?.connected ? 'active' : 'inactive'
    const avatar = playerRole === 'player1' ? BoyAvatar : GirlAvatar

    return (
        <div className={`session-player-avatar-container ${slot} ${activeClass}`}>
            <img className="avatar" src={avatar} alt={`Player ${role}`} />
        </div>
    )
}
