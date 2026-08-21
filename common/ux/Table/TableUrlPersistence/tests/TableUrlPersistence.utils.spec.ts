import { describe, it, expect } from 'vitest'
import { statesEqual } from '../TableUrlPersistence.utils'
import type { TableState } from '../../useTableController/useTableController.types'

type Filters = { search?: string; min?: number; active?: boolean }

const makeState = (overrides: Partial<TableState<Filters>> = {}): TableState<Filters> => ({
    filters: { search: 'ada', min: 5, active: true },
    sorting: { column: 'name', direction: 'desc' },
    pagination: { pageNumber: 3, pageSize: 25 },
    ...overrides,
})

describe('statesEqual', () => {
    it('is true for identical states', () => {
        expect(statesEqual(makeState(), makeState())).toBe(true)
    })

    it('is false when pagination differs', () => {
        expect(
            statesEqual(makeState(), makeState({ pagination: { pageNumber: 4, pageSize: 25 } })),
        ).toBe(false)
    })

    it('is false when sorting differs', () => {
        expect(
            statesEqual(makeState(), makeState({ sorting: { column: 'name', direction: 'asc' } })),
        ).toBe(false)
    })

    it('is false when a filter value differs', () => {
        expect(
            statesEqual(
                makeState(),
                makeState({ filters: { search: 'grace', min: 5, active: true } }),
            ),
        ).toBe(false)
    })

    it('is false when one state has an extra filter key', () => {
        const a = makeState()
        const b = makeState({
            filters: { search: 'ada', min: 5, active: true, extra: 1 } as Filters,
        })
        expect(statesEqual(a, b)).toBe(false)
    })

    it('is true when both states have the same undefined filter values', () => {
        expect(
            statesEqual(
                makeState({ filters: { search: undefined, min: undefined, active: false } }),
                makeState({ filters: { search: undefined, min: undefined, active: false } }),
            ),
        ).toBe(true)
    })
})
