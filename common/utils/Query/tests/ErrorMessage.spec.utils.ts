import type { AxiosError } from 'axios'
import type { ErrorResponse } from '../MergeStatus.types'

const FALLBACK = 'Something went wrong'

const axiosError = (data?: ErrorResponse): AxiosError<ErrorResponse> =>
    ({
        response: data === undefined ? undefined : { data },
    }) as AxiosError<ErrorResponse>

export const ErrorMessageTestUtils = { FALLBACK, axiosError }
