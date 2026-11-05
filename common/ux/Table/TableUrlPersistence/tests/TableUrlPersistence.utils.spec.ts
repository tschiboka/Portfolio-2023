import { describe, it, expect } from 'vitest'
import { TableUrlPersistenceTestUtils } from './TableUrlPersistence.spec.utils'
import { TableUrlPersistenceUtils } from '..'
import type { Filters } from './TableUrlPersistence.spec.types'

describe('statesEqual', () => {
    it('should be true for identical states', () =>
        expect(
            TableUrlPersistenceUtils.statesEqual(
                TableUrlPersistenceTestUtils.makeState(),
                TableUrlPersistenceTestUtils.makeState(),
            ),
        ).toBe(true))

    it('should be false when pagination differs', () =>
        expect(
            TableUrlPersistenceUtils.statesEqual(
                TableUrlPersistenceTestUtils.makeState(),
                TableUrlPersistenceTestUtils.makeState({
                    pagination: { pageNumber: 4, pageSize: 25 },
                }),
            ),
        ).toBe(false))

    it('should be false when sorting differs', () =>
        expect(
            TableUrlPersistenceUtils.statesEqual(
                TableUrlPersistenceTestUtils.makeState(),
                TableUrlPersistenceTestUtils.makeState({
                    sorting: { column: 'name', direction: 'asc' },
                }),
            ),
        ).toBe(false))

    it('should be false when a filter value differs', () =>
        expect(
            TableUrlPersistenceUtils.statesEqual(
                TableUrlPersistenceTestUtils.makeState(),
                TableUrlPersistenceTestUtils.makeState({
                    filters: { search: 'grace', min: 5, active: true },
                }),
            ),
        ).toBe(false))

    it('should be false when one state has an extra filter key', () => {
        const a = TableUrlPersistenceTestUtils.makeState()
        const b = TableUrlPersistenceTestUtils.makeState({
            filters: { search: 'ada', min: 5, active: true, extra: 1 } as Filters,
        })
        expect(TableUrlPersistenceUtils.statesEqual(a, b)).toBe(false)
    })

    it('should be true when both states have the same undefined filter values', () => {
        const filters = { search: undefined, min: undefined, active: false }
        expect(
            TableUrlPersistenceUtils.statesEqual(
                TableUrlPersistenceTestUtils.makeState({ filters }),
                TableUrlPersistenceTestUtils.makeState({ filters }),
            ),
        ).toBe(true)
    })
})
