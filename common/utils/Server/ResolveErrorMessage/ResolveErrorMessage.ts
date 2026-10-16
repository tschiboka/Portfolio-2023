import { isString, isError, isObject } from '../../Predicate'
import type { ValidationResultLike } from './ResolveErrorMessage.types'
import { ResolveErrorMessageConstants } from './ResolveErrorMessage.constants'

/**
 * Resolve the human-readable message from an error-ish input.
 *
 * Accepts a plain string, an `Error`, or a validation-result-like object; throws for anything that
 * yields no usable message, since an unextractable input is a caller bug rather than a client error.
 *
 * @example
 * ResolveErrorMessage('Bad Content')                    // 'Bad Content'
 * ResolveErrorMessage(new Error('boom'))                // 'boom'
 * ResolveErrorMessage({ error: { details: [{ message: 'Name is required' }] } }) // 'Name is required'
 * ResolveErrorMessage({ error: { message: 'Invalid token' } })                  // 'Invalid token'
 * ResolveErrorMessage(null) // throws — no message to extract
 */
export const ResolveErrorMessage = (input: unknown): string => {
    if (isString(input)) return input
    if (isError(input)) return input.message
    if (!isObject(input)) throw new Error(ResolveErrorMessageConstants.message)

    const result = input as ValidationResultLike
    const detail = result.error?.details?.[0]?.message

    if (detail) return detail
    const summary = result.error?.message

    if (summary) return summary
    throw new Error(ResolveErrorMessageConstants.message)
}
