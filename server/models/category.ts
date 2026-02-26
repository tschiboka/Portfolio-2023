import mongoose, { Document } from 'mongoose'
import Joi from 'joi'
import joiObjectId from 'joi-objectid'
;(Joi as any).objectId = joiObjectId(Joi)

interface ICategory extends Document {
    name: string
    userId: mongoose.Types.ObjectId
    description: string
    icon?: string
    color?: string
    status: string
    created_at: Date
    isParent: boolean
    parentId: mongoose.Types.ObjectId | null
}

const Category = mongoose.model<ICategory>(
    'Category',
    new mongoose.Schema<ICategory>({
        name: { type: String, required: true, maxLength: 20 },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        description: {
            type: String,
            required: true,
            minLength: 10,
            maxLength: 255,
        },
        icon: String,
        color: String,
        status: { type: String, default: 'active' },
        created_at: {
            type: Date,
            default: Date.now(),
        },
        isParent: { type: Boolean, required: true },
        parentId: {
            type: mongoose.Schema.Types.ObjectId,
            default: null,
            ref: 'Category',
        },
    }),
)

interface CategoryInput {
    name: string
    description: string
    icon: string
    color?: string
    status?: string
    isParent: boolean
    parentId?: string
}

function validateCategory(category: CategoryInput) {
    const schema = Joi.object({
        name: Joi.string().max(20).required(),
        description: Joi.string().min(10).max(255).required(),
        icon: Joi.string().required(),
        color: Joi.string(),
        status: Joi.string().valid('active', 'inactive', 'deleted'),
        isParent: Joi.boolean().required(),
        parentId: (Joi as any).objectId().optional(),
    })

    return schema.validate(category)
}

export { Category, validateCategory }
