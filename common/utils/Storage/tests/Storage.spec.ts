import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { Storage } from '../Storage'

describe('Storage', () => {
    const TEST_KEY = '__storage_test__'

    beforeEach(() => {
        localStorage.clear()
    })

    afterEach(() => {
        vi.restoreAllMocks()
    })

    describe('get', () => {
        it('should return null for a missing key', () => {
            expect(Storage.get(TEST_KEY)).toBeNull()
        })

        it('should return the parsed value for an existing key', () => {
            localStorage.setItem(TEST_KEY, JSON.stringify({ a: 1, b: 2 }))
            expect(Storage.get<{ a: number; b: number }>(TEST_KEY)).toEqual({ a: 1, b: 2 })
        })

        it('should return null for malformed JSON', () => {
            localStorage.setItem(TEST_KEY, '{ broken json')
            expect(Storage.get(TEST_KEY)).toBeNull()
        })
    })

    describe('set', () => {
        it('should store a serialised value', () => {
            Storage.set(TEST_KEY, { name: 'test', count: 42 })
            expect(localStorage.getItem(TEST_KEY)).toBe(JSON.stringify({ name: 'test', count: 42 }))
        })

        it('should overwrite an existing value', () => {
            Storage.set(TEST_KEY, 'first')
            Storage.set(TEST_KEY, 'second')
            expect(Storage.get(TEST_KEY)).toBe('second')
        })

        it('should store primitives correctly', () => {
            Storage.set(TEST_KEY, 123)
            expect(Storage.get<number>(TEST_KEY)).toBe(123)

            Storage.set(TEST_KEY, true)
            expect(Storage.get<boolean>(TEST_KEY)).toBe(true)

            Storage.set(TEST_KEY, null)
            expect(Storage.get<null>(TEST_KEY)).toBeNull()
        })
    })

    describe('remove', () => {
        it('should remove an existing key', () => {
            localStorage.setItem(TEST_KEY, 'value')
            Storage.remove(TEST_KEY)
            expect(localStorage.getItem(TEST_KEY)).toBeNull()
        })

        it('should not throw when removing a missing key', () => {
            expect(() => Storage.remove('nonexistent')).not.toThrow()
        })
    })

    describe('update', () => {
        it('should create a value when none exists', () => {
            const result = Storage.update<{ count: number }>(TEST_KEY, (prev) => ({
                count: (prev?.count ?? 0) + 1,
            }))
            expect(result).toEqual({ count: 1 })
            expect(Storage.get<{ count: number }>(TEST_KEY)).toEqual({ count: 1 })
        })

        it('should update an existing value', () => {
            Storage.set(TEST_KEY, { count: 1 })
            const result = Storage.update<{ count: number }>(TEST_KEY, (prev) => ({
                count: (prev?.count ?? 0) + 1,
            }))
            expect(result).toEqual({ count: 2 })
            expect(Storage.get<{ count: number }>(TEST_KEY)).toEqual({ count: 2 })
        })

        it('should return the new value', () => {
            Storage.set(TEST_KEY, 'before')
            const result = Storage.update<string>(TEST_KEY, () => 'after')
            expect(result).toBe('after')
        })
    })

    describe('graceful degradation', () => {
        it('should not throw when localStorage.setItem fails (quota exceeded)', () => {
            vi.spyOn(localStorage, 'setItem').mockImplementationOnce(() => {
                throw new Error('QuotaExceededError')
            })
            expect(() => Storage.set(TEST_KEY, 'value')).not.toThrow()
        })

        it('should not throw when localStorage.getItem fails', () => {
            vi.spyOn(localStorage, 'getItem').mockImplementationOnce(() => {
                throw new Error('Storage unavailable')
            })
            expect(() => Storage.get(TEST_KEY)).not.toThrow()
            expect(Storage.get(TEST_KEY)).toBeNull()
        })

        it('should not throw when localStorage.removeItem fails', () => {
            vi.spyOn(localStorage, 'removeItem').mockImplementationOnce(() => {
                throw new Error('Storage unavailable')
            })
            expect(() => Storage.remove(TEST_KEY)).not.toThrow()
        })
    })
})
