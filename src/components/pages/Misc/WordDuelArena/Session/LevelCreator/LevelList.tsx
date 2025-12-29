type LevelListProps = {
    levelNames: string[]
    setLevelName: (levelName: string) => void
    setModalOpen: (open: boolean) => void
}

export const LevelList = ({
    levelNames,
    setLevelName,
    setModalOpen,
}: LevelListProps) => {
    const handleLevelClick = (levelName: string) => {
        setLevelName(levelName)
        setModalOpen(true)
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
