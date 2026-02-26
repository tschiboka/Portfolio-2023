import mongoose, { Document } from 'mongoose'

interface ILog extends Document {
    timestamp: string
    name: string
    message: string
    stack: string
}

const Log = mongoose.model<ILog>(
    'Logs',
    new mongoose.Schema<ILog>({
        timestamp: String,
        name: String,
        message: String,
        stack: String,
    }),
)

export { Log }
