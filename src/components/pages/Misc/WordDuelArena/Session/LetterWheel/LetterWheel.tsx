import { useRef, useState } from 'react'
import { useSession } from '../Session.context'
import { useSessionWS } from '../SessionWebSocket'
import { useLetterWheelListeners } from './LetterWheel.hooks'
import { useFullScreen } from '../../common/utils'
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
    const [positions, setPositions] = useState<LetterPosition[]>([])
    const { allowKeyboardInput } = useSession()
    const { send } = useSessionWS()
    const { enterFullScreen } = useFullScreen()

    const [touchState, setTouchState] = useState<TouchState>({
        touchedIds: [],
        touchedLetters: '',
    })

    // Keyboard handler updates letters only

    useLetterWheelListeners({
        containerRef,
        inputLetters,
        touchState,
        allowKeyboardInput,
        send,
        setPositions,
        setTouchState,
        enterFullScreen,
    })

    return (
        <div className="letter-wheel-container" ref={containerRef}>
            <WordPreview letters={touchState.touchedLetters} />
            <div className="letter-wheel">
                {positions.map((letterPosition, i) => (
                    <Letter
                        key={i}
                        letterPosition={letterPosition}
                        touchedIds={touchState.touchedIds}
                        index={i}
                    />
                ))}
                <LetterLines
                    positions={positions}
                    touchedIds={touchState.touchedIds}
                />
            </div>
        </div>
    )
}
