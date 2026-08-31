import { PlayableLevelWord } from '../../Session.types'

type GetColumnConfigProps = {
    columns: {
        column1: PlayableLevelWord[]
        column2: PlayableLevelWord[]
    }
    containerWidth: number
    containerHeight: number
}

export const getColumnConfig = ({
    columns,
    containerWidth,
    containerHeight,
}: GetColumnConfigProps) => {
    const { column1, column2 } = columns
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
    const gap = 10
    const columnPadding = 10
    const availableWidth = containerWidth - boardPadding - gap
    const col1PixelWidth = (availableWidth * col1WidthPercent) / 100 - columnPadding
    const col2PixelWidth = (availableWidth * col2WidthPercent) / 100 - columnPadding

    const letterMargin = 2 // margin: 0 1px = 1px each side = 2px total per letter
    const col1LetterSize =
        maxCol1 > 0 ? Math.floor((col1PixelWidth - letterMargin * maxCol1) / maxCol1) : 20
    const col2LetterSize =
        maxCol2 > 0 ? Math.floor((col2PixelWidth - letterMargin * maxCol2) / maxCol2) : 20
    const horizontalLetterSize = Math.min(col1LetterSize, col2LetterSize)

    // Also constrain by vertical space: each row is (letterSize + 6px) from padding/margin
    const numRows = Math.max(column1.length, column2.length)
    const boardVerticalPadding = 10
    const rowOverhead = 6 // padding: 2px 0 + margin: 1px 0 = 4px + 2px
    const verticalLetterSize =
        numRows > 0
            ? Math.floor((containerHeight - boardVerticalPadding) / numRows - rowOverhead)
            : horizontalLetterSize

    const uniformLetterSize = Math.min(horizontalLetterSize, verticalLetterSize)

    return {
        col1: { width: col1WidthPercent, letterSize: uniformLetterSize },
        col2: { width: col2WidthPercent, letterSize: uniformLetterSize },
    }
}
