// @ts-nocheck — skill example, outside the tsconfig include.

import { FeatureTransformers } from './Feature.transformers'
import type { FeatureFormData } from './Feature.types'

type Submit = (payload: PostFeatureRequest) => Promise<void>

// The submit entry point, in one place. Receives FeatureFormData, prepares the
// request shape, and hands the call itself to the queries layer.
//
// The mutation arrives as an argument — the component owns the hook call, so no
// hook ever runs from a plain handler.
const submit = async (formData: FeatureFormData, mutateAsync: Submit): Promise<void> => {
    const payload = FeatureTransformers.Post(formData)

    await mutateAsync(payload)
}

export const FeatureHandlers = { submit }
