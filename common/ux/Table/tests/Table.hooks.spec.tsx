import { act } from '@testing-library/react'
import { TableHooksMocks } from './Table.hooks.mocks'
import { TableHooksTestUtils } from './Table.hooks.spec.utils'
import type { SortDirection } from '../Table.hooks.types'

const { filterDefs } = TableHooksMocks
const { setup, setupWithUrl } = TableHooksTestUtils

describe('useTableController', () => {
    it('should initializ with default filters, sort, and paging', () => {
        const { result } = setup({ filters: filterDefs })
        expect(result.current.state.filters).toEqual({
            search: undefined,
            min: undefined,
            active: undefined,
        })
        expect(result.current.state.sorting).toEqual({ column: '', direction: 'asc' })
        expect(result.current.state.pagination).toEqual({ pageNumber: 1, pageSize: 10 })
    })

    it('should respect configured default sort and pageSize', () => {
        const { result } = setup({
            sorting: { default: { column: 'name', direction: 'desc' } },
            pagination: { pageSize: 25 },
        })
        expect(result.current.state.sorting).toEqual({ column: 'name', direction: 'desc' })
        expect(result.current.state.pagination.pageSize).toBe(25)
    })

    it('should apply filters and resets page to 1', () => {
        const { result } = setup({ filters: filterDefs })
        act(() => result.current.pagination.onPageChange(3))
        act(() => result.current.filtering.onFilter({ search: 'ada', active: true }))
        expect(result.current.state.filters.search).toBe('ada')
        expect(result.current.state.filters.active).toBe(true)
        expect(result.current.state.pagination.pageNumber).toBe(1)
    })

    it('should change sort and resets page to 1', () => {
        const { result } = setup()
        act(() => result.current.pagination.onPageChange(2))
        const direction: SortDirection = 'desc'
        act(() => result.current.sorting.onSortChange('created', direction))
        expect(result.current.state.sorting).toEqual({ column: 'created', direction })
        expect(result.current.state.pagination.pageNumber).toBe(1)
    })

    it('should change page without resetting to 1', () => {
        const { result } = setup()
        act(() => result.current.pagination.onPageChange(4))
        expect(result.current.state.pagination.pageNumber).toBe(4)
    })

    it('should change pageSize and resets page to 1', () => {
        const { result } = setup()
        act(() => result.current.pagination.onPageChange(3))
        act(() => result.current.pagination.onPageSizeChange(50))
        expect(result.current.state.pagination.pageSize).toBe(50)
        expect(result.current.state.pagination.pageNumber).toBe(1)
    })

    it('should expose filter inputs derived from filter definitions', () => {
        const { result } = setup({ filters: filterDefs })
        expect(result.current.filtering.inputs).toEqual([
            { key: 'search', label: 'Search', type: 'text' },
            { key: 'min', label: 'Min', type: 'number' },
            { key: 'active', label: 'Active', type: 'checkbox' },
        ])
    })

    it('should call toParams with the current state', () => {
        const { result, toParams } = setup()
        expect(toParams).toHaveBeenCalledWith(result.current.state)
    })
})

// ─── URL persistence round-trip ─────────────────────────────────────────────
// Exercises the controller + `urlPersistence` together inside a router: state → URL,
// URL → state on mount, and URL → state on external changes.

describe('useTableController — URL persistence round-trip', () => {
    it('should persist an applied filter to the URL', () => {
        const { controllers, state } = setupWithUrl()
        act(() => controllers[0].current.filtering.onFilter({ search: 'ada' }))
        expect(state.search).toContain('search=ada')
        expect(controllers[0].current.state.filters.search).toBe('ada')
    })

    it('should persist sort and paging to the URL, omitting defaults', () => {
        const { controllers, state } = setupWithUrl()
        act(() => controllers[0].current.sorting.onSortChange('name', 'desc'))
        act(() => controllers[0].current.pagination.onPageChange(4))
        expect(state.search).toContain('sortBy=name')
        expect(state.search).toContain('dir=desc')
        expect(state.search).toContain('pageNumber=4')
        expect(state.search).not.toContain('pageSize=') // default page size omitted
        expect(controllers[0].current.state.sorting).toEqual({ column: 'name', direction: 'desc' })
        expect(controllers[0].current.state.pagination.pageNumber).toBe(4)
    })

    it('should hydrate state from the URL on mount', () => {
        const { controllers } = setupWithUrl('search=grace&sortBy=name&dir=asc&pageNumber=3')
        expect(controllers[0].current.state.filters.search).toBe('grace')
        expect(controllers[0].current.state.sorting).toEqual({ column: 'name', direction: 'asc' })
        expect(controllers[0].current.state.pagination.pageNumber).toBe(3)
    })

    it('should reset the table when the URL params are cleared externally', () => {
        const { controllers, state } = setupWithUrl()
        act(() => controllers[0].current.filtering.onFilter({ search: 'ada' }))
        expect(state.search).toContain('search=ada')

        // External navigation (e.g. pressing home) clears the params.
        act(() => state.setUrl(''))
        expect(controllers[0].current.state.filters.search).toBeUndefined()
    })

    it('should keep namespaced tables on one page from colliding', () => {
        const { controllers, state } = setupWithUrl('', 2)
        act(() => controllers[0].current.filtering.onFilter({ search: 'A' }))
        expect(state.search).toContain('table0.search=A')

        act(() => controllers[1].current.filtering.onFilter({ search: 'B' }))
        expect(state.search).toContain('table1.search=B')
        expect(controllers[0].current.state.filters.search).toBe('A')
        expect(controllers[1].current.state.filters.search).toBe('B')
    })
})
