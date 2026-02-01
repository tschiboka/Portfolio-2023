import { LetterPosition } from './LetterWheel.types'

type LetterProps = {
    letterPosition: LetterPosition
    touchedIds: number[]
    index: number
}

export const Letter = ({ letterPosition, touchedIds, index }: LetterProps) => {
    const { letter, transform } = letterPosition
    const isHighlighted = touchedIds.includes(index)

    return (
        <div
            data-letter={letter}
            data-letter-id={index}
            className={`letter ${isHighlighted ? 'highlighted' : ''}`}
            style={{ transform }}
        >
            {letter}
        </div>
    )
}
