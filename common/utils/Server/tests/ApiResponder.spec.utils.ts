import type { Response } from 'express'
import type { ResponseMockState } from './ApiResponder.spec.types'

/**
 * Minimal Express `Response` mock. Returns the live `captured` state (mutated as the responder
 * emits) plus the mock `response` — read `captured.statusCode`/`captured.body` AFTER the call.
 */
export const createResponse = () => {
    const captured: ResponseMockState = {
        statusCode: 0,
        body: undefined,
        sent: false,
    }
    const response = {
        status: (code: number) => {
            captured.statusCode = code
            return response
        },
        json: (payload: unknown) => {
            captured.body = payload
            captured.sent = true
            return response
        },
        send: (payload?: unknown) => {
            captured.body = payload
            captured.sent = true
            return response
        },
    } as Response
    return { captured, response }
}
