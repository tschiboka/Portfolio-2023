import { ReactNode } from 'react'
import {
    CellMeta,
    CellVariant,
    TableAction,
    TableColumn,
    TableColumns,
    TableSelection,
} from '../Table.types'
import { hasLength, isDefined } from '@common/utils'
import { ExpandedRow } from './ExpandedRow'
import { TableActions } from '../TableAction/TableAction'
import { TableCheckboxCell } from '../TableCheckbox/TableCheckbox'
import { getCellContent } from '../Table.utils'
import './TableRow.styles.css'

type TableRowProps<TData extends Record<string, ReactNode>, TContext> = {
    row: TData
    index: number
    data: TData[]
    columns: TableColumns<TData, TContext>
    context?: TContext
    rowAriaLabel?: string
    hasBreakpoints: boolean
    hiddenColumns: TableColumn<TData, TContext>[]
    isExpanded: boolean
    onToggle: () => void
    totalCols: number
    actions?: TableAction<TData, TContext>[]
    meta: CellMeta<TData, TContext>
    isActionDisabled: boolean
    rowVariant?: (meta: CellMeta<TData, TContext>) => CellVariant | undefined
    selection?: TableSelection<TData, TContext>
}

export const TableRow = <TData extends Record<string, ReactNode>, TContext>({
    row,
    index,
    data,
    columns,
    context,
    rowAriaLabel,
    hasBreakpoints,
    hiddenColumns,
    isExpanded,
    onToggle,
    totalCols,
    actions,
    meta,
    isActionDisabled,
    rowVariant,
    selection,
}: TableRowProps<TData, TContext>) => {
    const hasActions = hasLength(actions)

    const mainRow = (
        <tr key={`table-row-${index}`} aria-label={rowAriaLabel}>
            {hasBreakpoints && (
                <td className="expand-col">
                    <button
                        className={`expand-btn${isExpanded ? ' expanded' : ''}`}
                        type="button"
                        aria-label={isExpanded ? 'Collapse row' : 'Expand row'}
                        onClick={onToggle}
                    >
                        &#9654;
                    </button>
                </td>
            )}
            {selection && <TableCheckboxCell row={row} meta={meta} selection={selection} />}
            {columns.map((col, colIndex) => {
                const cellMeta = { cell: row[col.accessor], index, row, data, context }
                const variant =
                    typeof col.variant === 'function'
                        ? col.variant(row[col.accessor], cellMeta)
                        : (col.variant ?? rowVariant?.(cellMeta))
                const classes = [col.breakpoint, variant ? `variant-${variant}` : '']
                    .filter(Boolean)
                    .join(' ')
                return (
                    <td key={`table-row-${index}-${colIndex}`} className={classes}>
                        {getCellContent({ col, row, index, data, context })}
                    </td>
                )
            })}
            {hasActions && (
                <TableActions actions={actions!} disabled={isActionDisabled} meta={meta} />
            )}
        </tr>
    )

    if (!isExpanded || !hasLength(hiddenColumns)) return mainRow

    return (
        <>
            {mainRow}
            <ExpandedRow
                key={`table-row-${index}-expanded`}
                row={row}
                index={index}
                data={data}
                context={context}
                columns={hiddenColumns}
                colSpan={totalCols}
                hasSelection={isDefined(selection)}
            />
        </>
    )
}
