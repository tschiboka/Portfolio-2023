import { describe, it, expect } from 'vitest'
import { Params } from '..'
import type { Optional } from '../../../Generics'

describe('Params.build', () => {
    it.each<[Optional<string>, string, string]>([
        // [namespace, key, expected]
        [undefined, 'key', 'key'],
        ['', 'key', 'key'],
        ['namespace', 'key', 'namespace.key'],
        ['namespace', '', 'namespace.'],
        ['a', 'b', 'a.b'],
    ])('should return %j for build(%j, %j)', (namespace, key, expected) => {
        expect(Params.build(namespace, key)).toBe(expected)
    })
})

describe('Params.setIfDifferent', () => {
    it('should return a copy with the namespaced key set when the value differs from the fallback', () => {
        const base = new URLSearchParams()
        const result = Params.setIfDifferent(base, 'ns', 'page', '3', '1')
        expect(result.get('ns.page')).toBe('3')
        expect(base.get('ns.page')).toBeNull() // input is not mutated
    })

    it('should return a copy with the key removed when the value equals the fallback', () => {
        const base = new URLSearchParams({ 'ns.page': '1' })
        const result = Params.setIfDifferent(base, 'ns', 'page', '1', '1')
        expect(result.get('ns.page')).toBeNull()
        expect(base.get('ns.page')).toBe('1') // input is not mutated
    })

    it('should handle a missing namespace (root key)', () => {
        const result = Params.setIfDifferent(new URLSearchParams(), undefined, 'dir', 'desc', 'asc')
        expect(result.get('dir')).toBe('desc')
    })
})

describe('Params.toQueryString', () => {
    it('should serialise an object of params to a ?key=value string', () => {
        expect(Params.toQueryString({ a: '1', b: '2' })).toBe('?a=1&b=2')
    })

    it('should URL-encode values', () => {
        expect(Params.toQueryString({ q: 'x y' })).toBe('?q=x+y')
        expect(Params.toQueryString({ q: 'a&b' })).toBe('?q=a%26b')
    })

    it('should return an empty string for an empty object', () => {
        expect(Params.toQueryString({})).toBe('')
    })

    it('should return an empty string for undefined', () => {
        expect(Params.toQueryString(undefined)).toBe('')
    })

    it('should preserve an empty-string value as a present-but-empty param', () => {
        expect(Params.toQueryString({ a: '' })).toBe('?a=')
    })

    it('should preserve a zero (falsy) value', () => {
        expect(Params.toQueryString({ a: '0' })).toBe('?a=0')
    })
})
