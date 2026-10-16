import { describe, it, expect } from 'vitest'
import { ResolveErrorMessage } from '../ResolveErrorMessage'

describe('ResolveErrorMessage', () => {
    it('returns a plain string unchanged', () => {
        expect(ResolveErrorMessage('Bad Content')).toBe('Bad Content')
        expect(ResolveErrorMessage('')).toBe('')
    })

    it('returns the message from an Error instance', () => {
        expect(ResolveErrorMessage(new Error('boom'))).toBe('boom')
        expect(ResolveErrorMessage(new TypeError('bad type'))).toBe('bad type')
        expect(ResolveErrorMessage(new Error(''))).toBe('')
    })

    it('extracts the first detail message from a validation result', () => {
        const result = {
            error: { details: [{ message: 'Name is required' }, { message: 'Ignored' }] },
        }
        expect(ResolveErrorMessage(result)).toBe('Name is required')
    })

    it('extracts the top-level error message when no details are present', () => {
        expect(ResolveErrorMessage({ error: { message: 'Invalid token' } })).toBe('Invalid token')
    })

    it('prefers the details message over the top-level message', () => {
        const result = {
            error: { details: [{ message: 'From details' }], message: 'From summary' },
        }
        expect(ResolveErrorMessage(result)).toBe('From details')
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
        expect(() => ResolveErrorMessage(input)).toThrow(
            'ResolveErrorMessage: expected a string, an Error, or a validation result',
        )
    })

    it('throws for a validation result with details but no message on the item', () => {
        expect(() => ResolveErrorMessage({ error: { details: [{ other: 'x' }] } })).toThrow()
    })

    it('only inspects the first detail (does not search later details)', () => {
        const result = { error: { details: [{ message: '' }, { message: 'Found later' }] } }
        expect(() => ResolveErrorMessage(result)).toThrow(
            'ResolveErrorMessage: expected a string, an Error, or a validation result',
        )
    })

    it('throws when the first detail entry is null even if a later one is valid', () => {
        const result = { error: { details: [null, { message: 'Found later' }] } }
        expect(() => ResolveErrorMessage(result)).toThrow()
    })
})
