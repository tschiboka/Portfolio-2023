import { describe, it, expect } from 'vitest'
import { extractEntities } from '../extractEntities'

describe('Query.extractEntities', () => {
    it('returns the entity collection stored under the key', () => {
        const body = {
            difficulties: [
                { value: 'beginner', label: 'Beginner' },
                { value: 'intermediate', label: 'Intermediate' },
            ],
        }
        expect(extractEntities(body, 'difficulties')).toEqual(body.difficulties)
    })

    it('returns an empty array when the key is absent', () => {
        const body = { difficulties: [] as { value: string }[] }
        expect(extractEntities(body, 'missing')).toEqual([])
    })

    it('returns an empty array when the body is undefined', () => {
        expect(extractEntities(undefined, 'difficulties')).toEqual([])
    })

    it('returns an empty array when the body is null', () => {
        expect(extractEntities(null, 'difficulties')).toEqual([])
    })

    it('returns an empty array when the value under the key is an empty array', () => {
        const body = { equipment: [] as { value: string }[] }
        expect(extractEntities(body, 'equipment')).toEqual([])
    })

    it('works with any entity shape', () => {
        const body = { exercises: [{ _id: '1' }, { _id: '2' }] }
        expect(extractEntities(body, 'exercises')).toEqual([{ _id: '1' }, { _id: '2' }])
    })
})
