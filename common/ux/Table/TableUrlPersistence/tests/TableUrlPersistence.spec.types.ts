// Test-only types for the useTableUrlPersistence spec.
import type { UseTableUrlPersistenceArgs } from '../TableUrlPersistence.types'
import type { TableSortState, Paging } from '../../Table.hooks.types'
import type { FilterDefinitions } from '../../TableFilter'

// Filter values may be absent/unset (empty encodes to undefined), so the fields are optional.
export type Filters = {
    search?: string
    min?: number
    active?: boolean
}

export type SetupOptions = {
    initialEntries?: string[]
    filters?: FilterDefinitions<Filters>
    config?: UseTableUrlPersistenceArgs<Filters>['config']
    sort?: TableSortState
    paging?: Paging
}
