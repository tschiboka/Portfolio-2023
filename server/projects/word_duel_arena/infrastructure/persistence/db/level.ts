import type { SessionState } from '../../../types'
import { Level } from '../../../model/level'

type DbLevel = {
    name: string
    targetWords: string[]
    difficulty: number
}

const levelPersistance = {
    findAllLevels: async () => Level.find().sort({ createdAt: -1 }),
    findLevelByName: async (name: string) => Level.findOne({ name }),
    upsertLevel: async (level: DbLevel) =>
        Level.findOneAndUpdate(
            { name: level.name },
            { ...level, updatedAt: Date.now() },
            { new: true, upsert: true, runValidators: true },
        ),
    findLevelForSession: async (_sessionState: SessionState) => {
        // TODO: Implement a better level selection logic based on player history
        const levels = await Level.find().lean()
        if (levels.length === 0) return null

        const randomIndex = Math.floor(Math.random() * levels.length)
        return levels[randomIndex]
    },
}

export { levelPersistance }
