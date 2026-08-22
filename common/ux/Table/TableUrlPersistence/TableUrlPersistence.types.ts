import type { Dictionary, Nullable } from '@common/utils/Generics'
import type {
    Paging,
    TableSortState,
    TableState,
} from '../useTableController/useTableController.types'
import type { UrlPersistenceConfig } from '../useTableController/useTableController.types'
import type { FilterDefinitions } from '../TableFilterConfig'

/** Args to the URL-persistence hook — mirrors `UseTableConfig` naming. */
export type UseTableUrlPersistenceArgs<TFilters extends Dictionary> = {
    filters?: FilterDefinitions<TFilters>
    defaultSort: TableSortState
    defaultPaging: Paging
    config?: UrlPersistenceConfig
}

/** What the URL-persistence hook exposes to the controller. */
export type TableUrlPersistence<TFilters extends Dictionary> = {
    /** Whether URL persistence is active. */
    enabled: boolean
    /** The current state derived from the URL (null when offline). */
    state: Nullable<TableState<TFilters>>
    /**
     * Persist the given state to the URL.
     * `replace` defaults to true (internal nav like sort/page);
     * pass false to push a history entry (filter apply/reset) so Back restores it.
     */
    persist: (state: TableState<TFilters>, replace?: boolean) => void
}
