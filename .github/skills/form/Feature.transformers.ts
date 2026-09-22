// @ts-nocheck — skill example, outside the tsconfig include.
import { ClientTransformers } from '@common-utils'
import type { FeatureFormData } from './Feature.types'

// Present only where the form shape and the request shape differ.
// Maps one to the other. Validates nothing — the schema already did.
//
// Two differences here: `passwordConfirmation` is form-only and must never
// reach the request, and the API takes `categoryId` rather than the object.
const Post = ({ category, passwordConfirmation, ...rest }: FeatureFormData) => ({
    ...rest,
    categoryId: category?.id,
})

export const FeatureTransformers = ClientTransformers({ Post })
