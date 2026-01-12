import { LetterWheel } from './LetterWheel/LetterWheel'
import { SolutionBoard } from './SolutionBoard/SolutionBoard'
import { InteractionOverlay } from './InteractioOverlay/InteractionOverlay'
import { shuffleArray } from '../common/utils'
import { SessionHeader } from './SessionHeader'
import { useSession } from './Session.context'
import { useEffect, useState } from 'react'

type SessionGameProps = {
    enterFullScreen: () => void
    isFullscreen: boolean
}

export const SessionGame = ({
    enterFullScreen,
    isFullscreen,
}: SessionGameProps) => {
    const { level } = useSession().sessionState || {}
    const levelName = level?.name || ''
    const [inputLetters, setInputLetters] = useState<string>('')

    useEffect(() => {
        if (level) {
            const shuffledLetters = shuffleArray(level.name.split('')).join('')
            setInputLetters(shuffledLetters)
        }
    }, [levelName])

    return (
        <div className="session-game">
            <InteractionOverlay
                enterFullScreen={enterFullScreen}
                isFullscreen={isFullscreen}
            />
            <>
                <SessionHeader />
                <SolutionBoard />
                <LetterWheel inputLetters={inputLetters} />
            </>
        </div>
    )
}
