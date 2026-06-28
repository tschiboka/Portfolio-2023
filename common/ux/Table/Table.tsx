import {
    type ReactNode,
    isValidElement,
    useCallback,
    useEffect,
    useId,
    useRef,
    useState,
} from 'react'
import { BsInfoCircle, BsSliders2, BsArrowClockwise } from 'react-icons/bs'
import type { Table as TableProps, TableColumns } from './Table.types'
import { useHiddenBreakpoints } from './Table.hooks'
import { TableBody } from './TableBody/TableBody'
import { TableHead } from './TableHead/TableHead'
import { TableFilterPanel, type TableFilterPanelHandle } from './TableFilter/TableFilterPanel'
import { TablePagination } from './TablePagination/TablePagination'
import { TableDownloadButton } from './TableDownload/TableDownload'
import { Overlay } from '../Overlay'
import { hasLength, isNonEmpty } from '@common/utils'
import { TableSkeleton } from './TableSkeleton/TableSkeleton'
import { extractSlot } from './TableSlots/TableSlots.utils'
import { Header, Info, Legend, Filters, Download, Empty } from './TableSlots'
import './Table.styles.css'

export const Table = <TData extends Record<string, ReactNode>, TContext = unknown>({
    id,
    title,
    data = [] as TData[],
    children,
    onRefresh,
    ariaLabel,
    className,
    style,
    columns: columnsProp,
    context,
    rowAriaLabel,
    emptyState,
    isLoading,
    rowVariant,
    selection,
    enableColumnResize,
    enableColumnReorder,
    onColumnResize,
    onColumnReorder,
    controller,
    meta,
    download,
    sorting: sortingProp,
    filtering: filteringProp,
    pagination: paginationProp,
    actions: actionsProp,
}: TableProps<TData, TContext>) => {
    const { slot: headerSlot } = extractSlot(children, 'Table.Header')
    const { slot: infoSlot } = extractSlot(children, 'Table.Info')
    const { slot: legendSlot } = extractSlot(children, 'Table.Legend')
    const { slot: _downloadSlot } = extractSlot(children, 'Table.Download')

    const sorting = (controller?.sorting ?? sortingProp) as TableProps<TData, TContext>['sorting']
    const filtering = controller?.filtering ?? filteringProp
    const pagination = controller?.pagination ?? paginationProp

    const [columns, setColumns] = useState<TableColumns<TData, TContext>>(columnsProp)
    const [infoOpen, setInfoOpen] = useState(false)
    const [rowHeight, setRowHeight] = useState<number | undefined>(undefined)
    const [filtersOpen, setFiltersOpen] = useState(false)
    const columnsPropRef = useRef(columnsProp)
    const tableRef = useRef<HTMLTableElement>(null)
    const filterPanelRef = useRef<TableFilterPanelHandle>(null)

    const hasActions = isNonEmpty(actionsProp)
    const breakpoints = columns.flatMap((col) => (col.breakpoint ? [col.breakpoint] : []))
    const hiddenBreakpoints = useHiddenBreakpoints(breakpoints)
    const hasHiddenColumns = isNonEmpty(hiddenBreakpoints)
    const hiddenColumns = columns.filter((col) => hiddenBreakpoints.includes(col.breakpoint!))
    const autoId = useId()
    const baseId = id ?? autoId
    const titleId = title ? `${baseId}-title` : undefined
    const filterPanelId = `${baseId}-filters`
    const hasHeader = headerSlot || title || infoSlot || onRefresh || filtering || download
    const resolvedEmptyState = emptyState

    // Measure a non-first row height for stable skeleton (avoids :first-child extra padding skew)
    useEffect(() => {
        if (!isLoading && tableRef.current) {
            const rows = tableRef.current.querySelectorAll('tbody tr')
            const targetRow = hasLength(rows) ? rows[1] : rows[0]
            if (targetRow) {
                const h = targetRow.getBoundingClientRect().height
                if (h !== rowHeight) setRowHeight(h)
            }
        }
    }, [isLoading, rowHeight])

    // Sync internal columns when the prop reference changes (e.g. new data load)
    if (columnsProp !== columnsPropRef.current) {
        columnsPropRef.current = columnsProp
        setColumns(columnsProp)
    }

    const handleColumnResize = useCallback(
        (index: number, width: number) => onColumnResize?.(index, width),
        [onColumnResize],
    )

    const handleColumnReorder = useCallback(
        (from: number, to: number) => {
            setColumns((prev) => {
                const next = [...prev]
                const [moved] = next.splice(from, 1)
                next.splice(to, 0, moved)
                return next
            })
            onColumnReorder?.(from, to)
        },
        [onColumnReorder],
    )

    return (
        <div
            id={id}
            role="region"
            aria-label={titleId ? undefined : ariaLabel}
            aria-labelledby={titleId}
            className={`table-container ${className || ''}`}
            style={style}
        >
            {hasHeader && (
                <div className="table-header">
                    <div className="table-header__start">
                        <div className="table-title-row">
                            {title && <h2 id={titleId}>{title}</h2>}
                            {infoSlot && (
                                <button
                                    type="button"
                                    className="table-info-btn"
                                    aria-label="More information"
                                    onClick={() => setInfoOpen(true)}
                                >
                                    <BsInfoCircle />
                                </button>
                            )}
                        </div>
                        {headerSlot}
                    </div>
                    <div className="table-header__end">
                        {filtering && filtersOpen && (
                            <>
                                <button
                                    type="button"
                                    className="table-filter-submit"
                                    aria-label="Apply filters"
                                    onClick={() => filterPanelRef.current?.submit()}
                                >
                                    Filter
                                </button>
                                <button
                                    type="button"
                                    className="table-filter-reset"
                                    aria-label="Reset filters"
                                    onClick={() => filterPanelRef.current?.reset()}
                                >
                                    Reset
                                </button>
                            </>
                        )}
                        {filtering && (
                            <button
                                type="button"
                                className={`table-filter-btn${filtersOpen ? ' active' : ''}`}
                                aria-label="Toggle filters"
                                aria-expanded={filtersOpen}
                                aria-controls={filterPanelId}
                                onClick={() => setFiltersOpen((o) => !o)}
                            >
                                <BsSliders2 />
                            </button>
                        )}
                        {onRefresh && (
                            <button
                                type="button"
                                className="table-filter-btn"
                                aria-label="Refresh data"
                                onClick={onRefresh}
                            >
                                <BsArrowClockwise />
                            </button>
                        )}
                        {download && <TableDownloadButton download={download} data={data} />}
                    </div>
                </div>
            )}
            {legendSlot && <div className="table-legend">{legendSlot}</div>}
            {filtering && filtersOpen && (
                <TableFilterPanel ref={filterPanelRef} id={filterPanelId} filtering={filtering} />
            )}
            <div className="table-scroll-wrapper">
                <table
                    ref={tableRef}
                    aria-label={titleId ? undefined : ariaLabel}
                    aria-labelledby={titleId}
                    style={enableColumnResize ? { tableLayout: 'fixed' } : undefined}
                >
                    <TableHead
                        columns={columns}
                        hasBreakpoints={hasHiddenColumns}
                        hasActions={hasActions}
                        selection={selection}
                        sorting={sorting}
                        data={data}
                        context={context}
                        onColumnResize={enableColumnResize ? handleColumnResize : undefined}
                        onColumnReorder={enableColumnReorder ? handleColumnReorder : undefined}
                    />
                    {isLoading ? (
                        <tbody>
                            <TableSkeleton
                                cols={columns.length}
                                rows={pagination?.pageSize ?? 5}
                                rowHeight={rowHeight}
                            />
                        </tbody>
                    ) : (
                        <TableBody
                            data={data}
                            columns={columns}
                            context={context}
                            rowAriaLabel={rowAriaLabel}
                            hasBreakpoints={hasHiddenColumns}
                            hiddenColumns={hiddenColumns}
                            actions={actionsProp ?? []}
                            emptyState={resolvedEmptyState}
                            rowVariant={rowVariant}
                            selection={selection}
                        />
                    )}
                </table>
            </div>
            {pagination && (
                <TablePagination
                    {...pagination}
                    totalPages={meta?.totalPages ?? pagination.totalPages ?? 1}
                    totalItems={meta?.totalItems ?? pagination.totalItems}
                />
            )}
            {infoOpen && infoSlot && isValidElement(infoSlot) && (
                <Overlay.Modal
                    ariaLabel="Table information"
                    title="Table Information"
                    message={(infoSlot.props as { text?: string }).text ?? ''}
                    onClose={() => setInfoOpen(false)}
                />
            )}
        </div>
    )
}

Table.Header = Header
Table.Info = Info
Table.Legend = Legend
Table.Filters = Filters
Table.Download = Download
Table.Empty = Empty
