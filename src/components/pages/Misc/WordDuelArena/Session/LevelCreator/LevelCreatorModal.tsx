import { useState } from 'react'
import { WordOptionList } from './WordOptionList/WordOptionList'
import { LevelPreview } from './LevelPreview/LevelPreview'
import { getWordFrequency } from '../../common/utils'

type LevelCreatorModalProps = {
    levelName: string
    setModalOpen: (open: boolean) => void
}

export const LevelCreatorModal = ({
    levelName,
    setModalOpen,
}: LevelCreatorModalProps) => {
    const [optionsOpen, setOptionsOpen] = useState(false)
    const [selectedWords, setSelectedWords] = useState<string[]>([])

    const avgFreq =
        Math.round(
            selectedWords
                ?.map((word) => getWordFrequency(word))
                .reduce((a, b) => a + b, 0) / selectedWords.length,
        ) || 0
    const difficulty = 10 - Math.round(Math.min(Math.max(avgFreq / 10, 0), 9))

    return (
        <div className="level-creator-modal">
            <h1>
                Level: {levelName} {avgFreq ? `[${difficulty}]` : ''}
            </h1>
            <LevelPreview selectedWords={selectedWords} />
            <div className="wheel-container">
                <div className="wheel"></div>
            </div>
            <footer>
                <button onClick={() => setOptionsOpen(!optionsOpen)}>
                    {optionsOpen ? 'Hide' : 'Select'}
                </button>
                <button disabled={optionsOpen}>Save</button>
                <button
                    onClick={() => setModalOpen(false)}
                    disabled={optionsOpen}
                >
                    Close
                </button>
            </footer>
            {optionsOpen && (
                <WordOptionList
                    anagram={levelName}
                    selectedWords={selectedWords}
                    setSelectedWords={setSelectedWords}
                />
            )}
        </div>
    )
}
