import { MAX_WORDS_PER_LEVEL } from '../../common/utils'
import { useSession } from '../Session.context'
import { PlayableLevelWord } from '../Session.types'
import { SolvedSolutionWord, UnsolvedSolutionWord } from './SolutionWord'
import './SolutionBoard.styles.css'
import { useEffect, useMemo, useRef, useState } from 'react'

export const SolutionBoard = () => {
    const { level } = useSession().sessionState || {}
    const words = level ? level.targetWords : []
    const boardRef = useRef<HTMLDivElement>(null)
    const [containerWidth, setContainerWidth] = useState(0)

    useEffect(() => {
        if (!boardRef.current) return

        const updateWidth = () => {
            if (boardRef.current) {
                setContainerWidth(boardRef.current.offsetWidth)
            }
        }

        updateWidth()
        window.addEventListener('resize', updateWidth)
        return () => window.removeEventListener('resize', updateWidth)
    }, [])

    const MAX_WORDS_PER_COLUMN = MAX_WORDS_PER_LEVEL / 2
    const column1 =
        words.flat().filter((_, index) => index < MAX_WORDS_PER_COLUMN) || []
    const column2 =
        words.flat().filter((_, index) => index >= MAX_WORDS_PER_COLUMN) || []

    const columnConfig = useMemo(() => {
        if (containerWidth === 0)
            return {
                col1: { width: 50, letterSize: 20 },
                col2: { width: 50, letterSize: 20 },
            }

        const getWordLength = (w: PlayableLevelWord) =>
            w.status === 'SOLVED' ? w.word.length : w.mask.length

        const maxCol1 = Math.max(...column1.map(getWordLength), 0)
        const maxCol2 = Math.max(...column2.map(getWordLength), 0)
        const total = maxCol1 + maxCol2
        if (total === 0)
            return {
                col1: { width: 50, letterSize: 20 },
                col2: { width: 50, letterSize: 20 },
            }

        const col1WidthPercent = (maxCol1 / total) * 100
        const col2WidthPercent = (maxCol2 / total) * 100

        const boardPadding = 10
        const gap = 5
        const columnPadding = 10
        const availableWidth = containerWidth - boardPadding - gap

        const col1PixelWidth =
            (availableWidth * col1WidthPercent) / 100 - columnPadding
        const col2PixelWidth =
            (availableWidth * col2WidthPercent) / 100 - columnPadding

        const letterMargin = 2
        const col1LetterSize =
            maxCol1 > 0
                ? Math.floor(
                      (col1PixelWidth - letterMargin * maxCol1) / maxCol1,
                  )
                : 20
        const col2LetterSize =
            maxCol2 > 0
                ? Math.floor(
                      (col2PixelWidth - letterMargin * maxCol2) / maxCol2,
                  )
                : 20

        // Use the minimum to ensure uniform letter size across both columns
        const uniformLetterSize = Math.max(
            16,
            Math.min(col1LetterSize, col2LetterSize),
        )

        return {
            col1: {
                width: col1WidthPercent,
                letterSize: uniformLetterSize,
            },
            col2: {
                width: col2WidthPercent,
                letterSize: uniformLetterSize,
            },
        }
    }, [column1, column2, containerWidth])

    if (words.length === 0) return <div className="solution-board empty"></div>

    return (
        <div className="solution-board" ref={boardRef}>
            <SolutionBoardColumn
                playableWords={column1}
                width={columnConfig.col1.width}
                letterSize={columnConfig.col1.letterSize}
            />
            <SolutionBoardColumn
                playableWords={column2}
                width={columnConfig.col2.width}
                letterSize={columnConfig.col2.letterSize}
            />
        </div>
    )
}

type SolutionBoardColumnProps = {
    playableWords: PlayableLevelWord[]
    width: number
    letterSize: number
}

const SolutionBoardColumn = ({
    playableWords = [],
    width,
    letterSize,
}: SolutionBoardColumnProps) => (
    <div
        className="column"
        style={
            {
                flexBasis: `${width}%`,
                '--letter-size': `${letterSize}px`,
            } as React.CSSProperties
        }
    >
        {playableWords.map((playableWord, index) =>
            playableWord.status === 'UNSOLVED' ? (
                <UnsolvedSolutionWord
                    key={playableWord.mask + index}
                    playableWord={playableWord}
                />
            ) : (
                <SolvedSolutionWord
                    key={playableWord.word + index}
                    playableWord={playableWord}
                />
            ),
        )}
    </div>
)
