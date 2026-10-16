import type { FilterDefinitions } from '../TableFilter'
import { TableFilterConfig } from '../TableFilter'
import type { Filters } from './Table.hooks.spec.types'

const { text, number, checkbox } = TableFilterConfig

/** Shared filter definitions for the table hooks specs. */
const filterDefs: FilterDefinitions<Filters> = {
    search: text({ label: 'Search' }),
    min: number({ label: 'Min' }),
    active: checkbox({ label: 'Active' }),
}

export const TableHooksMocks = { filterDefs }
