import type { ApiStatus, ErrorResponse, MergedApiStatus } from './mergeStatus.types'

export const mergeApiStatuses = <TError = ErrorResponse>(
    statuses: ApiStatus<TError>[],
): MergedApiStatus<TError> => {
    const isLoading = statuses.some((status) => 'isLoading' in status && status.isLoading)
    const isPending = statuses.some((status) => 'isPending' in status && status.isPending)
    const isError = statuses.some((status) => status.isError)
    const isSuccess = statuses.every((status) => status.isSuccess)
    const error = statuses.find((status) => status.error)?.error ?? null

    return {
        isLoading,
        isPending,
        isError,
        isSuccess,
        error,
    }
}
