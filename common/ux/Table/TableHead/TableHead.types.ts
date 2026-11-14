import type { ReactNode } from 'react'
import type { Dictionary } from '@common-utils'
import type { TableColumns, TableSelection, TableSorting } from '../Table.types'

export type TableHeadProps<TData extends Dictionary<ReactNode>, TContext> = {
    columns: TableColumns<TData, TContext>
    hasBreakpoints: boolean
    hasActions: boolean
    selection?: TableSelection<TData, TContext>
    sorting?: TableSorting<TData>
    data: TData[]
    context?: TContext
    onColumnResize?: (columnIndex: number, width: number) => void
    onColumnReorder?: (fromIndex: number, toIndex: number) => void
}

/** The columns and pointer state a resize drag carries between mousemove events. */
export type ResizeState = {
    leftIndex: number
    rightIndex: number
    startX: number
    leftStartWidth: number
    rightStartWidth: number
    leftTh: HTMLTableCellElement
    rightTh: HTMLTableCellElement
    otherColsWidth: number
    tableWidth: number
}
