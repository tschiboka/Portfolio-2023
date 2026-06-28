import { useCallback, useMemo, useState } from 'react'
import type { FilterConfig } from './filters'
import type {
    UseTableConfig,
    TableControl,
    TableSortState,
    SortDirection,
} from './useTableController.types'
import { TableFilteringInput } from '../Table.types'

// ─── Hook ────────────────────────────────────────────────────────────────────

const getDefaultFilters = <TFilters extends Record<string, unknown>>(filterDefs?: {
    [K in keyof TFilters]: FilterConfig
}): TFilters => {
    if (!filterDefs) return {} as TFilters
    return Object.fromEntries(
        Object.entries(filterDefs).map(([key]) => [key, undefined]),
    ) as TFilters
}

export const useTableController = <TFilters extends Record<string, unknown>, TParams = unknown>({
    filters: filterDefs,
    sorting: sortingConfig,
    pagination: paginationConfig,
    toParams,
}: UseTableConfig<TFilters, TParams>): TableControl<TFilters, TParams> => {
    const [filters, setFilters] = useState<TFilters>(getDefaultFilters(filterDefs))
    const [sort, setSort] = useState<TableSortState>(
        sortingConfig?.default ?? { column: '', direction: 'asc' },
    )
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(paginationConfig?.pageSize ?? 10)

    const handleFilter = useCallback((values: Record<string, unknown>) => {
        setFilters((prev) => ({ ...prev, ...values }) as TFilters)
        setPage(1)
    }, [])

    const handleSortChange = useCallback((column: string, direction: SortDirection) => {
        setSort({ column, direction })
        setPage(1)
    }, [])

    const handlePageChange = useCallback((p: number) => {
        setPage(p)
    }, [])

    const handlePageSizeChange = useCallback((size: number) => {
        setPageSize(size)
        setPage(1)
    }, [])

    const pageSizeOptions = paginationConfig?.pageSizeOptions

    const filterInputs: TableFilteringInput[] = useMemo(() => {
        if (!filterDefs) return []
        return Object.entries(filterDefs).map(([key, config]) => ({
            key,
            label: config.label,
            type: config.type,
            ...('placeholder' in config ? { placeholder: config.placeholder } : {}),
            ...('options' in config ? { options: config.options } : {}),
            ...('min' in config ? { min: config.min } : {}),
            ...('max' in config ? { max: config.max } : {}),
            ...('required' in config ? { required: config.required } : {}),
            ...('span' in config ? { span: config.span } : {}),
        })) as TableFilteringInput[]
    }, [filterDefs])

    const state = useMemo(
        () => ({ filters, sorting: sort, pagination: { page, pageSize } }),
        [filters, sort, page, pageSize],
    )

    const params = useMemo(
        () => toParams(state),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [filters, sort.column, sort.direction, page, pageSize],
    )

    return {
        state,
        params,
        sorting: {
            column: sort.column,
            direction: sort.direction,
            onSortChange: handleSortChange,
        },
        pagination: {
            page,
            pageSize,
            pageSizeOptions,
            onPageChange: handlePageChange,
            onPageSizeChange: handlePageSizeChange,
        },
        filtering: {
            inputs: filterInputs,
            onFilter: handleFilter,
        },
    }
}
