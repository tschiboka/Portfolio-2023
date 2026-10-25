import Joi from 'joi'
import joiObjectId from 'joi-objectid'
import { CategoryConstants } from './Category.constants'
import type { Schema } from 'joi'
import type { CategoryInput } from './Category.types'

Object.assign(Joi, { objectId: joiObjectId(Joi) })

const schema = Joi.object({
    name: Joi.string().max(CategoryConstants.fieldLimits.name.max).required(),
    description: Joi.string()
        .min(CategoryConstants.fieldLimits.description.min)
        .max(CategoryConstants.fieldLimits.description.max)
        .required(),
    icon: Joi.string().required(),
    color: Joi.string(),
    status: Joi.string().valid('active', 'inactive', 'deleted'),
    parentId: (Joi as unknown as { objectId: (schema: unknown) => Schema })
        .objectId(Joi as never)
        .optional(),
})

export const CategorySchema = {
    validate: (category: CategoryInput) => schema.validate(category),
    schema,
}
