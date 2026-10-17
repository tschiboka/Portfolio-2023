import { describe, it, expect } from 'vitest'
import { trim } from '..'
import type { Nullish, Optional, Primitive } from '../../../Generics'

describe('Strings.Optional.trim', () => {
    it.each<[Nullish<Primitive>, Optional<string>]>([
        ['  hi  ', 'hi'],
        ['hi', 'hi'],
        ['', undefined],
        ['   ', undefined],
        [null, undefined],
        [undefined, undefined],
        [123, '123'],
    ])('trim(%j) should return %j', (value, expected) => {
        expect(trim(value)).toBe(expected)
    })
})
