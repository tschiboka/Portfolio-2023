import Joi from 'joi'
import joiObjectId from 'joi-objectid'
;(Joi as unknown as { objectId: unknown }).objectId = joiObjectId(Joi as never)
import type { CategoryInput } from './Category.types'
import { CategoryFieldLimits } from './Category.constants'

const schema = Joi.object({
    name: Joi.string().max(CategoryFieldLimits.name.max).required(),
    description: Joi.string()
        .min(CategoryFieldLimits.description.min)
        .max(CategoryFieldLimits.description.max)
        .required(),
    icon: Joi.string().required(),
    color: Joi.string(),
    status: Joi.string().valid('active', 'inactive', 'deleted'),
    parentId: (Joi as unknown as { objectId: (schema: unknown) => Joi.Schema })
        .objectId(Joi as never)
        .optional(),
})

export const CategorySchema = {
    validate: (category: CategoryInput) => schema.validate(category),
    schema,
}
