import { describe, it, expect } from 'vitest'
import { Numbers } from '../../Numbers'

describe('Numbers.Counter.format', () => {
    it.each<[number, string]>([
        // zero / non-positive
        [0, '0'],
        [-1, '0'],
        [-1000, '0'],

        // below 1K — raw number
        [1, '1'],
        [999, '999'],

        // K range
        [1000, '1K'],
        [1500, '1.5K'],
        [1999, '1.9K'],
        [10000, '10K'],
        [999999, '999.9K'],

        // M range
        [1000000, '1M'],
        [1500000, '1.5M'],
        [999999999, '999.9M'],

        // B range
        [1000000000, '1B'],
        [1500000000, '1.5B'],
        [999999999999, '999.9B'],

        // T range
        [1000000000000, '1T'],
        [1500000000000, '1.5T'],
        [999999999999999, '999.9T'],

        // overflow
        [1e15, '999T+'],
        [1e18, '999T+'],

        // truncation (not rounding)
        [1999, '1.9K'],
        [1990000, '1.9M'],

        // decimal input — floors first
        [1999.9, '1.9K'],
    ])('format(%p) should return %p', (input, expected) => {
        expect(Numbers.Counter.format(input)).toBe(expected)
    })
})
