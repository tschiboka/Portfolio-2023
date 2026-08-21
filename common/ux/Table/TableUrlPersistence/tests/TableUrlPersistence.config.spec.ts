import { describe, it, expect } from 'vitest'
import type { FilterConfig } from '../../TableFilterConfig'
import { buildCodec } from '../TableUrlPersistence.config'

describe('buildCodec', () => {
    it('resolves string codecs (text/search/date/option) to the same string behavior', () => {
        for (const type of ['text', 'search', 'date', 'option'] as const) {
            const codec = buildCodec({ type, label: type } as FilterConfig)
            expect(codec.encode('  hi  ')).toBe('hi')
            expect(codec.encode('')).toBeUndefined()
            expect(codec.decode(null)).toBeUndefined()
        }
    })

    it('resolves a number codec that encodes to string and decodes to number', () => {
        const codec = buildCodec({ type: 'number', label: 'count' })
        expect(codec.encode(42)).toBe('42')
        expect(codec.encode(NaN)).toBeUndefined()
        expect(codec.decode('3.14')).toBe(3.14)
        expect(codec.decode('abc')).toBeUndefined()
    })

    it('resolves a checkbox codec to boolean', () => {
        const codec = buildCodec({ type: 'checkbox', label: 'active' })
        expect(codec.encode(true)).toBe('true')
        expect(codec.encode(false)).toBeUndefined()
        expect(codec.decode('true')).toBe(true)
        expect(codec.decode(null)).toBe(false)
    })

    it('uses a config encode override, falling back to the type default for decode', () => {
        const encode = () => 'OVERRIDE'
        const codec = buildCodec({ type: 'text', label: 'p', encode })
        expect(codec.encode('anything')).toBe('OVERRIDE')
        expect(codec.decode('hi')).toBe('hi')
    })

    it('uses a config decode override, falling back to the type default for encode', () => {
        const decode = () => 'OVERRIDE'
        const codec = buildCodec({ type: 'text', label: 'p', decode })
        expect(codec.encode('  hi  ')).toBe('hi')
        expect(codec.decode('anything')).toBe('OVERRIDE')
    })

    it('uses both encode and decode overrides when provided', () => {
        const encode = () => 'E'
        const decode = () => 'D'
        const codec = buildCodec({ type: 'number', label: 'n', encode, decode })
        expect(codec.encode(5)).toBe('E')
        expect(codec.decode('5')).toBe('D')
    })
})
