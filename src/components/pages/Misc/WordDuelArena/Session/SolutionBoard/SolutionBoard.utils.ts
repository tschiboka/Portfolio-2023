import { PlayableLevelWord } from '../Session.types'

type GetColumnConfigProps = {
    columns: {
        column1: PlayableLevelWord[]
        column2: PlayableLevelWord[]
    }
    containerWidth: number
}

export const getColumnConfig = ({
    columns,
    containerWidth,
}: GetColumnConfigProps) => {
    const { column1, column2 } = columns
    if (containerWidth === 0)
        return {
            col1: { width: 50, letterSize: 20 },
            col2: { width: 50, letterSize: 20 },
        }

    const getWordLength = (w: PlayableLevelWord) =>
        w.status === 'SOLVED' ? w.word.length : w.mask.length

    console.log(
        'Calculating column config with containerWidth:',
        containerWidth,
    )
    const maxCol1 = Math.max(...column1.map(getWordLength), 0)
    const maxCol2 = Math.max(...column2.map(getWordLength), 0)
    console.log('Max col letter lengths:', { maxCol1, maxCol2 })
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

    const letterMargin = 1
    const col1LetterSize =
        maxCol1 > 0
            ? Math.floor((col1PixelWidth - letterMargin * maxCol1) / maxCol1)
            : 20
    const col2LetterSize =
        maxCol2 > 0
            ? Math.floor((col2PixelWidth - letterMargin * maxCol2) / maxCol2)
            : 20

    // Use the minimum to ensure uniform letter size across both columns
    const uniformLetterSize = Math.max(
        16,
        Math.min(col1LetterSize, col2LetterSize),
    )

    return {
        col1: { width: col1WidthPercent, letterSize: uniformLetterSize },
        col2: { width: col2WidthPercent, letterSize: uniformLetterSize },
    }
}
