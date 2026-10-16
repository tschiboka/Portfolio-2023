import { LevelModel } from '../../../model/Level.model'
import { Arrays } from '@common-utils'
import { isEmpty } from '@common-utils'

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
        // TODO: Implement a better level selection logic based on player history
        const levels = await LevelModel.find().lean()
        if (isEmpty(levels)) return null
        return Arrays.random(levels) ?? null
    },
}
