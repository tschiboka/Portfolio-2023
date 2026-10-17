import { SessionHeaderSelectors } from '../SessionHeader.selectors'
import { SessionHooks } from '../../Session.hooks'
import { LastWordAttempt } from '../../Session.types'

type AttemptWordProps = {
    attempt?: LastWordAttempt
}

export const AttemptWord = ({ attempt }: AttemptWordProps) => {
    const { sessionState } = SessionHooks.useContext()
    if (!sessionState?.role) return null

    return (
        attempt &&
        attempt.word.split('').map((char, index) => (
            <div
                className={SessionHeaderSelectors.getCharClass({
                    attempt,
                    sessionState,
                })}
                key={index}
            >
                {char}
            </div>
        ))
    )
}
