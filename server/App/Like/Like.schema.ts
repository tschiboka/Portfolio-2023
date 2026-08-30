import Joi from 'joi'
import type { LikeInput } from './Like.types'
import { LikeFieldLimits } from './Like.constants'

const schema = Joi.object({
    path: Joi.string().min(LikeFieldLimits.path.min).max(LikeFieldLimits.path.max).required(),
})

export const LikeSchema = {
    validate: (like: LikeInput) => schema.validate(like),
    schema,
}
