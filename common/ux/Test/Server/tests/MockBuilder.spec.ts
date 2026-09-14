import { describe, expect, it } from 'vitest'
import { lensPath } from 'ramda'
import { MockBuilder, MockEntitiesBuilder } from '../MockBuilder'
import { baseBuilder, baseMock } from './MockBuilder.mocks'

describe('MockBuilder', () => {
    describe('build', () => {
        it('returns the initial state', () => {
            expect(MockBuilder(baseMock).build()).toEqual(baseMock)
        })

        it('returns an equivalent object for a plain state', () => {
            expect(MockBuilder({ id: 1 }).build()).toEqual({ id: 1 })
        })

        it('returns the state by reference, not a copy', () => {
            expect(MockBuilder(baseMock).build()).toBe(baseMock)
        })

        it('exposes the internal state — mutating the result mutates the builder', () => {
            const builder = MockBuilder({ ...baseMock })
            builder.build().name = 'mutated'
            expect(builder.build().name).toBe('mutated')
        })

        it('returns the same reference on repeated calls', () => {
            const builder = MockBuilder({ ...baseMock })
            expect(builder.build()).toBe(builder.build())
        })

        it('does not leak mutations back into the original fixture', () => {
            const builder = MockBuilder({ ...baseMock })
            builder.build().id = 999
            expect(baseMock.id).toBe(1)
        })
    })

    describe('modify', () => {
        it('leaves the state unchanged for empty overrides', () => {
            expect(baseBuilder.modify({}).build()).toEqual(baseMock)
        })

        it('shallow-merges overrides into the state', () => {
            expect(baseBuilder.modify({ name: 'bar', status: 'inactive' }).build()).toEqual({
                ...baseMock,
                name: 'bar',
                status: 'inactive',
            })
        })

        it('does not mutate the original state', () => {
            baseBuilder.modify({ name: 'bar' })
            expect(baseBuilder.build()).toEqual(baseMock)
        })

        it('replaces a nested object wholesale', () => {
            expect(baseBuilder.modify({ meta: { hits: 9 } }).build().meta).toEqual({ hits: 9 })
        })
    })

    describe('setValue', () => {
        it('replaces a single property', () => {
            expect(baseBuilder.setValue('name', 'bar').build().name).toBe('bar')
        })

        it('does not mutate the original state', () => {
            baseBuilder.setValue('id', 99)
            expect(baseBuilder.build().id).toBe(1)
        })

        it.each([
            ['id', 7],
            ['name', 'baz'],
            ['status', 'archived'],
        ] as const)('sets %s to %s', (key, value) => {
            expect(baseBuilder.setValue(key, value).build()[key]).toBe(value)
        })
    })

    describe('set', () => {
        it('transforms the whole state', () => {
            const result = baseBuilder.set((mock) => ({ ...mock, id: mock.id + 1 })).build()
            expect(result.id).toBe(2)
        })

        it('does not mutate the original state', () => {
            baseBuilder.set((mock) => ({ ...mock, id: 500 }))
            expect(baseBuilder.build().id).toBe(1)
        })
    })

    describe('update', () => {
        it('applies the modifier to a nested value', () => {
            const result = baseBuilder
                .update(lensPath(['meta', 'hits']), (hits) => (hits as number) + 5)
                .build()

            expect(result.meta.hits).toBe(5)
        })

        it('does not mutate the original state', () => {
            baseBuilder.update(lensPath(['meta', 'hits']), (hits) => (hits as number) + 5)
            expect(baseBuilder.build().meta.hits).toBe(0)
        })

        it('leaves sibling properties untouched', () => {
            const result = baseBuilder
                .update(lensPath(['meta', 'hits']), (hits) => (hits as number) + 1)
                .build()

            expect(result.id).toBe(baseMock.id)
            expect(result.name).toBe(baseMock.name)
        })
    })

    describe('omit', () => {
        it('removes the named keys', () => {
            const result = baseBuilder.omit('status', 'meta').build()
            expect(result).toEqual({ id: 1, name: 'foo' })
        })

        it('returns the full state when no keys are given', () => {
            expect(baseBuilder.omit().build()).toEqual(baseMock)
        })

        it('does not mutate the original state', () => {
            baseBuilder.omit('name')
            expect(baseBuilder.build()).toEqual(baseMock)
        })
    })

    describe('pick', () => {
        it('keeps only the named keys', () => {
            expect(baseBuilder.pick('id', 'name').build()).toEqual({ id: 1, name: 'foo' })
        })

        it('returns an empty object when no keys are given', () => {
            expect(baseBuilder.pick().build()).toEqual({})
        })

        it('does not mutate the original state', () => {
            baseBuilder.pick('id')
            expect(baseBuilder.build()).toEqual(baseMock)
        })
    })

    describe('asList', () => {
        it('wraps the state as a single-element array', () => {
            expect(baseBuilder.asList().build()).toEqual([baseMock])
        })

        it('appends the built value of each extra builder', () => {
            const result = baseBuilder.asList(baseBuilder.modify({ id: 2 })).build()
            expect(result).toEqual([baseMock, { ...baseMock, id: 2 }])
        })

        it('preserves order — this mock first', () => {
            const result = baseBuilder
                .asList(baseBuilder.modify({ id: 2 }), baseBuilder.modify({ id: 3 }))
                .build()

            expect(result.map((item) => item.id)).toEqual([1, 2, 3])
        })
    })

    describe('buildList', () => {
        it('returns a variant per override', () => {
            const result = baseBuilder.buildList([{ id: 2 }, { id: 3 }])
            expect(result).toEqual([
                { ...baseMock, id: 2 },
                { ...baseMock, id: 3 },
            ])
        })

        it('returns an empty array for no overrides', () => {
            expect(baseBuilder.buildList([])).toEqual([])
        })

        it('leaves the base state unchanged', () => {
            baseBuilder.buildList([{ id: 99 }])
            expect(baseBuilder.build()).toEqual(baseMock)
        })
    })
})

describe('MockEntitiesBuilder', () => {
    it('wraps the list in an entities object', () => {
        expect(MockEntitiesBuilder([baseMock]).build()).toEqual({ entities: [baseMock] })
    })

    it('supports an empty list', () => {
        expect(MockEntitiesBuilder([]).build()).toEqual({ entities: [] })
    })

    it('exposes the builder API on the entities wrapper', () => {
        const result = MockEntitiesBuilder([baseMock])
            .setValue('entities', [{ ...baseMock, id: 2 }])
            .build()

        expect(result.entities).toEqual([{ ...baseMock, id: 2 }])
    })
})
