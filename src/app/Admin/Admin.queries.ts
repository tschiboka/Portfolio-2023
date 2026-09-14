import { useMutation } from '@tanstack/react-query'
import { ErrorResponse, PostBackfillResponse, PostDailyBreakdownResponse } from '@common-types'
import { Query } from '@common-utils'
import { Session } from '@shared-context'
import type { AxiosError, AxiosResponse } from 'axios'

type UsePost<TResponse> = {
    onSuccess?: (response: AxiosResponse<TResponse>) => void
    onError?: (error: AxiosError<ErrorResponse>) => void
}

/** Fires the daily-breakdown job and returns the raw response. */
const useDailyBreakdown = ({ onSuccess, onError }: UsePost<PostDailyBreakdownResponse> = {}) => {
    const token = Session.useContext().session?.token

    return useMutation<AxiosResponse<PostDailyBreakdownResponse>, AxiosError<ErrorResponse>, void>({
        mutationFn: () =>
            new Query.RequestBuilder('Schedule')
                .setSubpath('daily-breakdown')
                .withAuthToken(token)
                .build()
                .post<PostDailyBreakdownResponse>(),
        onSuccess,
        onError,
    })
}

/** Fires the breakdown backfill and returns the raw response. */
const useBackfill = ({ onSuccess, onError }: UsePost<PostBackfillResponse> = {}) => {
    const token = Session.useContext().session?.token

    return useMutation<AxiosResponse<PostBackfillResponse>, AxiosError<ErrorResponse>, void>({
        mutationFn: () =>
            new Query.RequestBuilder('Breakdowns')
                .setSubpath('backfill')
                .withAuthToken(token)
                .build()
                .post<PostBackfillResponse>(),
        onSuccess,
        onError,
    })
}

export const AdminQueries = {
    DailyBreakdown: {
        usePost: useDailyBreakdown,
    },
    Backfill: {
        usePost: useBackfill,
    },
}
