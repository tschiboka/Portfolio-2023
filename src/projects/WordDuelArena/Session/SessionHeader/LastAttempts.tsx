import { SessionHooks } from '../Session.hooks'
import { AttemptWord } from './AttemptWord'
import { getLastAttempt } from './SessionHeader.selectors'

export const LastAttempts = () => {
    const { sessionState } = SessionHooks.useContext()
    if (!sessionState?.role) return null

    const lastAttempt = getLastAttempt(sessionState)

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
