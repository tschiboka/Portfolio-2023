import type { FilterDefinitions } from '../../TableFilterConfig'
import { TableFilterConfig } from '../../TableFilterConfig'
import type { Filters } from './useTableController.spec.types'

const { text, number, checkbox } = TableFilterConfig

/** Shared filter definitions for the useTableController specs. */
const filterDefs: FilterDefinitions<Filters> = {
    search: text({ label: 'Search' }),
    min: number({ label: 'Min' }),
    active: checkbox({ label: 'Active' }),
}

export const TableControllerMocks = { filterDefs }
