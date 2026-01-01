import { LevelName } from '../../common/utils/Types/Level'

type LevelListProps = {
    levels: LevelName[]
    setLevelName: (levelName: string) => void
    setModalOpen: (open: boolean) => void
    enterFullScreen: () => void
}

export const LevelList = ({
    levels,
    setLevelName,
    setModalOpen,
    enterFullScreen,
}: LevelListProps) => {
    const handleLevelClick = (levelName: string) => {
        setLevelName(levelName)
        setModalOpen(true)
        enterFullScreen()
    }

    return (
        <div className="level-list">
            <span>Levels: {levels.length}</span>
            {levels.map((level) => (
                <div
                    key={level.name}
                    onClick={() => handleLevelClick(level.name)}
                >
                    <span>{level.name}</span>
                    <span className="level-difficulty">
                        [{level.difficulty}]
                    </span>
                </div>
            ))}
        </div>
    )
}
