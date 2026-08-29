import type { HttpStatusCode } from '../HttpStatus'

/**
 * Internal throwable error carrying the HTTP status and message for the central error middleware
 * to emit. Not part of the route-facing API — routes throw the `ApiResponder` helpers instead.
 */
export class ApiError extends Error {
    readonly status: HttpStatusCode

    constructor(status: HttpStatusCode, message: string) {
        super(message)
        this.name = 'ApiError'
        this.status = status
    }
}
