import type { FilterDefinitions } from '../../TableFilterConfig'
import { text, number, checkbox } from '../../TableFilterConfig'
import type { Filters } from './useTableController.spec.types'

/** Shared filter definitions for the useTableController specs. */
export const filterDefs: FilterDefinitions<Filters> = {
    search: text({ label: 'Search' }),
    min: number({ label: 'Min' }),
    active: checkbox({ label: 'Active' }),
}
