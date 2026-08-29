import type { GetLikeSummaryResponse, GetLikeResponse, PostLikeResponse } from '@common/types'
import { ApiResponder } from '../../common/utils/Server'
import { DateTime } from '../../common/utils/DateTime'
import { BreakdownModel } from '../Breakdown/Breakdown.model'
import { LikeRepository } from './Like.repository'
import { LikeSchema } from './Like.schema'
import type { LikeInput } from './Like.types'

/** Business logic for likes — persistence via the repository, validation via the schema. */
export const LikeService = {
    /** Returns likes grouped by path. */
    summary: async (): Promise<GetLikeSummaryResponse> => {
        const likes = await LikeRepository.find()
        const likesByPath = likes.reduce<Record<string, number>>((grouped, like) => {
            grouped[like.path] = (grouped[like.path] ?? 0) + 1
            return grouped
        }, {})
        return { likes: likesByPath }
    },

    /** Returns the number of likes recorded for a single path. */
    countByPath: async (path: string): Promise<GetLikeResponse> => {
        const likes = await LikeRepository.countByPath(path)
        return { likes }
    },

    /** Records a like and upserts the daily aggregate for fast breakdown queries. */
    create: async (input: LikeInput): Promise<PostLikeResponse> => {
        const { error } = LikeSchema.validate(input)
        if (error) throw ApiResponder.badRequest(error)

        const like = LikeRepository.create(input)
        await LikeRepository.save(like)

        const today = DateTime.Format.to('ApiDate', new Date()) ?? ''
        await BreakdownModel.updateOne(
            { date: today, path: input.path },
            { $inc: { likes: 1 } },
            { upsert: true },
        )

        return { like: { path: input.path, likeDate: like.likeDate } }
    },
}
