import { extractAxiosData } from './extractAxiosData'
import { extractEntities } from './extractEntities'
import { mergeApiStatuses } from './mergeStatus'
import { RequestBuilder } from './RequestBuilder'
import { FeatureQuery } from './FeatureQuery'
import { errorMessage } from './errorMessage'

export { QueryKey } from './QueryKey'
export { FeatureQuery } from './FeatureQuery'
export { errorMessage } from './errorMessage'
export type { FeatureQueryBuilt } from './FeatureQuery'
export type { ErrorResponse, MergedApiStatus } from './mergeStatus'

export const Query = {
    RequestBuilder,
    extractAxiosData,
    extractEntities,
    errorMessage,
    mergeApiStatuses,
    FeatureQuery,
}
