import { ChangeEvent, useState } from 'react'
import { BrowserHooks } from '@common-utils'
import { LoadingIndicator } from '@common-ux'
import { LevelCreatorQueries } from './LevelCreator.queries'
import { LevelList } from './components/LevelList'
import { LevelCreatorModal } from './components/LevelCreatorModal'
import { WordUtils } from '../common/utils/Word/Word.utils'
import { WordConstants } from '../common/utils/Word/Word.constants'
import './LevelCreator.styles.css'
import '../WordDuelArena.styles.css'

export const LevelCreator = () => {
    const { ref, enterFullScreen } = BrowserHooks.useFullScreen<HTMLDivElement>()

    const { data, isLoading, error } = LevelCreatorQueries.Names.useGet()
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
        <div className="level-creator word-duel-arena" ref={ref}>
            <div className="app">
                <h1>Level Creator</h1>
                <div className="level-form">
                    <input
                        type="text"
                        id="levelName"
                        name="levelName"
                        value={levelName}
                        minLength={WordConstants.minLength}
                        maxLength={WordConstants.maxLength}
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
                        levelName={WordUtils.getAnagramKey(levelName)}
                        setModalOpen={setModalOpen}
                    />
                )}
            </div>
        </div>
    )
}
