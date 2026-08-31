import { MAX_WORDS_PER_LEVEL } from '../../common/utils/Word/constants'
import './WordOptionList.styles.css'
import {
    getWordGroups,
    getWordLengthGroups,
} from '../../common/utils/Word/wordGroups'
import { LevelWord } from '../../common/utils'

type WordOptionListProps = {
    possibleWords: LevelWord[]
    selectedWords: LevelWord[]
    setSelectedWords: (words: LevelWord[]) => void
}

export const WordOptionList = ({
    possibleWords,
    selectedWords,
    setSelectedWords,
}: WordOptionListProps) => {
    const wordGroupsByLength = getWordLengthGroups()
    const wordGroups = getWordGroups(possibleWords)
    return (
        <div className="word-option-list">
            {wordGroups.map((words, index) => (
                <ul key={wordGroupsByLength[index]}>
                    <p>{wordGroupsByLength[index]} Letter Words</p>
                    {words
                        .sort((a, b) => a.word.localeCompare(b.word))
                        .map((word) => (
                            <WordOption
                                key={word.word}
                                word={word}
                                hasWord={selectedWords.some(
                                    (sw) => sw.word === word.word,
                                )}
                                selectedWords={selectedWords}
                                setSelectedWords={setSelectedWords}
                            />
                        ))}
                </ul>
            ))}
        </div>
    )
}

type WordOptionProps = {
    word: LevelWord
    hasWord: boolean
    selectedWords: LevelWord[]
    setSelectedWords: (words: LevelWord[]) => void
}

const WordOption = ({
    word,
    hasWord,
    selectedWords,
    setSelectedWords,
}: WordOptionProps) => {
    const addWord = () =>
        setSelectedWords(
            [...selectedWords, word].sort((a, b) =>
                a.word.length !== b.word.length
                    ? a.word.length - b.word.length
                    : a.word.localeCompare(b.word),
            ),
        )

    const removeWord = () =>
        setSelectedWords(selectedWords.filter((w) => w.word !== word.word))

    const hasMaxWords = selectedWords.length >= MAX_WORDS_PER_LEVEL
    const canAdd = !hasWord && !hasMaxWords
    const canRemove = hasWord

    const toggleWord = () => {
        if (canRemove) removeWord()
        else if (canAdd) addWord()
    }

    return (
        <li className="word-option" onClick={toggleWord}>
            <div>
                <span>
                    <span className="word">{word.word} </span>
                    <span className="frequency">[{word.frequency}]</span>
                </span>
                <div>
                    <button
                        className="add-word"
                        disabled={!canAdd}
                        onClick={addWord}
                    >
                        {'\u2713'}
                    </button>
                    <button
                        className="remove-word"
                        disabled={!canRemove}
                        onClick={removeWord}
                    >
                        {'\u00D7'}
                    </button>
                </div>
            </div>
        </li>
    )
}
