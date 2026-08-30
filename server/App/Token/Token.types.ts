import type { Document } from 'mongoose'

/** Mongoose document shape for a verification token. */
export interface IToken extends Document {
    token: string
    created: Date
}
