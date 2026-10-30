import { describe, expect, it } from 'vitest'
import { lensPath } from 'ramda'
import { MockBuilderMocks } from './MockBuilder.mocks'
import { MockBuilder, MockEntitiesBuilder } from '..'

const { baseMock, baseBuilder } = MockBuilderMocks

describe('MockBuilder', () => {
    describe('build', () => {
        it('should return the initial state', () => {
            expect(MockBuilder(baseMock).build()).toEqual(baseMock)
        })

        it('should return an equivalent object for a plain state', () => {
            expect(MockBuilder({ id: 1 }).build()).toEqual({ id: 1 })
        })

        it('should return the state by reference, not a copy', () => {
            expect(MockBuilder(baseMock).build()).toBe(baseMock)
        })

        it('should expose the internal state — mutating the result mutates the builder', () => {
            const builder = MockBuilder({ ...baseMock })
            builder.build().name = 'mutated'
            expect(builder.build().name).toBe('mutated')
        })

        it('should return the same reference on repeated calls', () => {
            const builder = MockBuilder({ ...baseMock })
            expect(builder.build()).toBe(builder.build())
        })

        it('should not leak mutations back into the original fixture', () => {
            const builder = MockBuilder({ ...baseMock })
            builder.build().id = 999
            expect(baseMock.id).toBe(1)
        })
    })

    describe('modify', () => {
        it('should leave the state unchanged for empty overrides', () => {
            expect(baseBuilder.modify({}).build()).toEqual(baseMock)
        })

        it('should shallow-merge overrides into the state', () => {
            expect(baseBuilder.modify({ name: 'bar', status: 'inactive' }).build()).toEqual({
                ...baseMock,
                name: 'bar',
                status: 'inactive',
            })
        })

        it('should not mutate the original state', () => {
            baseBuilder.modify({ name: 'bar' })
            expect(baseBuilder.build()).toEqual(baseMock)
        })

        it('should replace a nested object wholesale', () => {
            expect(baseBuilder.modify({ meta: { hits: 9 } }).build().meta).toEqual({ hits: 9 })
        })
    })

    describe('setValue', () => {
        it('should replace a single property', () => {
            expect(baseBuilder.setValue('name', 'bar').build().name).toBe('bar')
        })

        it('should not mutate the original state', () => {
            baseBuilder.setValue('id', 99)
            expect(baseBuilder.build().id).toBe(1)
        })

        it.each([
            ['id', 7],
            ['name', 'baz'],
            ['status', 'archived'],
        ] as const)('should set %s to %s', (key, value) => {
            expect(baseBuilder.setValue(key, value).build()[key]).toBe(value)
        })
    })

    describe('set', () => {
        it('should transform the whole state', () => {
            const result = baseBuilder.set((mock) => ({ ...mock, id: mock.id + 1 })).build()
            expect(result.id).toBe(2)
        })

        it('should not mutate the original state', () => {
            baseBuilder.set((mock) => ({ ...mock, id: 500 }))
            expect(baseBuilder.build().id).toBe(1)
        })
    })

    describe('update', () => {
        it('should apply the modifier to a nested value', () => {
            const result = baseBuilder
                .update(lensPath(['meta', 'hits']), (hits) => (hits as number) + 5)
                .build()

            expect(result.meta.hits).toBe(5)
        })

        it('should not mutate the original state', () => {
            baseBuilder.update(lensPath(['meta', 'hits']), (hits) => (hits as number) + 5)
            expect(baseBuilder.build().meta.hits).toBe(0)
        })

        it('should leave sibling properties untouched', () => {
            const result = baseBuilder
                .update(lensPath(['meta', 'hits']), (hits) => (hits as number) + 1)
                .build()

            expect(result.id).toBe(baseMock.id)
            expect(result.name).toBe(baseMock.name)
        })
    })

    describe('omit', () => {
        it('should remove the named keys', () => {
            const result = baseBuilder.omit('status', 'meta').build()
            expect(result).toEqual({ id: 1, name: 'foo' })
        })

        it('should return the full state when no keys are given', () => {
            expect(baseBuilder.omit().build()).toEqual(baseMock)
        })

        it('should not mutate the original state', () => {
            baseBuilder.omit('name')
            expect(baseBuilder.build()).toEqual(baseMock)
        })
    })

    describe('pick', () => {
        it('should keep only the named keys', () => {
            expect(baseBuilder.pick('id', 'name').build()).toEqual({ id: 1, name: 'foo' })
        })

        it('should return an empty object when no keys are given', () => {
            expect(baseBuilder.pick().build()).toEqual({})
        })

        it('should not mutate the original state', () => {
            baseBuilder.pick('id')
            expect(baseBuilder.build()).toEqual(baseMock)
        })
    })

    describe('asList', () => {
        it('should wrap the state as a single-element array', () => {
            expect(baseBuilder.asList().build()).toEqual([baseMock])
        })

        it('should append the built value of each extra builder', () => {
            const result = baseBuilder.asList(baseBuilder.modify({ id: 2 })).build()
            expect(result).toEqual([baseMock, { ...baseMock, id: 2 }])
        })

        it('should preserve order — this mock first', () => {
            const result = baseBuilder
                .asList(baseBuilder.modify({ id: 2 }), baseBuilder.modify({ id: 3 }))
                .build()

            expect(result.map((item) => item.id)).toEqual([1, 2, 3])
        })
    })

    describe('buildList', () => {
        it('should return a variant per override', () => {
            const result = baseBuilder.buildList([{ id: 2 }, { id: 3 }])
            expect(result).toEqual([
                { ...baseMock, id: 2 },
                { ...baseMock, id: 3 },
            ])
        })

        it('should return an empty array for no overrides', () => {
            expect(baseBuilder.buildList([])).toEqual([])
        })

        it('should leave the base state unchanged', () => {
            baseBuilder.buildList([{ id: 99 }])
            expect(baseBuilder.build()).toEqual(baseMock)
        })
    })
})

describe('MockEntitiesBuilder', () => {
    it('should wrap the list in an entities object', () => {
        expect(MockEntitiesBuilder([baseMock]).build()).toEqual({ entities: [baseMock] })
    })

    it('should support an empty list', () => {
        expect(MockEntitiesBuilder([]).build()).toEqual({ entities: [] })
    })

    it('should expose the builder API on the entities wrapper', () => {
        const result = MockEntitiesBuilder([baseMock])
            .setValue('entities', [{ ...baseMock, id: 2 }])
            .build()

        expect(result.entities).toEqual([{ ...baseMock, id: 2 }])
    })
})
