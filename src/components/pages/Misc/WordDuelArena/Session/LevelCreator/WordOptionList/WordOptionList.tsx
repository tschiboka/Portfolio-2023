import { MAX_WORDS_PER_LEVEL } from '../../../common/utils/Word/constants'
import { getPossibleWords } from '../../../common/utils/Word/getPossibleWords'
import './WordOptionList.styles.css'
import {
    getWordGroups,
    getWordLengthGroups,
} from '../../../common/utils/Word/wordGroups'
import {
    FrequencyType,
    loadFrequencies,
} from '../../../common/utils/Word/getWordFrequency'
import { useEffect, useState } from 'react'

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
    const [possibleWords, setPossibleWords] = useState<string[]>([])

    useEffect(() => {
        let cancelled = false

        getPossibleWords(anagram).then((words) => {
            if (!cancelled) setPossibleWords(words)
        })

        return () => {
            cancelled = true
        }
    }, [anagram])

    const wordGroupsByLength = getWordLengthGroups()
    const wordGroups = getWordGroups(possibleWords)

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
    const [frequencies, setFrequencies] = useState<FrequencyType>()
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

    useEffect(() => {
        loadFrequencies().then(setFrequencies)
    }, [])

    const frequency = frequencies ? frequencies[word.toUpperCase()] ?? 0 : 0

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
