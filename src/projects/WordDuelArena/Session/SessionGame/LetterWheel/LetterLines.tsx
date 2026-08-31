import { LetterPosition } from './LetterWheel.types'

type LetterLinesProps = {
    touchedIds: number[]
    positions: LetterPosition[]
}

export const LetterLines = ({ positions, touchedIds }: LetterLinesProps) => {
    if (touchedIds.length < 2) return null

    return (
        <svg className="letter-lines">
            {touchedIds.slice(1).map((id, i) => {
                const prevId = touchedIds[i]
                const start = positions[prevId]
                const end = positions[id]
                if (!start || !end) return null

                return (
                    <line
                        key={i}
                        x1={start.cx}
                        y1={start.cy}
                        x2={end.cx}
                        y2={end.cy}
                    />
                )
            })}
        </svg>
    )
}
