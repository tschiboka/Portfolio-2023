import { Repository } from '../../common/utils/Server'
import { LikeModel } from './Like.model'
import type { ILike } from './Like.types'

/** Data-access layer for likes — generic CRUD over the like model. */
export const LikeRepository = Repository.define<typeof LikeModel, ILike>(LikeModel).withQueries({
    countByPath: (path: string) => LikeModel.countDocuments({ path }),
})
