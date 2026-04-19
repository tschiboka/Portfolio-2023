import type { ReactNode } from 'react'
import type { TableColumn } from './Table.types'
import { isDefined } from '@common/utils'

type RenderCellArgs<TData extends Record<string, ReactNode>, TContext> = {
    col: TableColumn<TData, TContext>
    row: TData
    index: number
    data: TData[]
    context?: TContext
}

export const getCellContent = <TData extends Record<string, ReactNode>, TContext>({
    col,
    row,
    index,
    data,
    context,
}: RenderCellArgs<TData, TContext>): ReactNode => {
    const value = row[col.accessor]

    if (col.cell) return col.cell(value, { cell: value, context, row, index, data })

    return isDefined(value) && value !== '' ? value : (col.defaultValue ?? '-')
}

export const getTotalCols = (
    colCount: number,
    hasBreakpoints: boolean,
    hasActions: boolean,
    hasSelection: boolean,
): number => colCount + (hasBreakpoints ? 1 : 0) + (hasActions ? 1 : 0) + (hasSelection ? 1 : 0)
