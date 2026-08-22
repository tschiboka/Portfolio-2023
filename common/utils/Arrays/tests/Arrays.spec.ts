import { describe, it, expect } from 'vitest'
import { Arrays } from '../Arrays'

describe('Arrays.shuffleArray', () => {
    it('should return an array of the same length', () => {
        const input = [1, 2, 3, 4, 5]
        const result = Arrays.shuffleArray(input)
        expect(result).toHaveLength(input.length)
    })

    it('should contain all the same elements', () => {
        const input = [1, 2, 3, 4, 5]
        const result = Arrays.shuffleArray(input)
        expect(result.sort()).toEqual(input.sort())
    })

    it('should not mutate the original array', () => {
        const input = [1, 2, 3, 4, 5]
        const original = [...input]
        Arrays.shuffleArray(input)
        expect(input).toEqual(original)
    })

    it('should return a new array reference', () => {
        const input = [1, 2, 3, 4, 5]
        const result = Arrays.shuffleArray(input)
        expect(result).not.toBe(input)
    })

    it('should handle an empty array', () => {
        const input: number[] = []
        const result = Arrays.shuffleArray(input)
        expect(result).toEqual([])
    })

    it('should handle a single-element array', () => {
        const input = [42]
        const result = Arrays.shuffleArray(input)
        expect(result).toEqual([42])
    })

    it('should handle an array of strings', () => {
        const input = ['a', 'b', 'c', 'd']
        const result = Arrays.shuffleArray(input)
        expect(result).toHaveLength(input.length)
        expect(result.sort()).toEqual(input.sort())
    })

    it('should handle an array of objects', () => {
        const input = [{ id: 1 }, { id: 2 }, { id: 3 }]
        const result = Arrays.shuffleArray(input)
        expect(result).toHaveLength(input.length)
        expect(result).toEqual(expect.arrayContaining(input))
    })

    it('should produce a uniformly distributed permutation over many runs', () => {
        const input = [1, 2, 3, 4]
        const runs = 10_000
        const counts = new Map<string, number>()

        for (let i = 0; i < runs; i++) {
            const key = Arrays.shuffleArray(input).join(',')
            counts.set(key, (counts.get(key) ?? 0) + 1)
        }

        const totalPermutations = 24 // 4!
        const expected = runs / totalPermutations
        const tolerance = expected * 0.5 // allow 50% deviation

        for (const count of counts.values()) {
            expect(count).toBeGreaterThan(expected - tolerance)
            expect(count).toBeLessThan(expected + tolerance)
        }
    })

    it('should produce different orderings (likely not the same as input)', () => {
        const input = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        // Run 20 times — at least one should differ from the original order
        const allSame = Arrays.times(20, () => Arrays.shuffleArray(input)).every(
            (result) => result.join(',') === input.join(','),
        )
        expect(allSame).toBe(false)
    })

    it('should handle duplicate values correctly', () => {
        const input = [1, 1, 2, 2, 3, 3]
        const result = Arrays.shuffleArray(input)
        expect(result).toHaveLength(input.length)
        expect(result.sort()).toEqual(input.sort())
    })
})

describe('Arrays.times', () => {
    it('builds an array of the given length', () => {
        expect(Arrays.times(3, (index) => index)).toEqual([0, 1, 2])
    })

    it('passes the 0-based index to the builder', () => {
        expect(Arrays.times(4, (index) => `h${index + 1}`)).toEqual(['h1', 'h2', 'h3', 'h4'])
    })

    it('returns an empty array for a count of 0', () => {
        expect(Arrays.times(0, (index) => index)).toEqual([])
    })

    it('builds heterogeneous values returned by the builder', () => {
        expect(Arrays.times(2, (index) => ({ key: index }))).toEqual([{ key: 0 }, { key: 1 }])
    })

    it('calls the builder exactly once per index', () => {
        const build = vi.fn((index: number) => index)
        Arrays.times(5, build)
        expect(build).toHaveBeenCalledTimes(5)
        expect(build).toHaveBeenNthCalledWith(1, 0)
        expect(build).toHaveBeenNthCalledWith(5, 4)
    })

    it('truncates a non-integer count down (ToLength)', () => {
        expect(Arrays.times(2.9, (index) => index)).toEqual([0, 1])
    })

    it('returns an empty array for a negative count (matches Array.from)', () => {
        expect(Arrays.times(-1, (index) => index)).toEqual([])
    })
})

