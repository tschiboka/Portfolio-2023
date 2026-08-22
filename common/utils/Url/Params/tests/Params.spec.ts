import { describe, it, expect } from 'vitest'
import type { Optional } from '../../../Generics'
import { Params } from '../Params'

describe('Params.build', () => {
    it.each<[Optional<string>, string, string]>([
        // [namespace, key, expected]
        [undefined, 'key', 'key'],
        ['', 'key', 'key'],
        ['namespace', 'key', 'namespace.key'],
        ['namespace', '', 'namespace.'],
        ['a', 'b', 'a.b'],
    ])('build(%j, %j) should return %j', (namespace, key, expected) => {
        expect(Params.build(namespace, key)).toBe(expected)
    })
})

describe('Params.setIfDifferent', () => {
    it('returns a copy with the namespaced key set when the value differs from the fallback', () => {
        const base = new URLSearchParams()
        const result = Params.setIfDifferent(base, 'ns', 'page', '3', '1')
        expect(result.get('ns.page')).toBe('3')
        expect(base.get('ns.page')).toBeNull() // input is not mutated
    })

    it('returns a copy with the key removed when the value equals the fallback', () => {
        const base = new URLSearchParams({ 'ns.page': '1' })
        const result = Params.setIfDifferent(base, 'ns', 'page', '1', '1')
        expect(result.get('ns.page')).toBeNull()
        expect(base.get('ns.page')).toBe('1') // input is not mutated
    })

    it('handles a missing namespace (root key)', () => {
        const result = Params.setIfDifferent(new URLSearchParams(), undefined, 'dir', 'desc', 'asc')
        expect(result.get('dir')).toBe('desc')
    })
})

describe('Params.toQueryString', () => {
    it('serialises an object of params to a ?key=value string', () => {
        expect(Params.toQueryString({ a: '1', b: '2' })).toBe('?a=1&b=2')
    })

    it('URL-encodes values', () => {
        expect(Params.toQueryString({ q: 'x y' })).toBe('?q=x+y')
        expect(Params.toQueryString({ q: 'a&b' })).toBe('?q=a%26b')
    })

    it('returns an empty string for an empty object', () => {
        expect(Params.toQueryString({})).toBe('')
    })

    it('returns an empty string for undefined', () => {
        expect(Params.toQueryString(undefined)).toBe('')
    })

    it('preserves an empty-string value as a present-but-empty param', () => {
        expect(Params.toQueryString({ a: '' })).toBe('?a=')
    })

    it('preserves a zero (falsy) value', () => {
        expect(Params.toQueryString({ a: '0' })).toBe('?a=0')
    })
})
