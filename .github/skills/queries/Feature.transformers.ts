// @ts-nocheck — skill example, outside the tsconfig include.

import type { PostFeatureMessageRequest } from '@common-types'
import type { FeatureFormData } from './Feature.types'

/** Form → API payload. */
export const featureTransformer = {
    toApi: (data: FeatureFormData, context?: unknown): PostFeatureMessageRequest => ({
        ...data,
        field1: data.field1,
        field2: data.field2.fn(),
        field3: data.field3.fn(context),
    }),
}
