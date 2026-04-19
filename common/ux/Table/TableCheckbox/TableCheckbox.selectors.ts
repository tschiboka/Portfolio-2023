import type { ReactNode } from 'react'
import type { CellMeta, TableSelection } from '../Table.types'
import { hasLength } from '@common/utils'

type SelectionContext<TData extends Record<string, ReactNode>, TContext> = {
    data: TData[]
    selection: TableSelection<TData, TContext>
    context?: TContext
}

export const getSelectableRows = <TData extends Record<string, ReactNode>, TContext>({
    data,
    selection,
    context,
}: SelectionContext<TData, TContext>): TData[] => {
    const { isRowSelectable } = selection
    if (!isRowSelectable) return data

    return data.filter((row, index) => {
        const meta: CellMeta<TData, TContext> = {
            cell: Object.values(row)[0] as TData[keyof TData],
            index,
            row,
            data,
            context,
        }
        return isRowSelectable(meta)
    })
}

export const getSelectableIds = <TData extends Record<string, ReactNode>, TContext>(
    ctx: SelectionContext<TData, TContext>,
): string[] => getSelectableRows(ctx).map(ctx.selection.getRowId)

export const getAllSelected = <TData extends Record<string, ReactNode>, TContext>(
    ctx: SelectionContext<TData, TContext>,
): boolean => {
    const ids = getSelectableIds(ctx)
    return hasLength(ids) && ids.every((id) => ctx.selection.selectedRowIds.includes(id))
}
