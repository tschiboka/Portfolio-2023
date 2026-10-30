import { describe, it, expect } from 'vitest'
import { toNumber } from '..'
import type { Nullish, Optional } from '../../../Generics'

describe('Numbers.Optional.toNumber', () => {
    it.each<[Nullish<string>, Optional<number>]>([
        ['42', 42],
        ['  42  ', 42],
        ['3.14', 3.14],
        ['0', 0],
        ['-7', -7],
        ['', undefined],
        ['abc', undefined],
        [null, undefined],
        [undefined, undefined],
    ])('should return %j for toNumber(%j)', (value, expected) => {
        expect(toNumber(value)).toBe(expected)
    })
})
