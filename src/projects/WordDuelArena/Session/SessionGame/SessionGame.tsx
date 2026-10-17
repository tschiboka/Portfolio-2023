import { useEffect, useState } from 'react'
import { Arrays } from '@common-utils'
import { ExtraWords } from './ExtraWords/ExtraWords'
import { GameControls } from './GameControls/GameControls'
import { SolutionBoard } from './SolutionBoard/SolutionBoard'
import { SessionOverlay } from '../SessionOverlay/SessionOverlay'
import { SessionHeader } from '../SessionHeader/SessionHeader'
import { SessionHooks } from '../Session.hooks'
import './SessionGame.styles.css'

type SessionGameProps = {
    enterFullScreen: () => void
    isFullscreen: boolean
}

export const SessionGame = ({ enterFullScreen, isFullscreen }: SessionGameProps) => {
    const { level } = SessionHooks.useContext().sessionState || {}
    const levelName = level?.name || ''
    const [inputLetters, setInputLetters] = useState<string>('')
    const [extraWordsOpen, setExtraWordsOpen] = useState<boolean>(false)

    useEffect(() => {
        if (levelName) {
            const shuffledLetters = Arrays.shuffleArray(levelName.split('')).join('')
            setInputLetters(shuffledLetters)
        }
    }, [levelName])

    return (
        <div className="session-game">
            <SessionOverlay enterFullScreen={enterFullScreen} isFullscreen={isFullscreen} />
            <>
                <SessionHeader />
                <SolutionBoard />
                <GameControls
                    inputLetters={inputLetters}
                    setInputLetters={setInputLetters}
                    setExtraWordsOpen={setExtraWordsOpen}
                />
            </>
            <ExtraWords isOpen={extraWordsOpen} setExtraWordsOpen={setExtraWordsOpen} />
        </div>
    )
}
