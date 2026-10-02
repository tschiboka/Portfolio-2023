import type { FilterDefinitions } from '../../TableFilterConfig'
import { text, number, checkbox } from '../../TableFilterConfig'
import type { TableSortState, Paging } from '../../useTableController/useTableController.types'
import type { Filters } from './TableUrlPersistence.spec.types'

const filterDefs: FilterDefinitions<Filters> = {
    search: text({ label: 'Search' }),
    min: number({ label: 'Min' }),
    active: checkbox({ label: 'Active' }),
}

const defaultSort: TableSortState = { column: 'datetime', direction: 'asc' }
const defaultPaging: Paging = { pageNumber: 1, pageSize: 10 }

const makeFilterState = (search?: string, min?: number, active = false): Filters => ({
    search,
    min,
    active,
})

const nextState = (
    overrides: Partial<{ filters: Filters; sorting: TableSortState; pagination: Paging }> = {},
) => ({
    filters: makeFilterState(),
    sorting: defaultSort,
    pagination: defaultPaging,
    ...overrides,
})

export const TableUrlPersistenceMocks = {
    filterDefs,
    defaultSort,
    defaultPaging,
    makeFilterState,
    nextState,
}
