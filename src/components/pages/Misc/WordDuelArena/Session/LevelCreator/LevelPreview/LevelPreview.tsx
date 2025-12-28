import { MAX_WORDS_PER_LEVEL } from '../../../common/utils/Word/constants'
import { getWordGroups } from '../../../common/utils/Word/wordGroups'
import './LevelPreview.styles.css'

type LevelPreviewProps = {
    selectedWords: string[]
}

export const LevelPreview = ({ selectedWords }: LevelPreviewProps) => {
    const words = getWordGroups(selectedWords).reverse()
    const MAX_WORDS_PER_COLUMN = MAX_WORDS_PER_LEVEL / 2
    const column1 =
        words.flat().filter((_, index) => index < MAX_WORDS_PER_COLUMN) || []
    const column2 =
        words.flat().filter((_, index) => index >= MAX_WORDS_PER_COLUMN) || []

    return (
        <div className="level-preview">
            <PreviewColumn words={column1} />
            <PreviewColumn words={column2} />
        </div>
    )
}

type PreviewColumnProps = {
    words: string[]
}

const PreviewColumn = ({ words }: PreviewColumnProps) => (
    <div className="column">
        {words.flat().map((word) => (
            <div className="word" key={word}>
                {word.split('').map((char, index) => (
                    <div className="letter" key={index}>
                        {char}
                    </div>
                ))}
            </div>
        ))}
    </div>
)
