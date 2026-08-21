import { describe, it, expect } from 'vitest'
import type { Nullish } from '../../../Generics'
import { toBoolean } from '../toBoolean'

describe('Booleans.Optional.toBoolean', () => {
    it.each<[Nullish<string>, boolean]>([
        ['true', true],
        ['false', false],
        ['', false],
        ['TRUE', false],
        ['true ', false],
        [null, false],
        [undefined, false],
    ])('toBoolean(%j) should return %j', (value, expected) => {
        expect(toBoolean(value)).toBe(expected)
    })
})
