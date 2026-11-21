/* eslint-disable standards/matching-spec -- TODO [0011] check the convention */
import { useRef, useState } from 'react'
import { Letter, LetterLines, WordPreview } from './components'
import { LetterPosition, TouchState } from './LetterWheel.types'
import { LetterWheelHooks } from './LetterWheel.hooks'
import { SessionHooks } from '../../Session.hooks'
import { SessionWebSocketHooks } from '../../SessionWebSocket.hooks'
import './LetterWheel.styles.css'

type LetterWheelProps = {
    inputLetters: string
}

export const LetterWheel = ({ inputLetters }: LetterWheelProps) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const wheelRef = useRef<HTMLDivElement>(null)
    const [positions, setPositions] = useState<LetterPosition[]>([])
    const { allowKeyboardInput } = SessionHooks.useContext()
    const { send } = SessionWebSocketHooks.useContext()

    const [touchState, setTouchState] = useState<TouchState>({
        touchedIds: [],
        touchedLetters: '',
    })

    LetterWheelHooks.useListeners({
        containerRef,
        wheelRef,
        inputLetters,
        touchState,
        allowKeyboardInput,
        send,
        setPositions,
        setTouchState,
    })

    return (
        <div className="letter-wheel-container" ref={containerRef}>
            <WordPreview letters={touchState.touchedLetters} />
            <div className="letter-wheel" ref={wheelRef}>
                {positions.map((letterPosition, i) => (
                    <Letter
                        key={i}
                        letterPosition={letterPosition}
                        touchedIds={touchState.touchedIds}
                        index={i}
                    />
                ))}
                <LetterLines positions={positions} touchedIds={touchState.touchedIds} />
            </div>
        </div>
    )
}
