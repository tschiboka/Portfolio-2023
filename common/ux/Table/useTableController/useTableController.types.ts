import { Paging, SortDirection, TableSortState } from '.'
import type { TableFilteringInput } from '../Table.types'
import type { FilterDefinitions } from '../TableFilterConfig'
import type { Dictionary } from '@common/utils/Generics'
export type { SortDirection, TableSortState, Paging } from '@common/types'

export type TableState<TFilters extends Dictionary> = {
    filters: TFilters
    sorting: TableSortState
    pagination: Paging
}

export type UrlPersistenceConfig = {
    // default true
    enabled?: boolean
    // only set namespace when multiple persistent tables share a page
    namespace?: string
}

export type UseTableConfig<TFilters extends Dictionary, TParams> = {
    filters?: FilterDefinitions<TFilters>
    sorting?: {
        default?: TableSortState
    }
    pagination?: {
        pageSize?: number
        pageSizeOptions?: number[]
    }
    urlPersistence?: UrlPersistenceConfig
    toParams: ToParamsFn<TFilters, TParams>
}

export type ToParamsFn<TFilters extends Dictionary, TParams> = (
    state: TableState<TFilters>,
) => TParams

export type TableControl<TFilters extends Dictionary = Dictionary, TParams = unknown> = {
    state: TableState<TFilters>
    params: TParams
    sorting: {
        column: string
        direction: SortDirection
        onSortChange: (column: string, direction: SortDirection) => void
    }
    pagination: {
        pageNumber: number
        pageSize: number
        pageSizeOptions?: number[]
        totalPages?: number
        totalItems?: number
        onPageChange: (pageNumber: number) => void
        onPageSizeChange: (size: number) => void
    }
    filtering: {
        inputs: TableFilteringInput[]
        values: Dictionary
        onFilter: (values: Dictionary) => void
    }
}
