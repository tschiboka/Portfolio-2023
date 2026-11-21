/* eslint-disable standards/matching-spec -- TODO [0011] check the convention */
import { LevelWord, WordConstants, WordUtils } from '@projects/WordDuelArena/common'
import './LevelPreview.styles.css'

type LevelPreviewProps = {
    selectedWords: LevelWord[]
}

export const LevelPreview = ({ selectedWords }: LevelPreviewProps) => {
    const words = WordUtils.getWordGroups(selectedWords).reverse()
    const MAX_WORDS_PER_COLUMN = WordConstants.maxWordsPerLevel / 2
    const column1 = words.flat().filter((_, index) => index < MAX_WORDS_PER_COLUMN) || []
    const column2 = words.flat().filter((_, index) => index >= MAX_WORDS_PER_COLUMN) || []

    return (
        <div className="level-preview">
            <PreviewColumn words={column1} />
            <PreviewColumn words={column2} />
        </div>
    )
}

type PreviewColumnProps = {
    words: LevelWord[]
}

const PreviewColumn = ({ words }: PreviewColumnProps) => (
    <div className="column">
        {words.flat().map((word) => (
            <div className="word" key={word.word}>
                {word.word.split('').map((char, index) => (
                    <div className="letter" key={index}>
                        {char}
                    </div>
                ))}
            </div>
        ))}
    </div>
)
