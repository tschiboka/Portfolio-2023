type LevelListProps = {
    levelNames: string[]
    setLevelName: (levelName: string) => void
    setModalOpen: (open: boolean) => void
    enterFullScreen: () => void
}

export const LevelList = ({
    levelNames,
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
            <span>Levels: {levelNames.length}</span>
            {levelNames.map((levelName) => (
                <div
                    key={levelName}
                    onClick={() => handleLevelClick(levelName)}
                >
                    {levelName}
                </div>
            ))}
        </div>
    )
}
