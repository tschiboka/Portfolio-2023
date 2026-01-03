import { LetterWheel } from './LetterWheel/LetterWheel'
import { SolutionBoard } from './SolutionBoard/SolutionBoard'
import { InteractionOverlay } from './InteractioOverlay/InteractionOverlay'

export const SessionGame = () => {
    return (
        <div className="session-game">
            <InteractionOverlay />
            <>
                <SolutionBoard />
                <LetterWheel inputLetters="ABCDEFGH" />
            </>
        </div>
    )
}
