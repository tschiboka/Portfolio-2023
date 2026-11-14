import mongoose from 'mongoose'
import type { ILevel } from './Level.types'

const levelSchema = new mongoose.Schema<ILevel>({
    name: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 8,
        trim: true,
    },
    targetWords: {
        type: [String],
        required: true,
    },
    difficulty: {
        type: Number,
        required: true,
        min: 1,
        max: 10,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
})

export const LevelModel = mongoose.model<ILevel>('WDA_Level', levelSchema)
