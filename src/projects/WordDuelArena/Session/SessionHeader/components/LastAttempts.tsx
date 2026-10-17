import { AttemptWord } from './AttemptWord'
import { SessionHeaderSelectors } from '../SessionHeader.selectors'
import { SessionHooks } from '../../Session.hooks'

export const LastAttempts = () => {
    const { sessionState } = SessionHooks.useContext()
    if (!sessionState?.role) return null

    const lastAttempt = SessionHeaderSelectors.getLastAttempt(sessionState)

    return (
        <div className="last-attempt">
            <div className="player-last-attempt">
                <AttemptWord attempt={lastAttempt.player} />
            </div>
            <div className="opponent-last-attempt">
                <AttemptWord attempt={lastAttempt.opponent} />
            </div>
        </div>
    )
}
