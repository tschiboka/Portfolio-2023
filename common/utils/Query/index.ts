import { extractAxiosData } from './extractAxiosData'
import { mergeApiStatuses } from './mergeStatus'
import { RequestBuilder } from './Query'

export { QueryKey } from './Key'
export type { ErrorResponse, MergedApiStatus } from './mergeStatus'

export const Query = {
    RequestBuilder,
    extractAxiosData,
    mergeApiStatuses,
}
