import { ReactNode } from 'react'
import { TableColumns } from '../Table.types'
import { getCellContent } from '../Table.utils'
import { Stack } from '../../Layout'

type ExpandedRowProps<TData extends Record<string, ReactNode>, TContext> = {
    row: TData
    index: number
    data: TData[]
    context?: TContext
    columns: TableColumns<TData, TContext>
    colSpan: number
    hasSelection: boolean
}

export const ExpandedRow = <TData extends Record<string, ReactNode>, TContext>({
    row,
    index,
    data,
    context,
    columns,
    colSpan,
    hasSelection,
}: ExpandedRowProps<TData, TContext>) => {
    const spacerCols = 1 + (hasSelection ? 1 : 0)
    return (
        <tr className="expanded-row" aria-label={`Expanded details for row ${index + 1}`}>
            <td className="expand-col" aria-hidden="true" />
            {hasSelection && <td aria-hidden="true" />}
            <td className="expanded-row-content" colSpan={colSpan - spacerCols}>
                <Stack.Vertical as="dl" gap="8" className="expanded-row-list">
                    {columns.map((col, colIndex) => (
                        <Stack.Horizontal
                            key={`expanded-${index}-${colIndex}`}
                            className="expanded-row-item"
                            gap="8"
                        >
                            <dt>{col.header}</dt>
                            <dd>{getCellContent({ col, row, index, data, context })}</dd>
                        </Stack.Horizontal>
                    ))}
                </Stack.Vertical>
            </td>
        </tr>
    )
}
