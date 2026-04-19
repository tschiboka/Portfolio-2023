import type { ReactNode } from 'react'
import type { CellMeta, TableSelection } from '../Table.types'
import { getAllSelected, getSelectableIds } from './TableCheckbox.selectors'
import './TableCheckbox.styles.css'

type TableCheckboxHeaderProps<TData extends Record<string, ReactNode>, TContext> = {
    data: TData[]
    selection: TableSelection<TData, TContext>
    context?: TContext
}

export const TableCheckboxHeader = <TData extends Record<string, ReactNode>, TContext>({
    data,
    selection,
    context,
}: TableCheckboxHeaderProps<TData, TContext>) => {
    const { mode = 'multiple', selectedRowIds, onChange } = selection
    const ctx = { data, selection, context }

    const selectableIds = getSelectableIds(ctx)
    const allSelected = getAllSelected(ctx)

    if (mode === 'single') return <th className="select-col" scope="col" aria-label="Select" />

    const handleToggleAll = () => {
        if (allSelected) {
            onChange(selectedRowIds.filter((id) => !selectableIds.includes(id)))
        } else {
            onChange([...new Set([...selectedRowIds, ...selectableIds])])
        }
    }

    return (
        <th className="select-col" scope="col">
            <input
                type="checkbox"
                className="select-checkbox"
                checked={allSelected}
                aria-label="Select all rows"
                disabled={selectableIds.length === 0}
                onChange={handleToggleAll}
            />
        </th>
    )
}

type TableCheckboxCellProps<TData extends Record<string, ReactNode>, TContext> = {
    row: TData
    meta: CellMeta<TData, TContext>
    selection: TableSelection<TData, TContext>
}

export const TableCheckboxCell = <TData extends Record<string, ReactNode>, TContext>({
    row,
    meta,
    selection,
}: TableCheckboxCellProps<TData, TContext>) => {
    const { mode = 'multiple', getRowId, selectedRowIds, onChange, isRowSelectable } = selection
    const rowId = getRowId(row)
    const isSelected = selectedRowIds.includes(rowId)
    const isDisabled = isRowSelectable ? !isRowSelectable(meta) : false

    const handleToggle = () => {
        if (mode === 'single') {
            onChange(isSelected ? [] : [rowId])
        } else {
            onChange(
                isSelected
                    ? selectedRowIds.filter((id) => id !== rowId)
                    : [...selectedRowIds, rowId],
            )
        }
    }

    return (
        <td className="select-col">
            <input
                type="checkbox"
                className="select-checkbox"
                checked={isSelected}
                disabled={isDisabled}
                aria-label={`Select row ${meta.index + 1}`}
                onChange={handleToggle}
            />
        </td>
    )
}
