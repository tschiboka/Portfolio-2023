import type { ReactNode } from 'react'
import type { TableColumns, TableSelection, TableSorting } from '../Table.types'
import { TableCheckboxHeader } from '../TableCheckbox/TableCheckbox'
import { getNextSortDirection } from './TableHead.utils'
import './TableHead.styles.css'

type TableHeadProps<TData extends Record<string, ReactNode>, TContext> = {
    columns: TableColumns<TData, TContext>
    hasBreakpoints: boolean
    hasActions: boolean
    selection?: TableSelection<TData, TContext>
    sorting?: TableSorting<TData>
    data: TData[]
    context?: TContext
}

export const TableHead = <TData extends Record<string, ReactNode>, TContext>({
    columns,
    hasBreakpoints,
    hasActions,
    selection,
    sorting,
    data,
    context,
}: TableHeadProps<TData, TContext>) => {
    const handleSort = (accessor: keyof TData) => {
        if (!sorting) return
        const direction = getNextSortDirection(sorting.column, sorting.direction, accessor)
        sorting.onSortChange(accessor, direction)
    }

    const headers = columns.map((col, colIndex) => {
        const isSorted = sorting && col.isSortable && sorting.column === col.accessor
        const sortClass = isSorted ? `sorted sorted-${sorting.direction}` : ''

        return col.isSortable ? (
            <th
                key={`table-header-${colIndex}`}
                scope="col"
                className={`${col.breakpoint || ''} sortable ${sortClass}`.trim()}
                aria-sort={
                    isSorted
                        ? sorting.direction === 'asc'
                            ? 'ascending'
                            : 'descending'
                        : undefined
                }
            >
                <button
                    type="button"
                    className="sort-button"
                    onClick={() => handleSort(col.accessor)}
                    aria-label={`Sort by ${col.header}`}
                >
                    {col.header}
                    <span className="sort-icon" aria-hidden="true" />
                </button>
            </th>
        ) : (
            <th key={`table-header-${colIndex}`} scope="col" className={col.breakpoint || ''}>
                {col.header}
            </th>
        )
    })

    return (
        <thead>
            <tr>
                {hasBreakpoints && <th className="expand-col" scope="col" aria-label="Expand" />}
                {selection && (
                    <TableCheckboxHeader data={data} selection={selection} context={context} />
                )}
                {headers}
                {hasActions && <th className="action-col" scope="col" aria-label="Actions" />}
            </tr>
        </thead>
    )
}
