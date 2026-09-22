// @ts-nocheck — skill example, outside the tsconfig include.
import type { Optional } from '@common-utils'
import type { Category } from '@common-types'

// What the fields produce. Not the API request shape — see Feature.transformers.ts
// for the mapping where the two differ.
export type FeatureFormData = {
    name: string
    userName: string
    email: string
    password: string
    passwordConfirmation: string
    category?: Optional<Category>
}
