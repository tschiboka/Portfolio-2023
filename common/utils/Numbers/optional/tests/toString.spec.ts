import { describe, it, expect } from 'vitest'
import type { Nullish, Optional } from '../../../Generics'
import { toString } from '../toString'

describe('Numbers.Optional.toString', () => {
    it.each<[Nullish<number>, Optional<string>]>([
        [42, '42'],
        [0, '0'],
        [-0, '0'],
        [3.14, '3.14'],
        [-3.14, '-3.14'],
        [-7, '-7'],
        [Infinity, 'Infinity'],
        [-Infinity, '-Infinity'],
        [NaN, undefined],
        [null, undefined],
        [undefined, undefined],
    ])('toString(%j) should return %j', (value, expected) => {
        expect(toString(value)).toBe(expected)
    })
})
