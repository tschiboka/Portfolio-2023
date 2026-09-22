// @ts-nocheck — skill example, outside the tsconfig include.

import mongoose from 'mongoose'
import type { IFeature } from './Feature.types'
import { FeatureFieldLimits } from './Feature.constants'

// The storage shape: what must be true of a document, enforced by the store
// itself. Distinct from the Joi schema, which guards the way in.
const schema = new mongoose.Schema<IFeature>({
    path: {
        type: String,
        required: true,
        lowercase: true,
        maxlength: FeatureFieldLimits.path.max,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

export const FeatureModel = mongoose.model<IFeature>('Feature', schema)
