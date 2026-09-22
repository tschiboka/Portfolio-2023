// @ts-nocheck — skill example, outside the tsconfig include.

import { ContextBuilder, Functions } from '@common-utils'
import type { FeatureContextValues } from './Feature.types'

// Declares the context and its initials, and nothing else — no JSX lives here.
// `CreateContext<T>` is the generic; a `Dictionary` only when the shape itself
// is open-ended.
export const FeatureContext = ContextBuilder.CreateContext<FeatureContextValues>('Feature', {
    step: 0,
    isLoading: false,
    setStep: Functions.noop,
})
