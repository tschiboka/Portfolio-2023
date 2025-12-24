import { useMemo } from 'react'
import Player1 from '../../../../../assets/images/projects/wordduelarena/player_1.jpg'
import Player2 from '../../../../../assets/images/projects/wordduelarena/player_2.jpg'
import { useSession } from './Session.context'

type SessionPlayerInfoProps = {
    playerNumber: 1 | 2
}

export const SessionPlayerInfo = ({ playerNumber }: SessionPlayerInfoProps) => {
    const { derivedState } = useSession()
    const playerData = useMemo(
        () =>
            playerNumber === 1
                ? derivedState?.meData
                : derivedState?.opponentData,
        [derivedState, playerNumber],
    )
    const playerClass = playerNumber === 1 ? ' you' : ' opponent'
    const activeClass = playerData?.connected ? ' active' : ' inactive'

    return (
        <div className={`session-player-info${playerClass}${activeClass}`}>
            <img
                className="avatar"
                src={playerNumber === 1 ? Player1 : Player2}
                alt={`Player ${playerNumber}`}
            />
            <span>{playerNumber === 1 ? 'You' : 'Opponent'}</span>
        </div>
    )
}
