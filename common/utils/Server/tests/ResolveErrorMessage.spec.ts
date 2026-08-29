import { describe, it, expect } from 'vitest'
import { resolveErrorMessage } from '../ResolveErrorMessage'

describe('resolveErrorMessage', () => {
    it('returns a plain string unchanged', () => {
        expect(resolveErrorMessage('Bad Content')).toBe('Bad Content')
        expect(resolveErrorMessage('')).toBe('')
    })

    it('returns the message from an Error instance', () => {
        expect(resolveErrorMessage(new Error('boom'))).toBe('boom')
        expect(resolveErrorMessage(new TypeError('bad type'))).toBe('bad type')
        expect(resolveErrorMessage(new Error(''))).toBe('')
    })

    it('extracts the first detail message from a validation result', () => {
        const result = {
            error: { details: [{ message: 'Name is required' }, { message: 'Ignored' }] },
        }
        expect(resolveErrorMessage(result)).toBe('Name is required')
    })

    it('extracts the top-level error message when no details are present', () => {
        expect(resolveErrorMessage({ error: { message: 'Invalid token' } })).toBe('Invalid token')
    })

    it('prefers the details message over the top-level message', () => {
        const result = {
            error: { details: [{ message: 'From details' }], message: 'From summary' },
        }
        expect(resolveErrorMessage(result)).toBe('From details')
    })

    it.each([
        ['null', null],
        ['undefined', undefined],
        ['a number', 42],
        ['a boolean', true],
        ['an empty object', {}],
        ['an object without error', { foo: 'bar' }],
        ['an error with empty message', { error: { message: '' } }],
        ['details with empty message', { error: { details: [{ message: '' }] } }],
    ])('throws for %s with no extractable message', (_label, input) => {
        expect(() => resolveErrorMessage(input)).toThrow(
            'resolveErrorMessage: expected a string, an Error, or a validation result',
        )
    })

    it('throws for a validation result with details but no message on the item', () => {
        expect(() => resolveErrorMessage({ error: { details: [{ other: 'x' }] } })).toThrow()
    })

    it('only inspects the first detail (does not search later details)', () => {
        const result = { error: { details: [{ message: '' }, { message: 'Found later' }] } }
        expect(() => resolveErrorMessage(result)).toThrow(
            'resolveErrorMessage: expected a string, an Error, or a validation result',
        )
    })

    it('throws when the first detail entry is null even if a later one is valid', () => {
        const result = { error: { details: [null, { message: 'Found later' }] } }
        expect(() => resolveErrorMessage(result)).toThrow()
    })
})
