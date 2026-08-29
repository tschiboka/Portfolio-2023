import { isString, isError, isObject } from '../../Predicate'
import type { ValidationResultLike } from './ResolveErrorMessage.types'
import { RESOLVE_ERROR_MESSAGE_ERROR } from './ResolveErrorMessage.constants'

/**
 * Resolve the human-readable message from an error-ish input.
 *
 * Accepts a plain string, an `Error`, or a validation-result-like object; throws for anything that
 * yields no usable message, since an unextractable input is a caller bug rather than a client error.
 *
 * @example
 * resolveErrorMessage('Bad Content')                    // 'Bad Content'
 * resolveErrorMessage(new Error('boom'))                // 'boom'
 * resolveErrorMessage({ error: { details: [{ message: 'Name is required' }] } }) // 'Name is required'
 * resolveErrorMessage({ error: { message: 'Invalid token' } })                  // 'Invalid token'
 * resolveErrorMessage(null) // throws — no message to extract
 */
export const resolveErrorMessage = (input: unknown): string => {
    if (isString(input)) return input
    if (isError(input)) return input.message
    if (!isObject(input)) throw new Error(RESOLVE_ERROR_MESSAGE_ERROR)

    const result = input as ValidationResultLike
    const detail = result.error?.details?.[0]?.message

    if (detail) return detail
    const summary = result.error?.message

    if (summary) return summary
    throw new Error(RESOLVE_ERROR_MESSAGE_ERROR)
}
