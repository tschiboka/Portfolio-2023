import mongoose, { Document } from 'mongoose'

interface ILevel extends Document {
    name: string
    targetWords: string[]
    difficulty: number
    createdAt: Date
    updatedAt: Date
}

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

const Level = mongoose.model<ILevel>('WDA_Level', levelSchema)

export { Level }
