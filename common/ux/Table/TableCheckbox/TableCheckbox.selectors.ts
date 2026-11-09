import { hasLength, includesAll } from '@common-utils'
import type { ReactNode } from 'react'
import type { Dictionary, ValueOf } from '@common-utils'
import type { CellMeta, TableSelection } from '../Table.types'

type SelectionContext<TData extends Dictionary<ReactNode>, TContext> = {
    data: TData[]
    selection: TableSelection<TData, TContext>
    context?: TContext
}

const getSelectableRows = <TData extends Dictionary<ReactNode>, TContext>({
    data,
    selection,
    context,
}: SelectionContext<TData, TContext>): TData[] => {
    const { isRowSelectable } = selection
    if (!isRowSelectable) return data

    return data.filter((row, index) => {
        const meta: CellMeta<TData, TContext> = {
            cell: Object.values(row)[0] as ValueOf<TData>,
            index,
            row,
            data,
            context,
        }
        return isRowSelectable(meta)
    })
}

const getSelectableIds = <TData extends Dictionary<ReactNode>, TContext>(
    ctx: SelectionContext<TData, TContext>,
): string[] => getSelectableRows(ctx).map(ctx.selection.getRowId)

const getAllSelected = <TData extends Dictionary<ReactNode>, TContext>(
    ctx: SelectionContext<TData, TContext>,
): boolean => {
    const ids = getSelectableIds(ctx)
    return hasLength(ids) && includesAll(ids, ctx.selection.selectedRowIds)
}

export const TableCheckboxSelectors = { getSelectableRows, getSelectableIds, getAllSelected }
