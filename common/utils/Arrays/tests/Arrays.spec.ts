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
        const allSame = Array.from({ length: 20 }, () => Arrays.shuffleArray(input)).every(
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
