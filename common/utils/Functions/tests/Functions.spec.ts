import { describe, it, expect } from 'vitest'
import { Functions, noop } from '../Functions'

describe('Functions.noop', () => {
    it('returns undefined', () => {
        expect(Functions.noop()).toBeUndefined()
    })

    it('accepts any number of arguments', () => {
        expect(() => Functions.noop('a', 1, { x: true })).not.toThrow()
        expect(Functions.noop(1, 2, 3)).toBeUndefined()
    })

    it('is assignable to typed void callbacks', () => {
        const handler: (pageNumber: number) => void = noop
        expect(handler(3)).toBeUndefined()
    })
})
