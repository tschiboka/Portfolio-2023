import { describe, it, expect } from 'vitest'
import { act, renderHook } from '@testing-library/react'
import { useTableUrlPersistence } from '../TableUrlPersistence'
import {
    defaultPaging,
    defaultSort,
    filterDefs,
    makeFilterState,
    nextState,
} from './TableUrlPersistence.mocks'
import { setup } from './TableUrlPersistence.spec.utils'
import type { Filters } from './TableUrlPersistence.spec.types'

describe('useTableUrlPersistence', () => {
    describe('enabled', () => {
        it('is off inside a router when config is omitted (opt-in)', () => {
            const { result } = setup({ config: undefined })
            expect(result.current.enabled).toBe(false)
        })

        it('is on inside a router when config is declared (even empty)', () => {
            const { result } = setup({ config: {} })
            expect(result.current.enabled).toBe(true)
        })

        it('is true inside a router when config.enabled is true', () => {
            const { result } = setup({ config: { enabled: true } })
            expect(result.current.enabled).toBe(true)
        })

        it('is false when config.enabled is false', () => {
            const { result } = setup({ config: { enabled: false } })
            expect(result.current.enabled).toBe(false)
        })
    })

    describe('outside a router', () => {
        it('is disabled, exposes null state, and persist is a no-op', () => {
            const { result } = renderHook(() =>
                useTableUrlPersistence<Filters>({
                    filters: filterDefs,
                    defaultSort,
                    defaultPaging,
                }),
            )
            expect(result.current.enabled).toBe(false)
            expect(result.current.state).toBeNull()
            expect(() =>
                act(() =>
                    result.current.persist({
                        filters: makeFilterState(),
                        sorting: defaultSort,
                        pagination: defaultPaging,
                    }),
                ),
            ).not.toThrow()
        })
    })

    describe('hydration (state from URL)', () => {
        it('reads filters, sort, and paging from the URL', () => {
            const url =
                '/?search=ada&min=5&active=true&sortBy=name&dir=desc&pageNumber=3&pageSize=25'
            const { result } = setup({ initialEntries: [url], config: {} })
            expect(result.current.state).toEqual({
                filters: { search: 'ada', min: 5, active: true },
                sorting: { column: 'name', direction: 'desc' },
                pagination: { pageNumber: 3, pageSize: 25 },
            })
        })

        it('falls back to defaults for missing sort and paging params', () => {
            const { result } = setup({ initialEntries: ['/'], config: {} })
            expect(result.current.state).toEqual({
                filters: makeFilterState(),
                sorting: defaultSort,
                pagination: defaultPaging,
            })
        })

        it('falls back to default paging for non-numeric page/pageSize', () => {
            const { result } = setup({
                initialEntries: ['/?pageNumber=abc&pageSize=xyz'],
                config: {},
            })
            expect(result.current.state?.pagination).toEqual(defaultPaging)
        })

        it('decodes filters through the per-type codec', () => {
            const { result } = setup({ initialEntries: ['/?active=true'], config: {} })
            expect(result.current.state?.filters.active).toBe(true)
        })

        it('omits empty/missing filters', () => {
            const { result } = setup({ initialEntries: ['/?search='] })
            expect(result.current.state?.filters.search).toBeUndefined()
        })

        it('reads namespaced params when a namespace is configured', () => {
            const url =
                '/?ns.search=ada&ns.pageNumber=2&ns.sortBy=created&ns.dir=asc&ns.pageSize=50'
            const { result } = setup({ initialEntries: [url], config: { namespace: 'ns' } })
            expect(result.current.state).toEqual({
                filters: { search: 'ada', min: undefined, active: false },
                sorting: { column: 'created', direction: 'asc' },
                pagination: { pageNumber: 2, pageSize: 50 },
            })
        })

        it('returns empty filters when no filter definitions are given', () => {
            const { result } = setup({
                filters: undefined,
                initialEntries: ['/?sortBy=name&pageNumber=4'],
                config: {},
            })
            expect(result.current.state?.filters).toEqual({})
            expect(result.current.state?.sorting.column).toBe('name')
            expect(result.current.state?.pagination.pageNumber).toBe(4)
        })
    })

    describe('persist', () => {
        it('writes filters, sort, and paging to the URL', () => {
            const { result, search } = setup({})
            act(() =>
                result.current.persist(
                    nextState({
                        filters: makeFilterState('ada', 5, true),
                        sorting: { column: 'name', direction: 'desc' },
                        pagination: { pageNumber: 3, pageSize: 25 },
                    }),
                ),
            )
            expect(search.current).toContain('search=ada')
            expect(search.current).toContain('min=5')
            expect(search.current).toContain('active=true')
            expect(search.current).toContain('sortBy=name')
            expect(search.current).toContain('dir=desc')
            expect(search.current).toContain('pageNumber=3')
            expect(search.current).toContain('pageSize=25')
        })

        it('omits empty filter values and sortBy when there is no column', () => {
            const { result, search } = setup({})
            act(() =>
                result.current.persist(
                    nextState({
                        filters: makeFilterState(),
                        sorting: { column: '', direction: 'asc' },
                    }),
                ),
            )
            expect(search.current).not.toContain('search=')
            expect(search.current).not.toContain('min=')
            expect(search.current).not.toContain('active=')
            expect(search.current).not.toContain('sortBy=')
        })

        it('removes previously-set keys when a value resets to empty', () => {
            const { result, search } = setup({ initialEntries: ['/?search=ada&min=5'] })
            act(() =>
                result.current.persist(
                    nextState({
                        filters: makeFilterState('', undefined, false),
                    }),
                ),
            )
            expect(search.current).not.toContain('search=')
            expect(search.current).not.toContain('min=')
        })

        it('removes sortBy when sorting column resets to empty', () => {
            const { result, search } = setup({ initialEntries: ['/?sortBy=name'] })
            act(() =>
                result.current.persist(
                    nextState({
                        sorting: { column: '', direction: 'asc' },
                    }),
                ),
            )
            expect(search.current).not.toContain('sortBy=')
        })

        it('merges unrelated existing params instead of dropping them', () => {
            const { result, search } = setup({ initialEntries: ['/?tab=recent'] })
            act(() =>
                result.current.persist(
                    nextState({
                        filters: makeFilterState('ada', undefined, false),
                        pagination: { pageNumber: 2, pageSize: 10 },
                    }),
                ),
            )
            expect(search.current).toContain('tab=recent')
            expect(search.current).toContain('search=ada')
            expect(search.current).toContain('pageNumber=2')
        })

        it('applies a namespace to written keys and omits defaults', () => {
            const { result, search } = setup({ config: { namespace: 'ns' } })
            act(() =>
                result.current.persist(
                    nextState({
                        filters: makeFilterState('ada', undefined, false),
                    }),
                ),
            )
            expect(search.current).toContain('ns.search=ada')
            // Defaults are omitted (only non-default values are persisted).
            expect(search.current).not.toContain('ns.sortBy=')
            expect(search.current).not.toContain('ns.dir=')
            expect(search.current).not.toContain('ns.pageNumber=')
            expect(search.current).not.toContain('ns.pageSize=')
        })

        it('omits values equal to the defaults and keeps only differences', () => {
            const { result, search } = setup({
                config: {},
                sort: defaultSort,
                paging: defaultPaging,
            })
            // Everything at default → clean URL (no sort/paging params).
            act(() => result.current.persist(nextState({})))
            expect(search.current).not.toContain('sortBy=')
            expect(search.current).not.toContain('dir=')
            expect(search.current).not.toContain('pageNumber=')
            expect(search.current).not.toContain('pageSize=')

            // Only the differing values are written.
            act(() =>
                result.current.persist(
                    nextState({
                        sorting: { column: 'name', direction: 'asc' },
                        pagination: { pageNumber: 3, pageSize: 10 },
                    }),
                ),
            )
            expect(search.current).toContain('sortBy=name')
            expect(search.current).not.toContain('dir=')
            expect(search.current).toContain('pageNumber=3')
            expect(search.current).not.toContain('pageSize=')
        })

        it('replaces the current entry when replace is the default', () => {
            const { result, search } = setup({})
            act(() =>
                result.current.persist(
                    nextState({
                        filters: makeFilterState('one', undefined, false),
                    }),
                ),
            )
            act(() =>
                result.current.persist(
                    nextState({
                        filters: makeFilterState('two', undefined, false),
                    }),
                ),
            )
            expect(search.current).toContain('search=two')
            expect(search.current).not.toContain('search=one')
        })
    })
})
