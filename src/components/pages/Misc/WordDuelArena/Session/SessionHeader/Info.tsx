import { CheckMark, Coin, Star } from '../../common/components'
import { useSession } from '../Session.context'
import { getHeaderInfo } from './SessionHeader.selectors'

export const Info = () => {
    const { sessionState } = useSession()
    if (!sessionState?.players || !sessionState.role) return null

    const headerInfo = getHeaderInfo({ sessionState })
    if (!headerInfo) return null

    const playerWords =
        headerInfo.player.targetWords + headerInfo.player.extraWords
    const opponentWords =
        headerInfo.opponent.targetWords + headerInfo.opponent.extraWords

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
                        <span>{headerInfo.player.points}</span>
                    </div>
                    <div className="player-words">{playerWords}</div>
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
                        <span>{headerInfo.opponent.points}</span>
                    </div>
                    <div className="opponent-words">{opponentWords}</div>
                </div>
            </div>
        </div>
    )
}
