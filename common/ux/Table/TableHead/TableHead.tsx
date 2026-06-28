import type { ReactNode, MouseEvent } from 'react'
import { useCallback, useRef } from 'react'
import type { TableColumns, TableSelection, TableSorting } from '../Table.types'
import { TableCheckboxHeader } from '../TableCheckbox/TableCheckbox'
import { getNextSortDirection } from './TableHead.utils'
import './TableHead.styles.css'

type TableHeadProps<TData extends Record<string, ReactNode>, TContext> = {
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

const MIN_COL_WIDTH = 60

export const TableHead = <TData extends Record<string, ReactNode>, TContext>({
    columns,
    hasBreakpoints,
    hasActions,
    selection,
    sorting,
    data,
    context,
    onColumnResize,
    onColumnReorder,
}: TableHeadProps<TData, TContext>) => {
    const resizing = useRef<{
        leftIndex: number
        rightIndex: number
        startX: number
        leftStartWidth: number
        rightStartWidth: number
        leftTh: HTMLTableCellElement
        rightTh: HTMLTableCellElement
        otherColsWidth: number
        tableWidth: number
    } | null>(null)

    const handleSort = (accessor: keyof TData) => {
        if (!sorting) return
        const direction = getNextSortDirection(sorting.column, sorting.direction, accessor)
        sorting.onSortChange(accessor, direction)
    }

    const onResizeStart = useCallback(
        (e: MouseEvent, leftIndex: number) => {
            e.preventDefault()
            const handle = e.currentTarget as HTMLElement
            const th = handle.parentElement as HTMLTableCellElement
            const isLeftHandle = handle.classList.contains('th-resize-handle--left')
            const leftTh = isLeftHandle
                ? (th.previousElementSibling as HTMLTableCellElement | null)
                : th
            const rightTh = isLeftHandle
                ? th
                : (th.nextElementSibling as HTMLTableCellElement | null)
            if (!leftTh || !rightTh) return

            const table = th.closest('table') as HTMLTableElement
            const allCols = table ? Array.from(table.querySelectorAll('thead th')) : []
            const otherColsWidth = allCols.reduce((sum, col) => {
                const el = col as HTMLElement
                if (el === leftTh || el === rightTh) return sum
                return sum + (el.offsetWidth || 0)
            }, 0)
            const tableWidth = table?.offsetWidth ?? 0

            resizing.current = {
                leftIndex,
                rightIndex: leftIndex + 1,
                startX: e.clientX,
                leftStartWidth: leftTh.offsetWidth,
                rightStartWidth: rightTh.offsetWidth,
                leftTh,
                rightTh,
                otherColsWidth,
                tableWidth,
            }

            const onMouseMove = (ev: globalThis.MouseEvent) => {
                if (!resizing.current) return
                const rc = resizing.current
                const diff = ev.clientX - rc.startX

                const maxCol = Math.max(
                    MIN_COL_WIDTH,
                    rc.tableWidth - rc.otherColsWidth - MIN_COL_WIDTH,
                )
                const newLeft = Math.min(maxCol, Math.max(MIN_COL_WIDTH, rc.leftStartWidth + diff))
                const newRight = Math.min(
                    maxCol,
                    Math.max(MIN_COL_WIDTH, rc.rightStartWidth - diff),
                )

                rc.leftTh.style.width = `${newLeft}px`
                rc.leftTh.style.minWidth = `${newLeft}px`
                rc.rightTh.style.width = `${newRight}px`
                rc.rightTh.style.minWidth = `${newRight}px`
            }

            const onMouseUp = () => {
                if (resizing.current) {
                    const finalLeft = Math.max(MIN_COL_WIDTH, resizing.current.leftTh.offsetWidth)
                    const finalRight = Math.max(MIN_COL_WIDTH, resizing.current.rightTh.offsetWidth)
                    onColumnResize?.(resizing.current.leftIndex, finalLeft)
                    onColumnResize?.(resizing.current.rightIndex, finalRight)
                }
                resizing.current = null
                document.removeEventListener('mousemove', onMouseMove)
                document.removeEventListener('mouseup', onMouseUp)
            }

            document.addEventListener('mousemove', onMouseMove)
            document.addEventListener('mouseup', onMouseUp)
        },
        [onColumnResize],
    )

    const headers = columns.map((col, colIndex) => {
        const isSorted = sorting && col.isSortable && sorting.column === col.accessor
        const sortClass = isSorted ? `sorted sorted-${sorting.direction}` : ''
        const isFirst = colIndex === 0
        const isLast = colIndex === columns.length - 1

        const sortButton = col.isSortable ? (
            <button
                type="button"
                className="sort-button"
                onClick={() => handleSort(col.accessor)}
                aria-label={`Sort by ${col.header}`}
            >
                {col.header}
                <span className="sort-icon" aria-hidden="true" />
            </button>
        ) : undefined

        return (
            <th
                key={`table-header-${colIndex}`}
                scope="col"
                className={`${col.breakpoint || ''}${col.isSortable ? ` sortable ${sortClass}` : ''}${onColumnReorder ? ' has-reorder' : ''}`.trim()}
                style={col.width ? { width: col.width } : undefined}
                aria-sort={
                    isSorted
                        ? sorting.direction === 'asc'
                            ? 'ascending'
                            : 'descending'
                        : undefined
                }
            >
                <div className="th-content">
                    {onColumnReorder && (
                        <span className="th-reorder">
                            <button
                                type="button"
                                className="th-reorder-btn"
                                disabled={isFirst}
                                onClick={() => onColumnReorder(colIndex, colIndex - 1)}
                                aria-label={`Move ${col.header} left`}
                                tabIndex={-1}
                            >
                                &lt;
                            </button>
                        </span>
                    )}
                    <span className="th-label">{sortButton ?? col.header}</span>
                    {onColumnReorder && (
                        <span className="th-reorder th-reorder--right">
                            <button
                                type="button"
                                className="th-reorder-btn"
                                disabled={isLast}
                                onClick={() => onColumnReorder(colIndex, colIndex + 1)}
                                aria-label={`Move ${col.header} right`}
                                tabIndex={-1}
                            >
                                &gt;
                            </button>
                        </span>
                    )}
                </div>
                {onColumnResize && colIndex > 0 && (
                    <div
                        className="th-resize-handle th-resize-handle--left"
                        onMouseDown={(e) => onResizeStart(e, colIndex - 1)}
                    >
                        <div className="th-resize-line" />
                    </div>
                )}
                {onColumnResize && colIndex < columns.length - 1 && (
                    <div
                        className="th-resize-handle th-resize-handle--right"
                        onMouseDown={(e) => onResizeStart(e, colIndex)}
                    >
                        <div className="th-resize-line" />
                    </div>
                )}
            </th>
        )
    })

    return (
        <thead>
            <tr>
                {hasBreakpoints && <th className="expand-col" scope="col" aria-label="Expand" />}
                {selection && (
                    <TableCheckboxHeader data={data} selection={selection} context={context} />
                )}
                {headers}
                {hasActions && <th className="action-col" scope="col" aria-label="Actions" />}
            </tr>
        </thead>
    )
}
