import { describe, it, expect } from 'vitest'
import { toUndefined } from '../toUndefined'
import type { Nullish, Optional } from '../../../Generics'

describe('Strings.Optional.toUndefined', () => {
    it.each<[Nullish<string>, Optional<string>]>([
        ['hi', 'hi'],
        ['0', '0'],
        ['', undefined],
        ['   ', '   '],
        [null, undefined],
        [undefined, undefined],
    ])('toUndefined(%j) should return %j', (value, expected) => {
        expect(toUndefined(value)).toBe(expected)
    })
})
