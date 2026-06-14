import { describe, it, expect } from 'vitest'
import { Numbers } from '../Numbers'

describe('Numbers.truncateTo', () => {
    it.each<[number, number, number]>([
        [3.14159, 2, 3.14],
        [3.14159, 4, 3.1415],
        [3.1, 2, 3.1],
        [3, 2, 3],
        [0, 2, 0],
        [0.001, 2, 0],
        [0.999, 2, 0.99],
        [-3.14159, 2, -3.14],
        [-3.14159, 4, -3.1415],
        [-0.001, 2, -0],
        [999.9999, 2, 999.99],
        [1.005, 2, 1],
    ])('truncateTo(%p, %p) should return %p', (value, places, expected) => {
        expect(Numbers.truncateTo(value, places)).toBe(expected)
    })
})
