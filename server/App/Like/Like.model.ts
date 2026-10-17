import mongoose from 'mongoose'
import { LikeConstants } from './Like.constants'
import type { ILike } from './Like.types'

const schema = new mongoose.Schema<ILike>({
    path: {
        type: String,
        required: true,
        lowercase: true,
        maxlength: LikeConstants.fieldLimits.path.max,
        trim: true,
    },
    likeDate: {
        type: Date,
        default: Date.now,
    },
})

export const LikeModel = mongoose.model<ILike>('Like', schema)
