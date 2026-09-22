// @ts-nocheck — skill example, outside the tsconfig include.

import { ClientTransformers } from '@common-utils'
import type { Optional } from '@common-utils'
import type { PostFeatureMessageRequest } from '@common-types'
import type { FeatureFormData } from './Feature.types'

/** Form → API payload. One verb per request the feature makes. */
const Post = (data: FeatureFormData, context?: Optional<unknown>): PostFeatureMessageRequest => ({
    ...data,
    field1: data.field1,
    field2: data.field2.fn(),
    field3: data.field3.fn(context),
})

export const FeatureTransformers = ClientTransformers({ Post })
