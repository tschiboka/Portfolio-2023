import { Repository } from '../../common/utils/Server'
import { Regexp } from '../../common/utils/Regexp'
import { CategoryModel } from './Category.model'
import type { ICategory } from './Category.types'

/** Data-access layer for categories — generic CRUD over the category model. */
export const CategoryRepository = Repository.define<typeof CategoryModel, ICategory>(
    CategoryModel,
).withQueries({
    findByUser: (userId: unknown) => CategoryModel.find({ userId }),
    findParentsByUser: (userId: unknown) => CategoryModel.find({ userId, isParent: true }),
    findByUserAndName: (userId: unknown, name: string) =>
        CategoryModel.find({ userId, name: Regexp.exactWord(name) }),
    findByIdAndUser: (id: string, userId: unknown) => CategoryModel.findOne({ _id: id, userId }),
})
