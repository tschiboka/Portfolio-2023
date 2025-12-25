import BoyAvatar from '../../../../../assets/images/projects/wordduelarena/player_1.jpg'
import GirlAvatar from '../../../../../assets/images/projects/wordduelarena/player_2.jpg'
import { useSession } from './Session.context'

type PlayerSlot = 'me' | 'opponent'

type SessionPlayerInfoProps = {
    slot: PlayerSlot
}

export const SessionPlayerInfo = ({ slot }: SessionPlayerInfoProps) => {
    const { derivedState } = useSession()
    const { me, meData, opponentData } = derivedState ?? {}
    const playerData = slot === 'me' ? meData : opponentData
    const role = slot === 'me' ? me : derivedState?.opponent
    const activeClass = playerData?.connected ? ' active' : ' inactive'

    return (
        <div className={`session-player-info${' ' + slot}${activeClass}`}>
            <img
                className="avatar"
                src={role === 'player1' ? BoyAvatar : GirlAvatar}
                alt={`Player ${role}`}
            />
            <span>{role === 'player1' ? 'You' : 'Opponent'}</span>
        </div>
    )
}
