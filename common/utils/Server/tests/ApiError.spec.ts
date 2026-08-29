import { describe, it, expect } from 'vitest'
import { ApiError } from '../ApiError'
import { HttpStatus } from '../HttpStatus'

describe('ApiError', () => {
    it('is an instance of Error', () => {
        const error = new ApiError(HttpStatus.NOT_FOUND, 'Exercise not found')
        expect(error).toBeInstanceOf(Error)
    })

    it('sets the message from the constructor', () => {
        const error = new ApiError(HttpStatus.BAD_REQUEST, 'Bad Content')
        expect(error.message).toBe('Bad Content')
    })

    it('defaults the name to "ApiError"', () => {
        const error = new ApiError(HttpStatus.NOT_FOUND, 'Exercise not found')
        expect(error.name).toBe('ApiError')
    })

    it.each([
        [HttpStatus.BAD_REQUEST, 'Bad request'],
        [HttpStatus.UNAUTHORIZED, 'Unauthorized'],
        [HttpStatus.FORBIDDEN, 'Forbidden'],
        [HttpStatus.NOT_FOUND, 'Not found'],
        [HttpStatus.CONFLICT, 'Conflict'],
        [HttpStatus.INTERNAL_SERVER_ERROR, 'Internal error'],
    ])('carries the correct status code %i', (status, message) => {
        const error = new ApiError(status, message)
        expect(error.status).toBe(status)
        expect(error.status).toBeTypeOf('number')
    })

    it('is catchable as an Error via throw', () => {
        let caught: unknown
        try {
            throw new ApiError(HttpStatus.NOT_FOUND, 'Exercise not found')
        } catch (err) {
            caught = err
        }
        expect(caught).toBeInstanceOf(ApiError)
        expect((caught as ApiError).status).toBe(HttpStatus.NOT_FOUND)
        expect((caught as ApiError).message).toBe('Exercise not found')
    })
})
