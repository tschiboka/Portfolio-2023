import { MAX_WORDS_PER_LEVEL } from '../../../common/utils'
import { isEmpty } from '@common-utils'
import { SessionHooks } from '../../Session.hooks'
import { PlayableLevelWord } from '../../Session.types'
import { SolvedSolutionWord, UnsolvedSolutionWord } from './components/SolutionWord'
import './SolutionBoard.styles.css'
import { useEffect, useMemo, useRef, useState } from 'react'
import { getColumnConfig } from './SolutionBoard.utils'

const MAX_WORDS_PER_COLUMN = MAX_WORDS_PER_LEVEL / 2

export const SolutionBoard = () => {
    const { level } = SessionHooks.useContext().sessionState || {}
    const words = level ? level.targetWords : []
    const boardRef = useRef<HTMLDivElement>(null)
    const [containerWidth, setContainerWidth] = useState(0)
    const [containerHeight, setContainerHeight] = useState(0)

    useEffect(() => {
        if (!boardRef.current) return

        const updateSize = () => {
            if (boardRef.current) {
                setContainerWidth(boardRef.current.offsetWidth)
                setContainerHeight(boardRef.current.offsetHeight)
            }
        }

        updateSize()
        window.addEventListener('resize', updateSize)
        return () => window.removeEventListener('resize', updateSize)
    }, [])

    const flatWords = words.flat()
    // eslint-disable-next-line react-hooks/exhaustive-deps -- columns is derived from words on every render; the container sizes are the real inputs
    const columns = {
        column1: flatWords.filter((_, index) => index < MAX_WORDS_PER_COLUMN),
        column2: flatWords.filter((_, index) => index >= MAX_WORDS_PER_COLUMN),
    }

    const columnConfig = useMemo(
        () => getColumnConfig({ columns, containerWidth, containerHeight }),
        [columns, containerWidth, containerHeight],
    )

    if (isEmpty(words)) return <div className="solution-board empty"></div>

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
