import Joi from 'joi'
import { VisitConstants } from './Visit.constants'
import type { VisitInput } from './Visit.types'

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
