import mongoose from 'mongoose'
import type { ILike } from './Like.types'
import { LikeFieldLimits } from './Like.constants'

const schema = new mongoose.Schema<ILike>({
    path: {
        type: String,
        required: true,
        lowercase: true,
        maxlength: LikeFieldLimits.path.max,
        trim: true,
    },
    likeDate: {
        type: Date,
        default: Date.now,
    },
})

export const LikeModel = mongoose.model<ILike>('Like', schema)
