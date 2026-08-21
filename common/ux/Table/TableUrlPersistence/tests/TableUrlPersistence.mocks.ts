import type { FilterDefinitions } from '../../TableFilterConfig'
import { text, number, checkbox } from '../../TableFilterConfig'
import type { TableSortState, Paging } from '../../useTableController/useTableController.types'
import type { Filters } from './TableUrlPersistence.spec.types'

export const filterDefs: FilterDefinitions<Filters> = {
    search: text({ label: 'Search' }),
    min: number({ label: 'Min' }),
    active: checkbox({ label: 'Active' }),
}

export const defaultSort: TableSortState = { column: 'datetime', direction: 'asc' }
export const defaultPaging: Paging = { pageNumber: 1, pageSize: 10 }

export const makeFilterState = (search?: string, min?: number, active = false): Filters => ({
    search,
    min,
    active,
})

export const nextState = (
    overrides: Partial<{ filters: Filters; sorting: TableSortState; pagination: Paging }> = {},
) => ({
    filters: makeFilterState(),
    sorting: defaultSort,
    pagination: defaultPaging,
    ...overrides,
})
