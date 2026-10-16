import type { ReactNode } from 'react'
import type { CellMeta, TableSelection } from '../Table.types'
import './TableCheckbox.styles.css'

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