describe('Arrays.random', () => {
    it('returns a single element from a single-element array', () => {
        expect(Arrays.random([42])).toBe(42)
    })

    it('returns an element that is present in the array', () => {
        const input = ['a', 'b', 'c', 'd']
        const result = Arrays.random(input)
        expect(input).toContain(result)
    })

    it('does not mutate the input array', () => {
        const input = [1, 2, 3, 4, 5]
        const original = [...input]
        Arrays.random(input)
        expect(input).toEqual(original)
    })

    it('handles an array of objects', () => {
        const input = [{ id: 1 }, { id: 2 }, { id: 3 }]
        const result = Arrays.random(input)
        expect(input).toContain(result)
    })

    it('can return any of multiple elements over many runs', () => {
        const input = [1, 2, 3]
        const seen = new Set<number>()
        for (let i = 0; i < 100; i++) {
            seen.add(Arrays.random(input) as number)
        }
        // Over 100 draws from 3 values, we expect to hit all of them.
        expect(seen.size).toBe(3)
    })

    it('returns undefined for an empty array', () => {
        expect(Arrays.random([])).toBeUndefined()
    })
})

describe('Arrays.unique', () => {
    it('removes duplicate primitives preserving first-seen order', () => {
        expect(Arrays.unique(['a', 'b', 'a', 'c', 'b'])).toEqual(['a', 'b', 'c'])
        expect(Arrays.unique([1, 1, 2, 3, 3, 2])).toEqual([1, 2, 3])
    })

    it('returns the input unchanged when already unique', () => {
        expect(Arrays.unique([1, 2, 3])).toEqual([1, 2, 3])
    })

    it('returns an empty array for an empty input', () => {
        expect(Arrays.unique([])).toEqual([])
    })

    it('handles a single-element array', () => {
        expect(Arrays.unique([42])).toEqual([42])
    })

    it('does not mutate the input array', () => {
        const input = ['a', 'b', 'a']
        const original = [...input]
        Arrays.unique(input)
        expect(input).toEqual(original)
    })

    it('returns a new array reference', () => {
        const input = [1, 2]
        expect(Arrays.unique(input)).not.toBe(input)
    })

    it('deduplicates objects by reference identity', () => {
        const a = { id: 1 }
        const b = { id: 2 }
        expect(Arrays.unique([a, b, a])).toEqual([a, b])
        expect(Arrays.unique([a, { id: 1 }])).toHaveLength(2)
    })

    it('handles mixed duplicate runs', () => {
        expect(Arrays.unique([1, 1, 1, 2, 1])).toEqual([1, 2])
    })

    it('deduplicates NaN (SameValueZero, unlike indexOf)', () => {
        expect(Arrays.unique([NaN, NaN])).toEqual([NaN])
    })

    it('treats 0 and -0 as the same (SameValueZero)', () => {
        expect(Arrays.unique([0, -0])).toEqual([0])
    })

    it('preserves undefined and null as distinct elements', () => {
        expect(Arrays.unique([undefined, undefined, null])).toEqual([undefined, null])
    })

    it('keeps equal-looking values of different types distinct', () => {
        expect(Arrays.unique([1, '1', true])).toEqual([1, '1', true])
    })

    it('preserves falsy values without coercion', () => {
        expect(Arrays.unique([0, false, '', null, undefined])).toEqual([
            0,
            false,
            '',
            null,
            undefined,
        ])
    })
})
