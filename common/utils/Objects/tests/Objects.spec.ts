import { describe, it, expect } from 'vitest'
import { Objects } from '../Objects'

describe('Objects.fromEntries', () => {
    it('builds an object identical to Object.fromEntries', () => {
        expect(
            Objects.fromEntries([
                ['a', 1],
                ['b', 'two'],
            ]),
        ).toEqual({ a: 1, b: 'two' })
    })

    it('returns an empty object for no entries', () => {
        expect(Objects.fromEntries([])).toEqual({})
    })

    it('types the result as the caller-specified shape', () => {
        const filters = Objects.fromEntries<{ name: string }>([['name', 'ada']])
        expect(filters.name).toBe('ada')
    })
})

describe('Objects.pick', () => {
    it('picks an array of keys that have defined values', () => {
        expect(Objects.pick({ a: 1, b: 2, c: 3 }, ['a', 'c'])).toEqual({ a: 1, c: 3 })
    })

    it('picks a single key', () => {
        expect(Objects.pick({ a: 1, b: 2 }, 'a')).toEqual({ a: 1 })
    })

    it('omits keys whose value is undefined', () => {
        expect(Objects.pick({ a: 1, b: undefined }, ['a', 'b'])).toEqual({ a: 1 })
    })

    it('omits keys whose value is null', () => {
        expect(Objects.pick({ a: null, b: 2 }, ['a', 'b'])).toEqual({ b: 2 })
    })

    it('returns an empty object when no requested key has a value', () => {
        expect(Objects.pick({ a: undefined, b: null }, 'a')).toEqual({})
    })

    it('ignores keys not present on the source', () => {
        expect(Objects.pick({ a: 1 }, ['missing', 'a'])).toEqual({ a: 1 })
    })
})

describe('Objects.shallowEqual', () => {
    it('is true for identical objects', () => {
        expect(Objects.shallowEqual({ a: 1, b: 'x' }, { a: 1, b: 'x' })).toBe(true)
    })

    it('is true for two empty objects', () => {
        expect(Objects.shallowEqual({}, {})).toBe(true)
    })

    it('is false when a value differs', () => {
        expect(Objects.shallowEqual({ a: 1, b: 2 }, { a: 1, b: 3 })).toBe(false)
    })

    it('is false when key counts differ (extra key on one side)', () => {
        expect(Objects.shallowEqual({ a: 1 }, { a: 1, b: 2 })).toBe(false)
        expect(Objects.shallowEqual({ a: 1, b: 2 }, { a: 1 })).toBe(false)
    })

    it('compares primitive values only (no deep traversal)', () => {
        expect(Objects.shallowEqual({ a: [1, 2] }, { a: [1, 2] })).toBe(false)
    })

    it('is true regardless of key insertion order', () => {
        expect(Objects.shallowEqual({ a: 1, b: 2 }, { b: 2, a: 1 })).toBe(true)
    })

    it('is true for equal undefined values', () => {
        expect(Objects.shallowEqual({ a: undefined }, { a: undefined })).toBe(true)
    })

    it('is false for undefined vs a defined value', () => {
        expect(Objects.shallowEqual({ a: undefined }, { a: 1 })).toBe(false)
    })

    it('is false for null vs undefined', () => {
        expect(Objects.shallowEqual({ a: null }, { a: undefined })).toBe(false)
    })

    it('is false for falsy-but-unequal values (false vs 0)', () => {
        expect(Objects.shallowEqual({ a: false }, { a: 0 })).toBe(false)
    })

    it('is false for NaN values (NaN !== NaN)', () => {
        expect(Objects.shallowEqual({ a: NaN }, { a: NaN })).toBe(false)
    })
})
