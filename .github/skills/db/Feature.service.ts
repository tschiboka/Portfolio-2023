// @ts-nocheck — skill example, outside the tsconfig include.

import type { CurrentUser, GetFeatureResponse, PostFeatureRequest } from '@common-types'
import { ApiMessage, ApiResponder } from '@common-utils'
import { FeatureRepository } from './Feature.repository'
import { FeatureSchema } from './Feature.schema'
import type { IFeature } from './Feature.types'

// The layer the route calls. It owns the business rules and the validation;
// the route owns neither, and the repository owns the queries.
export const FeatureService = {
    /** Lists the requesting user's records. */
    list: async (user: CurrentUser): Promise<GetFeatureResponse[]> => {
        const features = await FeatureRepository.findByUser(String(user._id))
        return features.map((feature) => ({ path: feature.path }))
    },

    /** Creates one, rejecting a duplicate before any write happens. */
    create: async (user: CurrentUser, input: PostFeatureRequest): Promise<GetFeatureResponse> => {
        const { _id } = user

        const existing = await FeatureRepository.findByUserAndPath(String(_id), input.path)
        if (existing) throw ApiResponder.conflict(ApiMessage.exists('feature'))

        const { error } = FeatureSchema.validate(input)
        if (error) throw ApiResponder.badRequest(error)

        const feature = FeatureRepository.create({ ...input, userId: _id } as Partial<IFeature>)
        await FeatureRepository.save(feature)

        return { path: feature.path }
    },

    /** Removes one, treating "nothing matched" as a 404 rather than silence. */
    remove: async (user: CurrentUser, path: string): Promise<void> => {
        const { deletedCount } = await FeatureRepository.removeByUserAndPath(String(user._id), path)
        if (!deletedCount) throw ApiResponder.notFound('feature')
    },
}
