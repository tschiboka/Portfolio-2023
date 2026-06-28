import type { TableFilteringInput } from '../Table.types'
import type { FilterConfig } from './filters'

export type SortDirection = 'asc' | 'desc'

export type TableSortState = {
    column: string
    direction: SortDirection
}

export type TablePaginationState = {
    page: number
    pageSize: number
}

export type UseTableConfig<TFilters extends Record<string, unknown>, TParams> = {
    filters?: {
        [K in keyof TFilters]: FilterConfig
    }
    sorting?: {
        default?: TableSortState
    }
    pagination?: {
        pageSize?: number
        pageSizeOptions?: number[]
    }
    toParams: ToParamsFn<TFilters, TParams>
}

export type ToParamsFn<TFilters extends Record<string, unknown>, TParams> = (state: {
    filters: TFilters
    sorting: TableSortState
    pagination: TablePaginationState
}) => TParams

export type TableControl<
    TFilters extends Record<string, unknown> = Record<string, unknown>,
    TParams = unknown,
> = {
    state: {
        filters: TFilters
        sorting: TableSortState
        pagination: TablePaginationState
    }
    params: TParams
    sorting: {
        column: string
        direction: SortDirection
        onSortChange: (column: string, direction: SortDirection) => void
    }
    pagination: {
        page: number
        pageSize: number
        pageSizeOptions?: number[]
        totalPages?: number
        totalItems?: number
        onPageChange: (page: number) => void
        onPageSizeChange: (size: number) => void
    }
    filtering: {
        inputs: TableFilteringInput[]
        onFilter: (values: Record<string, unknown>) => void
    }
}
