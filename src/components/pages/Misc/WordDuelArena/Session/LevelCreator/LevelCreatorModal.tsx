import { useEffect, useState } from 'react'
import { WordOptionList } from './WordOptionList/WordOptionList'
import { LevelPreview } from './LevelPreview/LevelPreview'
import {
    FrequencyType,
    Level,
    LevelWord,
    loadFrequencies,
    MAX_WORDS_PER_LEVEL,
    MIN_WORDS_PER_LEVEL,
} from '../../common/utils'
import { getPossibleWords } from '../../common/utils/Word/getPossibleWords'
import { useGetLevel, usePostLevel } from './LevelCreator.queries'
import LoadingIndicator from '../../../../../sharedComponents/LoadingIndicator/LoadingIndicator'
import { useQueryClient } from '@tanstack/react-query'

type LevelCreatorModalProps = {
    levelName: string
    setModalOpen: (open: boolean) => void
}

export const LevelCreatorModal = ({
    levelName,
    setModalOpen,
}: LevelCreatorModalProps) => {
    const queryClient = useQueryClient()
    const {
        mutate: postLevel,
        isPending,
        error: postError,
    } = usePostLevel({
        onSuccess: () => {
            setModalOpen(false)
            queryClient.invalidateQueries({ queryKey: ['level-names'] })
        },
    })

    const {
        data: levelData,
        isLoading,
        error: getError,
    } = useGetLevel(levelName)

    const [optionsOpen, setOptionsOpen] = useState(false)
    const [selectedWords, setSelectedWords] = useState<LevelWord[]>([])
    const [frequencies, setFrequencies] = useState<FrequencyType>()
    const [possibleWords, setPossibleWords] = useState<LevelWord[]>([])
    const [validationError, setValidationError] = useState<string>('')

    useEffect(() => {
        if (!frequencies) loadFrequencies().then(setFrequencies)
        if (frequencies && possibleWords.length === 0) {
            getPossibleWords(levelName).then((possibleWords) => {
                const newWordSet = possibleWords.map((word) => ({
                    word,
                    frequency: frequencies
                        ? frequencies[word.toUpperCase()] || 0
                        : 0,
                }))
                setPossibleWords(newWordSet)
            })
        }
        if (levelData && frequencies) {
            const selectedWordSet = levelData.data.words.map((word) => ({
                word,
                frequency: frequencies[word.toUpperCase()] || 0,
            }))
            setSelectedWords(selectedWordSet)
        }
    }, [frequencies, possibleWords, levelData])

    useEffect(() => {
        if (postError) setValidationError(postError.message)
    }, [postError, getError])

    const averageFrequency = () => {
        if (selectedWords.length === 0) return 0
        const total = selectedWords.reduce(
            (sum, word) => sum + word.frequency,
            0,
        )
        return total / selectedWords.length
    }

    const avgDifficulty = () => {
        const avgFreq = averageFrequency() // 0–100%
        const rawDifficulty = (100 - avgFreq) / 10 // e.g., 77 / 10 = 7.7
        return Math.round(Math.max(1, Math.min(10, rawDifficulty)))
    }

    const onSave = () => {
        if (
            selectedWords.length < MIN_WORDS_PER_LEVEL ||
            selectedWords.length > MAX_WORDS_PER_LEVEL
        ) {
            return setValidationError(
                `Please select between ${MIN_WORDS_PER_LEVEL} and ${MAX_WORDS_PER_LEVEL} words. Currently selected: ${selectedWords.length}`,
            )
        } else setValidationError('')

        const level: Level = {
            name: levelName,
            words: selectedWords.map((word) => word.word),
            allowedWords: possibleWords,
            difficulty: avgDifficulty(),
            tags: [],
        }
        postLevel(level)
    }

    return (
        <div className="level-creator-modal">
            <h1>
                Level: {levelName} [{averageFrequency().toFixed(0)}%|
                {avgDifficulty()}]
            </h1>
            <LevelPreview selectedWords={selectedWords} />
            <div className="wheel-container">
                {validationError && (
                    <p className="error-message">{validationError}</p>
                )}
                <LoadingIndicator show={isPending || isLoading} />
                {!isPending && !validationError && (
                    <div className="wheel"></div>
                )}
            </div>
            <footer>
                <button onClick={() => setOptionsOpen(!optionsOpen)}>
                    {optionsOpen ? 'Hide' : 'Select'}
                </button>
                <button disabled={optionsOpen} onClick={onSave}>
                    Save
                </button>
                <button
                    onClick={() => setModalOpen(false)}
                    disabled={optionsOpen}
                >
                    Close
                </button>
            </footer>
            {optionsOpen && (
                <WordOptionList
                    possibleWords={possibleWords}
                    selectedWords={selectedWords}
                    setSelectedWords={setSelectedWords}
                />
            )}
        </div>
    )
}
