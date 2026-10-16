import Joi from 'joi'
import type { LikeInput } from './Like.types'
import { LikeConstants } from './Like.constants'

const schema = Joi.object({
    path: Joi.string()
        .min(LikeConstants.fieldLimits.path.min)
        .max(LikeConstants.fieldLimits.path.max)
        .required(),
})

export const LikeSchema = {
    validate: (like: LikeInput) => schema.validate(like),
    schema,
}
