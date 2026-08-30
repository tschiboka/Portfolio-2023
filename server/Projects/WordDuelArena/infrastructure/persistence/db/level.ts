import type { SessionState } from '../../../types'
import { Level } from '../../../model/level'
import { Arrays } from '@utils'
import { isEmpty } from '@utils'

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
        if (isEmpty(levels)) return null
        return Arrays.random(levels) ?? null
    },
}

export { levelPersistance }
