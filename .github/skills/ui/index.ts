// @ts-nocheck — skill example, outside the tsconfig include.

// The feature's public surface. Everything outside the folder imports from here,
// never from a sibling file directly.
export { Feature } from './Feature'
export { FeatureProvider } from './Feature.provider'
export { FeatureContext } from './Feature.context'
export { FeatureStyles } from './Feature.styles'
export { getCardClass, getStatusLabel, selectIsActionable } from './Feature.selectors'
export type { FeatureProps, FeatureFormData, FeatureStatus } from './Feature.types'
