import { useEffect, useState } from 'react'
import { WordOptionList } from './WordOptionList/WordOptionList'
import { LevelPreview } from './LevelPreview/LevelPreview'
import { Level, LevelWord, mergeApiStatuses } from '../common/utils'
import { transformAnagramMap } from '../common/utils/Word/getPossibleWords'
import {
    useGetAnagramMap,
    useGetLevel,
    useGetWordFrequencies,
    usePostLevel,
} from './LevelCreator.queries'
import LoadingIndicator from '../../../../sharedComponents/LoadingIndicator/LoadingIndicator'
import { useQueryClient } from '@tanstack/react-query'
import { FrequencyType } from '../common/utils/Types/Words'
import { levelSchema } from './LevelCreator.schema'

type LevelCreatorModalProps = {
    levelName: string
    setModalOpen: (open: boolean) => void
}

export const LevelCreatorModal = ({
    levelName,
    setModalOpen,
}: LevelCreatorModalProps) => {
    const queryClient = useQueryClient()

    const { data: levelData, ...levelDataResponse } = useGetLevel(levelName)
    const { data: anagramMap, ...anagramMapResponse } = useGetAnagramMap()
    const { data: wordFrequencies, ...wordFrequenciesResponse } =
        useGetWordFrequencies()
    const { mutate: postLevel, ...postLevelResponse } = usePostLevel({
        onSuccess: () => {
            setModalOpen(false)
            queryClient.invalidateQueries({ queryKey: ['level-names'] })
            queryClient.invalidateQueries({ queryKey: ['level' + levelName] })
        },
    })

    const { isLoading, isPending, error } = mergeApiStatuses([
        levelDataResponse,
        anagramMapResponse,
        wordFrequenciesResponse,
        postLevelResponse,
    ])

    const [optionsOpen, setOptionsOpen] = useState(false)
    const [selectedWords, setSelectedWords] = useState<LevelWord[]>([])
    const [frequencies, setFrequencies] = useState<FrequencyType>()
    const [possibleWords, setPossibleWords] = useState<LevelWord[]>([])
    const [validationError, setValidationError] = useState<string>('')

    useEffect(() => {
        if (wordFrequencies && !frequencies) {
            setFrequencies(wordFrequencies)
        }
        if (frequencies && possibleWords.length === 0 && anagramMap) {
            transformAnagramMap(levelName, anagramMap).then((possibleWords) => {
                const newWordSet = possibleWords.map((word) => ({
                    word,
                    frequency: frequencies[word.toUpperCase()] || 0,
                }))
                setPossibleWords(newWordSet)
            })
        }
        if (levelData && frequencies) {
            const selectedWordSet = levelData.targetWords.map((word) => ({
                word,
                frequency: frequencies[word.toUpperCase()] || 0,
            }))
            setSelectedWords(selectedWordSet)
        }
    }, [frequencies, possibleWords, levelData, anagramMap, wordFrequencies])

    useEffect(() => {
        if (error) {
            const errorMessage = error.response?.data?.message
            const errorText = errorMessage || 'An error occurred'
            setValidationError(errorText)
        }
    }, [error])

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

    const onSave = async () => {
        const validation = await levelSchema
            .validate({ selectedWords })
            .then(() => null)
            .catch((error) => error.message)

        if (validation) return setValidationError(validation)

        setValidationError('')
        const level: Level = {
            name: levelName,
            targetWords: selectedWords.map((word) => word.word),
            difficulty: avgDifficulty(),
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
