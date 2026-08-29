import { describe, it, expect } from 'vitest'
import { ApiResponder } from '../ApiResponder'
import { ApiError } from '../ApiError'
import { HttpStatus } from '../HttpStatus'
import { createResponse } from './ApiResponder.spec.utils'

describe('ApiResponder error methods', () => {
    it('badRequest produces a 400 ApiError from a string', () => {
        const result = ApiResponder.badRequest('Bad Content')
        expect(result).toBeInstanceOf(ApiError)
        expect(result.status).toBe(HttpStatus.BAD_REQUEST)
        expect(result.message).toBe('Bad Content')
    })

    it('badRequest extracts a message from a validation result', () => {
        const result = ApiResponder.badRequest({
            error: { details: [{ message: 'Name is required' }] },
        })
        expect(result.status).toBe(HttpStatus.BAD_REQUEST)
        expect(result.message).toBe('Name is required')
    })

    it('badRequest extracts a message from an Error instance', () => {
        const result = ApiResponder.badRequest(new Error('boom'))
        expect(result.status).toBe(HttpStatus.BAD_REQUEST)
        expect(result.message).toBe('boom')
    })

    it('badRequest extracts the summary message when no details are present', () => {
        const result = ApiResponder.badRequest({ error: { message: 'Invalid token' } })
        expect(result.message).toBe('Invalid token')
    })

    it('badRequest carries an empty message for an empty string', () => {
        const result = ApiResponder.badRequest('')
        expect(result.status).toBe(HttpStatus.BAD_REQUEST)
        expect(result.message).toBe('')
    })

    it.each([
        ['null', null],
        ['a number', 42],
        ['a boolean', true],
    ])('badRequest throws when it cannot extract a message from %s', (_label, input) => {
        expect(() => ApiResponder.badRequest(input)).toThrow(
            'resolveErrorMessage: expected a string, an Error, or a validation result',
        )
    })

    it('notFound produces a 404 with capitalised resource wording', () => {
        const result = ApiResponder.notFound('exercise')
        expect(result).toBeInstanceOf(ApiError)
        expect(result.status).toBe(HttpStatus.NOT_FOUND)
        expect(result.message).toBe('Exercise not found')
    })

    it('invalidId produces a 400 with "Invalid <resource> id"', () => {
        const result = ApiResponder.invalidId('exercise')
        expect(result).toBeInstanceOf(ApiError)
        expect(result.status).toBe(HttpStatus.BAD_REQUEST)
        expect(result.message).toBe('Invalid exercise id')
    })
})

describe('ApiResponder fixed-word error methods', () => {
    it('forbidden', () => {
        const result = ApiResponder.forbidden()
        expect(result).toBeInstanceOf(ApiError)
        expect(result.status).toBe(HttpStatus.FORBIDDEN)
        expect(result.message).toBe('Forbidden: access denied!')
    })

    it('unauthorized', () => {
        const result = ApiResponder.unauthorized('Token expired!')
        expect(result).toBeInstanceOf(ApiError)
        expect(result.status).toBe(HttpStatus.UNAUTHORIZED)
        expect(result.message).toBe('Token expired!')
    })

    it('conflict', () => {
        const result = ApiResponder.conflict('Already exists')
        expect(result).toBeInstanceOf(ApiError)
        expect(result.status).toBe(HttpStatus.CONFLICT)
        expect(result.message).toBe('Already exists')
    })

    it('internalServerError defaults to the standard message', () => {
        const result = ApiResponder.internalServerError()
        expect(result).toBeInstanceOf(ApiError)
        expect(result.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR)
        expect(result.message).toBe('Internal Server Error')
    })

    it('internalServerError accepts an override message', () => {
        const result = ApiResponder.internalServerError('boom')
        expect(result.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR)
        expect(result.message).toBe('boom')
    })
})

describe('ApiResponder success methods', () => {
    it('ok emits 200 with the object flat (no wrapper)', () => {
        const { captured, response } = createResponse()
        const returned = ApiResponder.ok(response, { routines: [] })
        expect(returned).toBe(response)
        expect(captured.statusCode).toBe(HttpStatus.OK)
        expect(captured.body).toEqual({ routines: [] })
    })

    it('ok emits the object without a `success` or `data` key', () => {
        const { captured, response } = createResponse()
        ApiResponder.ok(response, { items: [1, 2] })
        expect(captured.body).toEqual({ items: [1, 2] })
        expect('success' in (captured.body as object)).toBe(false)
        expect('data' in (captured.body as object)).toBe(false)
    })

    it('ok emits an empty object as `{}`', () => {
        const { captured, response } = createResponse()
        ApiResponder.ok(response, {})
        expect(captured.statusCode).toBe(HttpStatus.OK)
        expect(captured.body).toEqual({})
    })

    it('created returns the response for chaining', () => {
        const { response } = createResponse()
        const returned = ApiResponder.created(response)
        expect(returned).toBe(response)
    })

    it('created emits 201 with the payload when provided', () => {
        const { captured, response } = createResponse()
        ApiResponder.created(response, { id: 1 })
        expect(captured.statusCode).toBe(HttpStatus.CREATED)
        expect(captured.body).toEqual({ id: 1 })
    })

    it('created emits 201 with an empty object payload as `{}`', () => {
        const { captured, response } = createResponse()
        ApiResponder.created(response, {})
        expect(captured.statusCode).toBe(HttpStatus.CREATED)
        expect(captured.body).toEqual({})
    })

    it('created emits 201 with an empty body when no payload is given', () => {
        const { captured, response } = createResponse()
        ApiResponder.created(response)
        expect(captured.statusCode).toBe(HttpStatus.CREATED)
        expect(captured.sent).toBe(true)
        expect(captured.body).toBeUndefined()
    })

    it('text emits a plain string body with 200', () => {
        const { captured, response } = createResponse()
        ApiResponder.text(response, '<<<OK>>>')
        expect(captured.statusCode).toBe(HttpStatus.OK)
        expect(captured.body).toBe('<<<OK>>>')
    })
})
