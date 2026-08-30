import mongoose from 'mongoose'
import type { IToken } from './Token.types'

const schema = new mongoose.Schema<IToken>({
    token: {
        type: String,
        required: true,
    },
    created: {
        type: Date,
        default: Date.now,
    },
})

export const TokenModel = mongoose.model<IToken>('Token', schema)
