import { LetterWheel } from './LetterWheel/LetterWheel'
import { SolutionBoard } from './SolutionBoard/SolutionBoard'
import { InteractionOverlay } from './InteractioOverlay/InteractionOverlay'
import { useFullScreen } from '../common/utils'
import { SessionHeader } from './SessionHeader'

export const SessionGame = () => {
    const { ref, enterFullScreen } = useFullScreen<HTMLDivElement>()

    return (
        <div className="session-game" ref={ref}>
            <InteractionOverlay enterFullScreen={enterFullScreen} />
            <>
                <SessionHeader />
                <SolutionBoard />
                <LetterWheel inputLetters="ABCDEFGH" />
            </>
        </div>
    )
}
