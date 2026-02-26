import mongoose, { Document } from 'mongoose'
import Joi from 'joi'

interface ILike extends Document {
    path: string
    likeDate: Date
}

const schema = new mongoose.Schema<ILike>({
    path: {
        type: String,
        required: true,
        lowercase: true,
        maxLength: 100,
        trim: true,
    },
    likeDate: {
        type: Date,
        default: Date.now,
    },
})

interface LikeInput {
    path: string
}

function validateLike(like: LikeInput) {
    const schema = Joi.object({
        path: Joi.string().min(1).max(100).required(),
    })

    return schema.validate(like)
}

const Like = mongoose.model<ILike>('Like', schema)

export { Like, validateLike }
