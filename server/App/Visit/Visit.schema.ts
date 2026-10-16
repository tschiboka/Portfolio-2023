import Joi from 'joi'
import type { VisitInput } from './Visit.types'
import { VisitConstants } from './Visit.constants'

const schema = Joi.object({
    path: Joi.string()
        .min(VisitConstants.fieldLimits.path.min)
        .max(VisitConstants.fieldLimits.path.max)
        .required(),
})

export const VisitSchema = {
    validate: (visit: VisitInput) => schema.validate(visit),
    schema,
}
