import { isDefined } from '@common-utils'
import type { ReactNode } from 'react'
import type { Dictionary } from '@common-utils'
import type { RenderCellArgs } from './Table.types'

const getCellContent = <TData extends Dictionary<ReactNode>, TContext>({
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

const getTotalCols = (
    colCount: number,
    hasBreakpoints: boolean,
    hasActions: boolean,
    hasSelection: boolean,
): number => colCount + (hasBreakpoints ? 1 : 0) + (hasActions ? 1 : 0) + (hasSelection ? 1 : 0)

export const TableUtils = { getCellContent, getTotalCols }
