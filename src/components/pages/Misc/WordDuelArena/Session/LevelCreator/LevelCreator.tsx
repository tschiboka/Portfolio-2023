import { ChangeEvent, useState } from 'react'
import './LevelCreator.styles.css'
import { LevelCreatorModal } from './LevelCreatorModal'
import { getAnagramKey } from '../../common/utils/Word/getAnagramKey'
import {
    MAX_WORD_LENGTH,
    MIN_WORD_LENGTH,
} from '../../common/utils/Word/constants'

export const LevelCreator = () => {
    const [levelName, setLevelName] = useState('')
    const [modalOpen, setModalOpen] = useState(false)

    const handleNewLevelClick = () => setModalOpen(true)
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) =>
        setLevelName(e.target.value.toUpperCase())

    return (
        <div className="level-creator">
            <div className="app">
                <h1>Level Creator</h1>
                <div className="level-form">
                    <input
                        type="text"
                        id="levelName"
                        name="levelName"
                        value={levelName}
                        minLength={MIN_WORD_LENGTH}
                        maxLength={MAX_WORD_LENGTH}
                        onChange={handleInputChange}
                    />
                    <button onClick={handleNewLevelClick}>
                        Create New Level
                    </button>
                </div>
                {modalOpen && (
                    <LevelCreatorModal
                        levelName={getAnagramKey(levelName)}
                        setModalOpen={setModalOpen}
                    />
                )}
            </div>
        </div>
    )
}
