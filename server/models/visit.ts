import mongoose, { Document } from 'mongoose'
import Joi from 'joi'

interface IVisit extends Document {
    path: string
    visitDate: Date
}

const schema = new mongoose.Schema<IVisit>({
    path: {
        type: String,
        required: true,
        lowercase: true,
        maxLength: 100,
        trim: true,
    },
    visitDate: {
        type: Date,
        default: Date.now,
    },
})

interface VisitInput {
    path: string
}

function validateVisit(visit: VisitInput) {
    const schema = Joi.object({
        path: Joi.string().min(1).max(100).required(),
    })

    return schema.validate(visit)
}

const Visit = mongoose.model<IVisit>('Visit', schema)

export { Visit, validateVisit }
