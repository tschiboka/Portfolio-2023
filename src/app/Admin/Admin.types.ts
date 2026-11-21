import type { AxiosError, AxiosResponse } from 'axios'
import type { ErrorResponse } from '@common-utils'

export type UsePost<TResponse> = {
    onSuccess?: (response: AxiosResponse<TResponse>) => void
    onError?: (error: AxiosError<ErrorResponse>) => void
}
