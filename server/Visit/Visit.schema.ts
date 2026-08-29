import Joi from 'joi'
import type { VisitInput } from './Visit.types'
import { VisitFieldLimits } from './Visit.constants'

const schema = Joi.object({
    path: Joi.string().min(VisitFieldLimits.path.min).max(VisitFieldLimits.path.max).required(),
})

export const VisitSchema = {
    validate: (visit: VisitInput) => schema.validate(visit),
    schema,
}
