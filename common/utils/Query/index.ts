import { extractAxiosData } from './extractAxiosData'
import { extractEntities } from './extractEntities'
import { mergeApiStatuses } from './mergeStatus'
import { RequestBuilder } from './RequestBuilder'
import { FeatureQuery } from './FeatureQuery'
import { errorMessage } from './errorMessage'

export { CacheKeyBuilder, QueryKey } from './QueryKey'
export { FeatureQuery } from './FeatureQuery'
export { errorMessage } from './errorMessage'
export { extractAxiosData } from './extractAxiosData'
export { extractEntities } from './extractEntities'
export { RequestBuilder } from './RequestBuilder'
export const Query = {
    extractAxiosData,
    extractEntities,
    errorMessage,
    mergeApiStatuses,
    FeatureQuery,
    RequestBuilder,
}
export type { CacheKey } from './QueryKey'
export type { FeatureQueryBuilt } from './FeatureQuery.types'
export type { ErrorResponse, MergedApiStatus } from './mergeStatus.types'
