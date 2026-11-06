import { Regexp, Repository } from '@common-utils'
import { CategoryModel } from './Category.model'
import type { ICategory } from './Category.types'

/** Data-access layer for categories - generic CRUD over the category model. */
export const CategoryRepository = Repository.define<typeof CategoryModel, ICategory>(
    CategoryModel,
).withQueries({
    findByUser: (userId: ICategory['userId'] | string) => CategoryModel.find({ userId }),
    findParentsByUser: (userId: ICategory['userId'] | string) =>
        CategoryModel.find({ userId, isParent: true }),
    findByUserAndName: (userId: ICategory['userId'] | string, name: string) =>
        CategoryModel.find({ userId, name: Regexp.exactWord(name) }),
    findByIdAndUser: (id: string, userId: ICategory['userId'] | string) =>
        CategoryModel.findOne({ _id: id, userId }),
})
