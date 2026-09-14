import type { AxiosError } from 'axios'
import type { ErrorResponse } from './mergeStatus'

/**
 * The message to show for a failed request: the server's, falling back to a
 * client-side string when the response carries none.
 *
 * @example
 * setMessage(errorMessage(error, ClientMessage.Failure.Verify('email')))
 */
export const errorMessage = (error: AxiosError<ErrorResponse>, fallback: string): string =>
    error.response?.data?.message ?? fallback
