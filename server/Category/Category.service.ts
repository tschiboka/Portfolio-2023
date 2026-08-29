import mongoose from 'mongoose'
import type { CurrentUser, GetCategoryResponse, PostCategoryRequest } from '@common/types'
import { ApiMessage, ApiResponder } from '../../common/utils/Server'
import { ApiTransformers } from '../../common/utils/Transformer'
import { CategoryRepository } from './Category.repository'
import { CategorySchema } from './Category.schema'
import type { ICategory } from './Category.types'

/** Business logic for categories — persistence via the repository, validation via the schema. */
export const CategoryService = {
    /**
     * Lists the requesting user's categories. When `isParent` is set, returns only parent
     * categories; otherwise all the user's categories.
     */
    list: async (user: CurrentUser, isParent: boolean): Promise<GetCategoryResponse[]> => {
        const { _id } = user
        const categories = isParent
            ? await CategoryRepository.findParentsByUser(_id)
            : await CategoryRepository.findByUser(_id)
        return categories.map(ApiTransformers.toApiResource<GetCategoryResponse>)
    },

    /** Creates a category for the requesting user, enforcing uniqueness + parent rules. */
    create: async (user: CurrentUser, input: PostCategoryRequest): Promise<GetCategoryResponse> => {
        const { _id } = user

        const duplicates = await CategoryRepository.findByUserAndName(_id, input.name)
        if (duplicates.length) throw ApiResponder.conflict(ApiMessage.exists('category'))

        const { parentId } = input
        if (parentId) {
            const isValidId = mongoose.Types.ObjectId.isValid(parentId)
            if (!isValidId) throw ApiResponder.badRequest(ApiMessage.invalidId('parent'))

            const parent = await CategoryRepository.findByIdAndUser(parentId, _id)
            if (!parent) throw ApiResponder.notFound('parent')

            if (!parent.isParent)
                throw ApiResponder.badRequest(ApiMessage.invalid('parent category'))
        }

        const { error } = CategorySchema.validate(input)
        if (error) throw ApiResponder.badRequest(error)

        const category = CategoryRepository.create({
            ...input,
            userId: new mongoose.Types.ObjectId(String(_id)),
        } as Partial<ICategory>)
        await CategoryRepository.save(category)
        return ApiTransformers.toApiResource<GetCategoryResponse>(category)
    },
}
