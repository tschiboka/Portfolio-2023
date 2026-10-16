import mongoose from 'mongoose'
import type { IVisit } from './Visit.types'
import { VisitConstants } from './Visit.constants'

const schema = new mongoose.Schema<IVisit>({
    path: {
        type: String,
        required: true,
        lowercase: true,
        maxlength: VisitConstants.fieldLimits.path.max,
        trim: true,
    },
    visitDate: {
        type: Date,
        default: Date.now,
    },
})

export const VisitModel = mongoose.model<IVisit>('Visit', schema)
