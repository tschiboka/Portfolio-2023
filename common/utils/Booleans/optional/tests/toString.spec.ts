import { describe, it, expect } from 'vitest'
import { toString } from '..'
import type { Optional } from '../../../Generics'

describe('Booleans.Optional.toString', () => {
    it.each<[boolean, Optional<string>]>([
        [true, 'true'],
        [false, undefined],
    ])('toString(%j) should return %j', (value, expected) => {
        expect(toString(value)).toBe(expected)
    })
})
