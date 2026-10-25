import type { ObjectId } from 'mongodb'
import type { Document } from 'mongoose'

/** A single Xmas message document. */
export interface IXmasMessage extends Document {
    name: string
    message: string
    isRead: boolean
    userId: ObjectId
    createdAt: Date
}

export interface XmasMessageInput {
    name: string
    message: string
    isRead?: boolean
    userId: string
}

export interface XmasCandleInput {
    candle1: boolean
    candle2: boolean
    candle3: boolean
    candle4: boolean
}
