import { MAX_WORDS_PER_LEVEL } from '../../common/utils'
import { useSession } from '../Session.context'
import { PlayableLevelWord } from '../Session.types'
import { SolvedSolutionWord, UnsolvedSolutionWord } from './SolutionWord'
import './SolutionBoard.styles.css'
import { useEffect, useMemo, useRef, useState } from 'react'
import { getColumnConfig } from './SolutionBoard.utils'

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
    }, [boardRef.current])

    const MAX_WORDS_PER_COLUMN = MAX_WORDS_PER_LEVEL / 2

    const columns = useMemo(() => {
        const column1 =
            words.flat().filter((_, index) => index < MAX_WORDS_PER_COLUMN) ||
            []
        const column2 =
            words.flat().filter((_, index) => index >= MAX_WORDS_PER_COLUMN) ||
            []
        return { column1, column2 }
    }, [words, MAX_WORDS_PER_COLUMN])

    const columnConfig = useMemo(
        () => getColumnConfig({ columns, containerWidth }),
        [columns, containerWidth],
    )

    if (words.length === 0) return <div className="solution-board empty"></div>

    return (
        <div className="solution-board" ref={boardRef}>
            <SolutionBoardColumn
                playableWords={columns.column1}
                width={columnConfig.col1.width}
                letterSize={columnConfig.col1.letterSize}
            />
            <SolutionBoardColumn
                playableWords={columns.column2}
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
    <div className="column" style={{ flexBasis: `${width}%` }}>
        {playableWords.map((playableWord, index) =>
            playableWord.status === 'UNSOLVED' ? (
                <UnsolvedSolutionWord
                    key={playableWord.mask + index}
                    playableWord={playableWord}
                    letterSize={letterSize}
                />
            ) : (
                <SolvedSolutionWord
                    key={playableWord.word + index}
                    playableWord={playableWord}
                    letterSize={letterSize}
                />
            ),
        )}
    </div>
)
