// @ts-nocheck — skill example, outside the tsconfig include.

// The barrel, in dependency order — what other folders reach for. A type is
// exported as a type, so nothing pulls a runtime value it does not need.
export { FeatureRouter } from './Feature.routes'
export { FeatureService } from './Feature.service'
export { FeatureRepository } from './Feature.repository'
export { FeatureSchema } from './Feature.schema'
export { FeatureFieldLimits } from './Feature.constants'
export { FeatureModel } from './Feature.model'
export type { IFeature, FeatureInput } from './Feature.types'
