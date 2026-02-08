import { useSession } from '../Session.context'
import { getHeaderInfo } from './SessionHeader.selectors'

export const MomentumBar = () => {
    const { sessionState } = useSession()
    if (!sessionState) return null

    const headerInfo = getHeaderInfo({ sessionState })
    const playerPercentage = headerInfo?.player.percentage || 50
    const opponentPercentage = headerInfo?.opponent.percentage || 50

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
