import mongoose from 'mongoose'
import type { ICategory } from './Category.types'
import { CategoryFieldLimits } from './Category.constants'

const schema = new mongoose.Schema<ICategory>({
    name: { type: String, required: true, maxLength: CategoryFieldLimits.name.max },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    description: {
        type: String,
        required: true,
        minLength: CategoryFieldLimits.description.min,
        maxLength: CategoryFieldLimits.description.max,
    },
    icon: String,
    color: String,
    status: { type: String, default: 'active' },
    created_at: {
        type: Date,
        default: Date.now(),
    },
    parentId: {
        type: mongoose.Schema.Types.ObjectId,
        default: null,
        ref: 'Category',
    },
})

export const CategoryModel = mongoose.model<ICategory>('Category', schema)
