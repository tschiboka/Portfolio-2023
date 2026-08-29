import type { Response } from 'express'
import type { Dictionary } from '../../Generics'
import { isUndefined } from '../../Predicate'
import { ApiError } from '../ApiError'
import { ApiMessage } from '../ApiMessage'
import { HttpStatus } from '../HttpStatus'
import { resolveErrorMessage } from '../ResolveErrorMessage'

/**
 * Single route-facing abstraction for API response behaviour.
 * Error methods throw an internal {@link ApiError} (handled by the central error middleware);
 * success methods emit the actual HTTP response.
 */
export const ApiResponder = {
    notFound: (resource: string): ApiError =>
        new ApiError(HttpStatus.NOT_FOUND, ApiMessage.notFound(resource)),
    badRequest: (input: unknown): ApiError =>
        new ApiError(HttpStatus.BAD_REQUEST, resolveErrorMessage(input)),
    invalidId: (resource: string): ApiError =>
        new ApiError(HttpStatus.BAD_REQUEST, ApiMessage.invalidId(resource)),
    forbidden: (): ApiError => new ApiError(HttpStatus.FORBIDDEN, ApiMessage.forbidden()),
    unauthorized: (reason: string): ApiError => new ApiError(HttpStatus.UNAUTHORIZED, reason),
    conflict: (message: string): ApiError => new ApiError(HttpStatus.CONFLICT, message),
    internalServerError: (message = 'Internal Server Error'): ApiError =>
        new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, message),
    unavailable: (resource: string): ApiError =>
        new ApiError(HttpStatus.SERVICE_UNAVAILABLE, ApiMessage.unavailable(resource)),
    ok: <TData extends Dictionary>(res: Response, data: TData): Response =>
        res.status(HttpStatus.OK).json(data),
    created: (res: Response, data?: Dictionary): Response =>
        isUndefined(data)
            ? res.status(HttpStatus.CREATED).send()
            : res.status(HttpStatus.CREATED).json(data),
    text: (res: Response, text: string): Response => res.status(HttpStatus.OK).send(text),
}
