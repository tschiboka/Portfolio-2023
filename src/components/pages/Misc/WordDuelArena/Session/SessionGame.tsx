import { LetterWheel } from './LetterWheel/LetterWheel'
import { WaitingMessage } from './WaitingMessage'

export const SessionGame = () => (
    <div className="session-game">
        <WaitingMessage />
        <LetterWheel />
    </div>
)
