import { useEffect } from 'react'
import { MemoryRouter, useLocation } from 'react-router-dom'
import { renderHook } from '@testing-library/react'
import { TableUrlPersistenceMocks } from './TableUrlPersistence.mocks'
import { TableUrlPersistenceHooks } from '../TableUrlPersistence.hooks'
import type { ReactNode } from 'react'
import type { Filters } from './TableUrlPersistence.spec.types'
import type { UseTableUrlPersistenceArgs } from '../TableUrlPersistence.types'
import type { TableSortState, Paging, TableState } from '../../Table.hooks.types'
import type { FilterDefinitions } from '../../TableFilter'

const { filterDefs, defaultSort, defaultPaging } = TableUrlPersistenceMocks

/** Captures the router's current search string from inside the router context. */
const useSearchProbeResult = (): string => useLocation().search

type SetupOptions = {
    initialEntries?: string[]
    filters?: FilterDefinitions<Filters>
    config?: UseTableUrlPersistenceArgs<Filters>['config']
    sort?: TableSortState
    paging?: Paging
}

/** Renders the hook inside a MemoryRouter, exposing the live search string for assertions. */
const setup = (options: SetupOptions = {}) => {
    const { initialEntries = ['/'], config, sort = defaultSort, paging = defaultPaging } = options
    // Only default the filter defs when the key is absent — an explicit `undefined`
    // (no filter definitions) must pass through untouched.
    const filters = 'filters' in options ? options.filters : filterDefs
    const search = { current: '' }
    const Probe = () => {
        const value = useSearchProbeResult()
        useEffect(() => void (search.current = value))
        return null
    }

    const wrapper = ({ children }: { children: ReactNode }) => (
        <MemoryRouter initialEntries={initialEntries}>
            <Probe />
            {children}
        </MemoryRouter>
    )

    const { result } = renderHook(
        () =>
            TableUrlPersistenceHooks.useUrlState<Filters>({
                filters,
                defaultSort: sort,
                defaultPaging: paging,
                config,
            }),
        { wrapper },
    )
    return { result, search }
}

/** Builds a table state, overriding whatever a case needs. */
const makeState = (overrides: Partial<TableState<Filters>> = {}): TableState<Filters> => ({
    filters: { search: 'ada', min: 5, active: true },
    sorting: { column: 'name', direction: 'desc' },
    pagination: { pageNumber: 3, pageSize: 25 },
    ...overrides,
})

export const TableUrlPersistenceTestUtils = { setup, makeState }
