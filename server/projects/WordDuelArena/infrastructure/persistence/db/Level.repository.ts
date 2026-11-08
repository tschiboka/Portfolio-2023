import { Arrays, isEmpty } from '@common-utils'
import { LevelModel } from '../../../model/Level.model'

type DbLevel = {
    name: string
    targetWords: string[]
    difficulty: number
}

export const LevelRepository = {
    findAll: async () => LevelModel.find().sort({ createdAt: -1 }),
    findByName: async (name: string) => LevelModel.findOne({ name }),
    upsert: async (level: DbLevel) =>
        LevelModel.findOneAndUpdate(
            { name: level.name },
            { ...level, updatedAt: Date.now() },
            { new: true, upsert: true, runValidators: true },
        ),
    findForSession: async () => {
        // TODO: [WDA-0043] - weight the level drawn for a session by the player's history
        const levels = await LevelModel.find().lean()
        if (isEmpty(levels)) return null
        return Arrays.random(levels) ?? null
    },
}
