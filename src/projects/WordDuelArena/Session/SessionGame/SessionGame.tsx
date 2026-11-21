/* eslint-disable standards/matching-spec -- TODO [0011] check the convention */
import { useEffect, useState } from 'react'
import { Arrays } from '@common-utils'
import { ExtraWords } from './ExtraWords'
import { GameControls } from './GameControls'
import { SolutionBoard } from './SolutionBoard'
import { SessionOverlay } from '../SessionOverlay'
import { SessionHeader } from '../SessionHeader'
import { SessionHooks } from '../Session.hooks'
import type { VoidFunction } from '@common-utils'
import './SessionGame.styles.css'

type SessionGameProps = {
    enterFullScreen: VoidFunction
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
            // eslint-disable-next-line react-hooks/set-state-in-effect -- reshuffles the tray when the level changes
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
