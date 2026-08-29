import type { Document, Types } from 'mongoose'

/** A single Xmas message document. */
export interface IXmasMessage extends Document {
    name: string
    message: string
    isRead: boolean
    userId: Types.ObjectId
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
