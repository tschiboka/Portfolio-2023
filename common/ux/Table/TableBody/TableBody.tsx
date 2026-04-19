import { ReactNode, useState } from 'react'
import {
    CellVariant,
    CellMeta,
    TableAction,
    TableColumn,
    TableColumns,
    TableSelection,
} from '../Table.types'
import { hasLength } from '@common/utils'
import { TableRow } from '../TableRow/TableRow'
import { getTotalCols } from '../Table.utils'
import './TableBody.styles.css'

type TableBodyProps<TData extends Record<string, ReactNode>, TContext> = {
    data: TData[]
    columns: TableColumns<TData, TContext>
    context?: TContext
    rowAriaLabel?: string
    hasBreakpoints: boolean
    hiddenColumns: TableColumn<TData, TContext>[]
    actions?: TableAction<TData, TContext>[]
    emptyState?: ReactNode
    rowVariant?: (meta: CellMeta<TData, TContext>) => CellVariant | undefined
    selection?: TableSelection<TData, TContext>
}

export const TableBody = <TData extends Record<string, ReactNode>, TContext>({
    data,
    columns,
    context,
    rowAriaLabel,
    hasBreakpoints,
    hiddenColumns,
    actions,
    emptyState,
    rowVariant,
    selection,
}: TableBodyProps<TData, TContext>) => {
    const [expandedRows, setExpandedRows] = useState<number[]>([])

    const toggleRow = (index: number) =>
        setExpandedRows((prev) =>
            prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
        )

    const hasActions = hasLength(actions)
    const totalCols = getTotalCols(columns.length, hasBreakpoints, hasActions, !!selection)

    const rows = data.map((row, index) => {
        const meta = {
            cell: row[columns[0].accessor],
            index,
            row,
            data,
            context,
        }
        const isActionDisabled = columns.some((col) => col.isActionDisabled?.(meta))

        return (
            <TableRow
                key={`table-row-${index}`}
                row={row}
                index={index}
                data={data}
                columns={columns}
                context={context}
                rowAriaLabel={rowAriaLabel}
                hasBreakpoints={hasBreakpoints}
                hiddenColumns={hiddenColumns}
                isExpanded={expandedRows.includes(index)}
                onToggle={() => toggleRow(index)}
                totalCols={totalCols}
                actions={actions}
                meta={meta}
                isActionDisabled={isActionDisabled}
                rowVariant={rowVariant}
                selection={selection}
            />
        )
    })

    return (
        <tbody>
            {hasLength(rows) ? (
                rows
            ) : (
                <tr>
                    <td colSpan={totalCols} role="status">
                        {emptyState ?? 'No data'}
                    </td>
                </tr>
            )}
        </tbody>
    )
}
