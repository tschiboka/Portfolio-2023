import { ChangeEvent, useState } from 'react'
import './LevelCreator.styles.css'
import { LevelCreatorModal } from './LevelCreatorModal'
import { getAnagramKey } from '../../common/utils/Word/getAnagramKey'
import {
    MAX_WORD_LENGTH,
    MIN_WORD_LENGTH,
} from '../../common/utils/Word/constants'
import { useGetLevelNames } from './LevelCreator.queries'
import { LevelList } from './LevelList'
import LoadingIndicator from '../../../../../sharedComponents/LoadingIndicator/LoadingIndicator'
import { useFullScreen } from '../../common/utils'

export const LevelCreator = () => {
    const { ref, enterFullScreen } = useFullScreen<HTMLDivElement>()

    const { data, isLoading, error } = useGetLevelNames()
    const levels = data?.levels

    const [levelName, setLevelName] = useState('')
    const [modalOpen, setModalOpen] = useState(false)

    const handleNewLevelClick = () => {
        enterFullScreen()
        setModalOpen(true)
    }
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) =>
        setLevelName(e.target.value.toUpperCase())

    return (
        <div className="level-creator" ref={ref}>
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
                    <button onClick={handleNewLevelClick}>Create</button>
                </div>
                <LoadingIndicator show={isLoading} />
                {error && (
                    <p className="error-message">
                        {error.response?.data?.message || error.message}
                    </p>
                )}
                <LevelList
                    levels={levels || []}
                    setLevelName={setLevelName}
                    setModalOpen={setModalOpen}
                    enterFullScreen={enterFullScreen}
                />
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
