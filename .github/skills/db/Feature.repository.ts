// @ts-nocheck — skill example, outside the tsconfig include.

import { Repository } from '@common-utils'
import { FeatureModel } from './Feature.model'
import type { IFeature } from './Feature.types'

// Generic CRUD comes from `Repository.define` — find, findById, create, save and
// the rest — so a method here is only ever one the domain needs beyond that.
// This is the only file that assembles a filter.
export const FeatureRepository = Repository.define<typeof FeatureModel, IFeature>(
    FeatureModel,
).withQueries({
    /** Count by the natural key. */
    countByPath: (path: string) => FeatureModel.countDocuments({ path }),

    /** Ownership is part of the query, never left to the caller to filter. */
    findByUser: (userId: string) => FeatureModel.find({ userId }),

    /** A named lookup reads as the question being asked, not the filter behind it. */
    findByUserAndPath: (userId: string, path: string) => FeatureModel.findOne({ userId, path }),

    /** Ranges are named for what they mean, so no caller re-derives a cut-off. */
    findSince: (userId: string, since: Date) =>
        FeatureModel.find({ userId, createdAt: { $gte: since } }),

    /** Projection belongs here — a caller asks for the list, not for four fields. */
    findNamesByUser: (userId: string) => FeatureModel.find({ userId }).select('path -_id').lean(),

    /** An aggregate is a query, so it lives with the other queries. */
    countByUser: (userId: string) =>
        FeatureModel.aggregate<{ _id: string; total: number }>([
            { $match: { userId } },
            { $group: { _id: '$path', total: { $sum: 1 } } },
        ]),

    /** Deletes return the count, so the service can tell whether anything matched. */
    removeByUserAndPath: (userId: string, path: string) => FeatureModel.deleteOne({ userId, path }),
})
