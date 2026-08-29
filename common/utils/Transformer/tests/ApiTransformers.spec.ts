import { describe, it, expect } from 'vitest'
import type { EmptyObject } from '../../Generics'
import { ApiTransformers } from '../ApiTransformers'

/** Duck-typed Mongo ObjectId (its toString() is a 24-char hex string) — no mongoose dep in tests. */
const objectId = (hex: string) => ({ toString: () => hex })

type TestResource = {
    _id: string
    name: string
    ownerId?: string
    tags: string[]
}

describe('ApiTransformers.toApiResource', () => {
    it('converts a top-level ObjectId id to a string', () => {
        const doc = { toObject: () => ({ _id: objectId('64b000000000000000000000') }) }
        const result = ApiTransformers.toApiResource<{ _id: string }>(doc)
        expect(result._id).toBe('64b000000000000000000000')
    })

    it('recursively converts ObjectIds in arrays', () => {
        const doc = { toObject: () => ({ tags: [objectId('64b111111111111111111111'), 'plain'] }) }
        const result = ApiTransformers.toApiResource<{ tags: string[] }>(doc)
        expect(result.tags).toEqual(['64b111111111111111111111', 'plain'])
    })

    it('recursively converts ObjectIds in nested objects', () => {
        const doc = {
            toObject: () => ({ a: { id: objectId('64c222222222222222222222') } }),
        }
        const result = ApiTransformers.toApiResource<{ a: { id: string } }>(doc)
        expect(result.a.id).toBe('64c222222222222222222222')
    })

    it('strips __v and __t version keys', () => {
        const doc = { toObject: () => ({ name: 'push', __v: 0, __t: 'x' }) }
        const result = ApiTransformers.toApiResource<{ name: string }>(doc)
        expect(result).toEqual({ name: 'push' })
    })

    it('leaves an already-string id unchanged', () => {
        const doc = { toObject: () => ({ _id: 'already-a-string' }) }
        const result = ApiTransformers.toApiResource<{ _id: string }>(doc)
        expect(result._id).toBe('already-a-string')
    })

    it('passes primitives and null/undefined through', () => {
        const doc = { toObject: () => ({ a: 1, b: null, c: undefined, d: true, e: 'x' }) }
        const result = ApiTransformers.toApiResource<{
            a: number
            b: null
            c?: string
            d: boolean
            e: string
        }>(doc)
        expect(result).toEqual({ a: 1, b: null, c: undefined, d: true, e: 'x' })
    })

    it('converts a full document including ownerId and entries', () => {
        const doc = {
            toObject: () => ({
                _id: objectId('64d333333333333333333333'),
                name: 'Push Day',
                source: 'user',
                ownerId: objectId('64e444444444444444444444'),
                entries: [{ exerciseId: objectId('64f555555555555555555555'), order: 1 }],
            }),
        }
        const result = ApiTransformers.toApiResource<TestResource>(doc)
        expect(result._id).toBe('64d333333333333333333333')
        expect(result.name).toBe('Push Day')
        expect(result.ownerId).toBe('64e444444444444444444444')
    })

    it('strips __v and __t at nested levels too', () => {
        const doc = {
            toObject: () => ({ nested: { __v: 2, __t: 'x', name: 'inner' } }),
        }
        const result = ApiTransformers.toApiResource<{ nested: { name: string } }>(doc)
        expect(result).toEqual({ nested: { name: 'inner' } })
    })

    it('converts a bare ObjectId returned at the root', () => {
        const doc = { toObject: () => objectId('64a000000000000000000000') }
        const result = ApiTransformers.toApiResource<unknown>(doc)
        expect(result).toBe('64a000000000000000000000')
    })

    it('leaves an empty object as {}', () => {
        const doc = { toObject: () => ({}) }
        const result = ApiTransformers.toApiResource<EmptyObject>(doc)
        expect(result).toEqual({})
    })

    it('matches any object whose toString is 24-hex, by design (duck typing)', () => {
        // Not a real ObjectId, but stringifies identically — the util matches on form, not type.
        const fake = { toString: () => '64a000000000000000000000', notAnId: true }
        const doc = { toObject: () => fake }
        expect(ApiTransformers.toApiResource<string>(doc)).toBe('64a000000000000000000000')
    })

    it('passes null/undefined array elements through', () => {
        const doc = { toObject: () => [null, undefined, 1] }
        expect(ApiTransformers.toApiResource<unknown[]>(doc)).toEqual([null, undefined, 1])
    })

    it('mangles a Buffer-like binary object into its numeric-index entries (documented behaviour)', () => {
        const buffer = { 0: 1, 1: 2, length: 2 }
        const doc = { toObject: () => buffer }
        const result = ApiTransformers.toApiResource<unknown>(doc)
        // isObject(Buffer) is true → recurses into numeric keys; not ObjectId, so left as-is.
        expect(result).toEqual({ 0: 1, 1: 2, length: 2 })
    })
})
