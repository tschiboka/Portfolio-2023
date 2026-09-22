// @ts-nocheck — skill example, outside the tsconfig include.

import Joi from 'joi'
import type { FeatureInput } from './Feature.types'
import { FeatureFieldLimits } from './Feature.constants'

const schema = Joi.object({
    path: Joi.string().min(FeatureFieldLimits.path.min).max(FeatureFieldLimits.path.max).required(),
})

export const FeatureSchema = {
    schema,
    validate: (feature: FeatureInput) => schema.validate(feature),
}
