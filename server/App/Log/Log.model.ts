import mongoose from 'mongoose'
import type { ILog } from './Log.types'

const schema = new mongoose.Schema<ILog>({
    timestamp: String,
    name: String,
    message: String,
    stack: String,
})

export const LogModel = mongoose.model<ILog>('Logs', schema)
