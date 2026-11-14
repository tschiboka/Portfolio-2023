import type { Document } from 'mongoose'

/** Mongoose document shape for a verification token. */
export type IToken = Document & {
    token: string
    created: Date
}
