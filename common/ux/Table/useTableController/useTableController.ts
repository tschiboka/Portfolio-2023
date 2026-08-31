import { useCallback, useEffect, useMemo, useState } from 'react'
import type { FilterDefinitions } from '../TableFilterConfig'
import type {
    UseTableConfig,
    TableControl,
    SortDirection,
    TableState,
} from './useTableController.types'
import { TableFilteringInput } from '../Table.types'
import { useTableUrlPersistence, statesEqual } from '../TableUrlPersistence'
import { Table } from '@common-utils'
import { isDefined, Objects } from '@common-utils'
import type { Dictionary } from '@common-utils'

const getDefaultFilters = <TFilters extends Dictionary>(
    filterDefs?: FilterDefinitions<TFilters>,
): TFilters => {
    if (!isDefined(filterDefs)) return Objects.fromEntries<TFilters>([])
    return Objects.fromEntries<TFilters>(
        Object.entries(filterDefs).map(([key]) => [key, undefined]),
    )
}

export const useTableController = <TFilters extends Dictionary, TParams = unknown>({
    filters: filterDefs,
    sorting: sortingConfig,
    pagination: paginationConfig,
    urlPersistence: urlPersistenceConfig,
    toParams,
}: UseTableConfig<TFilters, TParams>): TableControl<TFilters, TParams> => {
    const urlPersistence = useTableUrlPersistence<TFilters>({
        filters: filterDefs,
        defaultSort: sortingConfig?.default ?? Table.Sorting.defaults,
        defaultPaging: {
            pageNumber: Table.Paging.defaults.pageNumber,
            pageSize: paginationConfig?.pageSize ?? Table.Paging.defaults.pageSize,
        },
        config: urlPersistenceConfig,
    })
    const urlState = urlPersistence.enabled ? urlPersistence.state : null

    const [state, setState] = useState<TableState<TFilters>>(() => ({
        filters: urlState?.filters ?? getDefaultFilters(filterDefs),
        sorting: urlState?.sorting ?? sortingConfig?.default ?? Table.Sorting.defaults,
        pagination: {
            pageNumber: urlState?.pagination.pageNumber ?? Table.Paging.defaults.pageNumber,
            pageSize:
                urlState?.pagination.pageSize ??
                paginationConfig?.pageSize ??
                Table.Paging.defaults.pageSize,
        },
    }))

    // Single commit point: apply a state transition and persist it (once) when enabled.
    // `replace` mirrors the URL history mode: filter apply/reset pushes (Back restores the
    // filtered state); sort/page replace (no granular history).
    const commit = useCallback(
        (transition: (prev: TableState<TFilters>) => TableState<TFilters>, replace = true) => {
            setState((prev) => {
                const next = transition(prev)
                if (urlPersistence.enabled) urlPersistence.persist(next, replace)
                return next
            })
        },
        [urlPersistence],
    )

    // Two-way sync: when the URL changes externally (back/forward, nav, manual URL edits)
    // without a `commit`, mirror the URL-derived state back in. Our own persist echo already
    // matches `state`, so `statesEqual` makes this a no-op for it. `prev` is read functionally
    // so `state` is not a dependency.
    useEffect(() => {
        if (!urlPersistence.enabled || !urlState) return
        setState((prev) => (statesEqual(prev, urlState) ? prev : urlState))
    }, [urlState, urlPersistence.enabled, urlPersistence])

    const { sorting: sort, pagination } = state
    const { pageNumber, pageSize } = pagination

    const handleFilter = useCallback(
        (values: Dictionary) =>
            commit(
                (prev) => ({
                    ...prev,
                    filters: { ...prev.filters, ...values } as TFilters,
                    pagination: {
                        ...prev.pagination,
                        pageNumber: Table.Paging.defaults.pageNumber,
                    },
                }),
                false,
            ),
        [commit],
    )

    const handleSortChange = useCallback(
        (column: string, direction: SortDirection) =>
            commit((prev) => ({
                ...prev,
                sorting: { column, direction },
                pagination: { ...prev.pagination, pageNumber: Table.Paging.defaults.pageNumber },
            })),
        [commit],
    )

    const handlePageChange = useCallback(
        (p: number) =>
            commit((prev) => ({
                ...prev,
                pagination: { ...prev.pagination, pageNumber: p },
            })),
        [commit],
    )

    const handlePageSizeChange = useCallback(
        (size: number) =>
            commit((prev) => ({
                ...prev,
                pagination: { pageNumber: Table.Paging.defaults.pageNumber, pageSize: size },
            })),
        [commit],
    )

    const pageSizeOptions = paginationConfig?.pageSizeOptions

    const filterInputs: TableFilteringInput[] = useMemo(() => {
        if (!filterDefs) return []
        return Object.entries(filterDefs).map(([key, config]) => ({
            key,
            label: config.label,
            type: config.type,
            ...Objects.pick(config, ['placeholder', 'options', 'min', 'max', 'required', 'span']),
        })) as TableFilteringInput[]
    }, [filterDefs])

    const params = useMemo(() => toParams(state), [state, toParams])

    return {
        state,
        params,
        sorting: {
            column: sort.column,
            direction: sort.direction,
            onSortChange: handleSortChange,
        },
        pagination: {
            pageNumber,
            pageSize,
            pageSizeOptions,
            onPageChange: handlePageChange,
            onPageSizeChange: handlePageSizeChange,
        },
        filtering: {
            inputs: filterInputs,
            values: state.filters,
            onFilter: handleFilter,
        },
    }
}
