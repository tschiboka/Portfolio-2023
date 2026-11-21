/* eslint-disable standards/matching-spec -- TODO [0013] check the convention */
import Joi from 'joi'
import { LikeConstants } from './Like.constants'
import type { LikeInput } from './Like.types'

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
