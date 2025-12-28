import { MAX_WORDS_PER_LEVEL } from '../../../common/utils/Word/constants'
import { getPossibleWords } from '../../../common/utils/Word/getPossibleWords'
import './WordOptionList.styles.css'
import {
    getWordGroups,
    getWordLengthGroups,
} from '../../../common/utils/Word/wordGroups'
import { getWordFrequency } from '../../../common/utils/Word/getWordFrequency'

type WordOptionListProps = {
    anagram: string
    selectedWords: string[]
    setSelectedWords: (words: string[]) => void
}

export const WordOptionList = ({
    anagram,
    selectedWords,
    setSelectedWords,
}: WordOptionListProps) => {
    const possibleWords = getPossibleWords(anagram)
    const wordGroupsByLength = getWordLengthGroups()
    const wordGroups = getWordGroups(possibleWords)
    console.log({ possibleWords })

    return (
        <div className="word-option-list">
            {wordGroups.map((words, index) => (
                <ul key={wordGroupsByLength[index]}>
                    <p>{wordGroupsByLength[index]} Letter Words</p>
                    {words.map((word) => (
                        <WordOption
                            key={word}
                            word={word}
                            hasWord={selectedWords.includes(word)}
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
    word: string
    hasWord: boolean
    selectedWords: string[]
    setSelectedWords: (words: string[]) => void
}

const WordOption = ({
    word,
    hasWord,
    selectedWords,
    setSelectedWords,
}: WordOptionProps) => {
    const addWord = () => setSelectedWords([...selectedWords, word])
    const removeWord = () =>
        setSelectedWords(selectedWords.filter((w) => w !== word))

    const hasMaxWords = selectedWords.length >= MAX_WORDS_PER_LEVEL
    const canAdd = !hasWord && !hasMaxWords
    const canRemove = hasWord

    const toggleWord = () => {
        if (canRemove) removeWord()
        else if (canAdd) addWord()
    }

    const frequency = getWordFrequency(word)

    return (
        <li className="word-option" onClick={toggleWord}>
            <div>
                <span>
                    <span className="word">{word} </span>
                    <span className="frequency">[{frequency}]</span>
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
