import type { AxiosResponse } from 'axios'

/**
 * Extracts `response.data` from an Axios response, preserving the full type.
 * @example
 * ```ts
 * queryFn: () => request.get<GetActivityFeedResponse>().then(extractAxiosData),
 * ```
 */
export const extractAxiosData = <T>(response: AxiosResponse<T>): T => response.data
