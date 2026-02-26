import mongoose, { Document } from 'mongoose'
import Joi from 'joi'

interface IToken extends Document {
    token: string
    created: Date
}

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

const Token = mongoose.model<IToken>('Token', schema)

interface TokenInput {
    token: string
}

const validateToken = (token: TokenInput) => {
    const schema = Joi.object({
        token: Joi.string().required(),
    })
    return schema.validate(token)
}

export { Token, validateToken }
