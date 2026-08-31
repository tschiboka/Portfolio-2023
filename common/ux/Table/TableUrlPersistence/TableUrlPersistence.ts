import { useCallback, useMemo } from 'react'
import { useInRouterContext, useSearchParams } from 'react-router-dom'
import type { Dictionary, Optional, Nullable } from '@common-utils'
import type { TableSortState, TableState } from '../useTableController/useTableController.types'
import type { FilterConfig, FilterDefinitions } from '../TableFilterConfig'
import type { TableUrlPersistence, UseTableUrlPersistenceArgs } from './TableUrlPersistence.types'
import { buildCodec } from './TableUrlPersistence.config'
import { isDefined, Objects, Url, Numbers } from '@common-utils'

const readFilterValues = <TFilters extends Dictionary>(
    params: URLSearchParams,
    filterDefs: Optional<FilterDefinitions<TFilters>>,
    namespace: Optional<string>,
): TFilters => {
    if (!isDefined(filterDefs)) return Objects.fromEntries<TFilters>([])
    return Objects.fromEntries<TFilters>(
        Object.entries<FilterConfig>(filterDefs).map(([key, config]) => {
            const raw = params.get(Url.Params.build(namespace, config.urlKey ?? key))
            return [key, buildCodec(config).decode(raw)]
        }),
    )
}

const writeFilterValues = <TFilters extends Dictionary>(
    params: URLSearchParams,
    filters: TFilters,
    filterDefs: Optional<FilterDefinitions<TFilters>>,
    namespace: Optional<string>,
): URLSearchParams => {
    if (!isDefined(filterDefs)) return params
    // Pure: builds a new params from the input, mutating only the local accumulator.
    return Object.entries(filters).reduce((acc, [key, value]) => {
        const config: Optional<FilterConfig> = filterDefs[key]
        if (!isDefined(config)) return acc
        const builtKey = Url.Params.build(namespace, config.urlKey ?? key)
        const encoded = buildCodec(config).encode(value)
        if (isDefined(encoded)) {
            acc.set(builtKey, encoded)
        } else {
            // Empty/unset encodes to undefined — remove any stale key so a reset clears the URL.
            acc.delete(builtKey)
        }
        return acc
    }, new URLSearchParams(params))
}

export const useTableUrlPersistence = <TFilters extends Dictionary>({
    filters: filterDefs,
    defaultSort,
    defaultPaging,
    config,
}: UseTableUrlPersistenceArgs<TFilters>): TableUrlPersistence<TFilters> => {
    const inRouter = useInRouterContext()
    // Opt-in by declaration: persistence is off unless the `urlPersistence` config is provided
    // (then `enabled` defaults true). Omitting it entirely keeps the URL untouched.
    const enabled = isDefined(config) && (config.enabled ?? true) && inRouter
    const namespace = config?.namespace

    // useInRouterContext() is constant for the component's lifetime (router context is static),
    // so this conditional is stable — a safe, deliberate exception to the rules-of-hooks rule.
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [searchParams, setSearchParams] = inRouter ? useSearchParams() : [null, null]

    const state = useMemo<Nullable<TableState<TFilters>>>(() => {
        if (!enabled || !searchParams) return null
        const sortBy = searchParams.get(Url.Params.build(namespace, 'sortBy'))
        const dir = searchParams.get(Url.Params.build(namespace, 'dir'))
        const page =
            Numbers.Optional.toNumber(
                searchParams.get(Url.Params.build(namespace, 'pageNumber')),
            ) ?? defaultPaging.pageNumber
        const pageSize =
            Numbers.Optional.toNumber(searchParams.get(Url.Params.build(namespace, 'pageSize'))) ??
            defaultPaging.pageSize
        return {
            filters: readFilterValues(searchParams, filterDefs, namespace),
            sorting: {
                column: sortBy ?? defaultSort.column,
                direction: (dir as TableSortState['direction']) ?? defaultSort.direction,
            },
            pagination: {
                pageNumber: page,
                pageSize,
            },
        }
    }, [enabled, searchParams, filterDefs, namespace, defaultSort, defaultPaging])

    const persist = useCallback(
        (next: TableState<TFilters>, replace = true) => {
            if (!setSearchParams) return
            // Start from the current params (unrelated URL state survives) and fold in this
            // table's values, omitting anything equal to its default so the URL stays minimal.
            let params = writeFilterValues(
                new URLSearchParams(searchParams ?? undefined),
                next.filters,
                filterDefs,
                namespace,
            )
            const sortByKey = Url.Params.build(namespace, 'sortBy')
            if (next.sorting.column && next.sorting.column !== defaultSort.column) {
                params = new URLSearchParams(params)
                params.set(sortByKey, next.sorting.column)
            } else {
                params = new URLSearchParams(params)
                params.delete(sortByKey)
            }
            params = Url.Params.setIfDifferent(
                params,
                namespace,
                'dir',
                next.sorting.direction,
                defaultSort.direction,
            )
            params = Url.Params.setIfDifferent(
                params,
                namespace,
                'pageNumber',
                String(next.pagination.pageNumber),
                String(defaultPaging.pageNumber),
            )
            params = Url.Params.setIfDifferent(
                params,
                namespace,
                'pageSize',
                String(next.pagination.pageSize),
                String(defaultPaging.pageSize),
            )
            setSearchParams(params, { replace })
        },
        [setSearchParams, searchParams, filterDefs, namespace, defaultSort, defaultPaging],
    )

    return { enabled, state, persist }
}
