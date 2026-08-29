import { describe, it, expect } from 'vitest'
import { Paging } from '../Paging'

describe('Paging.parse', () => {
    it('falls back to shared defaults when params are absent', () => {
        expect(Paging.parse(undefined, undefined)).toEqual({ pageNumber: 1, limit: 10, skip: 0 })
    })

    it('parses valid page and size', () => {
        expect(Paging.parse('2', '25')).toEqual({ pageNumber: 2, limit: 25, skip: 25 })
    })

    it('clamps pageNumber to the minimum', () => {
        expect(Paging.parse('0', '10', { pageNumberMin: 1 })).toEqual({
            pageNumber: 1,
            limit: 10,
            skip: 0,
        })
    })

    it('clamps pageSize within min/max bounds', () => {
        expect(Paging.parse('1', '5', { pageSizeMin: 1, pageSizeMax: 100 })).toEqual({
            pageNumber: 1,
            limit: 5,
            skip: 0,
        })
        expect(Paging.parse('1', '150', { pageSizeMin: 1, pageSizeMax: 100 })).toEqual({
            pageNumber: 1,
            limit: 100,
            skip: 0,
        })
        expect(Paging.parse('1', '0', { pageSizeMin: 1, pageSizeMax: 100 })).toEqual({
            pageNumber: 1,
            limit: 1,
            skip: 0,
        })
    })

    it('falls back to defaults for non-digit params', () => {
        expect(Paging.parse('abc', 'xyz')).toEqual({ pageNumber: 1, limit: 10, skip: 0 })
        expect(Paging.parse('', '')).toEqual({ pageNumber: 1, limit: 10, skip: 0 })
    })

    it('returns the default (not a clamp) for present-but-garbage strings', () => {
        // `isDigits` rejects these, so they fall back rather than being clamped to the minimum.
        expect(Paging.parse('-1', '10', { pageNumberMin: 1 })).toEqual({
            pageNumber: 1,
            limit: 10,
            skip: 0,
        })
        expect(Paging.parse('2.5', '10')).toEqual({ pageNumber: 1, limit: 10, skip: 0 })
        expect(Paging.parse('+2', '10')).toEqual({ pageNumber: 1, limit: 10, skip: 0 })
        expect(Paging.parse(' 2', '10')).toEqual({ pageNumber: 1, limit: 10, skip: 0 })
    })

    it('respects custom defaultPageNumber and defaultPageSize', () => {
        expect(
            Paging.parse(undefined, undefined, { defaultPageNumber: 3, defaultPageSize: 25 }),
        ).toEqual({ pageNumber: 3, limit: 25, skip: 50 })
    })

    it('leaves pageSize unbounded when no max is given', () => {
        expect(Paging.parse('1', '999999')).toEqual({ pageNumber: 1, limit: 999999, skip: 0 })
    })

    it('clamps pageSize to a custom minimum > 1', () => {
        expect(Paging.parse('1', '5', { pageSizeMin: 10 })).toEqual({
            pageNumber: 1,
            limit: 10,
            skip: 0,
        })
    })
})

describe('Paging.toMeta', () => {
    it('builds PageMeta with totalPages', () => {
        expect(Paging.toMeta(100, 25, 3)).toEqual({ totalItems: 100, totalPages: 4, pageNumber: 3 })
    })

    it('handles an empty result set', () => {
        expect(Paging.toMeta(0, 10, 1)).toEqual({ totalItems: 0, totalPages: 0, pageNumber: 1 })
    })
})
