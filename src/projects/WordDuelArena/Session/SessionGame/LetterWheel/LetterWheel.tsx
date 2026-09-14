import { useRef, useState } from 'react'
import { SessionHooks } from '../../Session.hooks'
import { SessionWebSocketHooks } from '../../SessionWebSocket.hooks'
import { useLetterWheelListeners } from './LetterWheel.hooks'
import { Letter } from './Letter'
import { LetterLines } from './LetterLines'
import { LetterPosition, TouchState } from './LetterWheel.types'
import { WordPreview } from './WordPreview'
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

    useLetterWheelListeners({
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
