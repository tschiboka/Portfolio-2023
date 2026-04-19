import { type ReactNode, useId, useState } from 'react'
import { BsInfoCircle, BsSliders2 } from 'react-icons/bs'
import type { Table as TableProps } from './Table.types'
import { useHiddenBreakpoints } from './Table.hooks'
import { TableBody } from './TableBody/TableBody'
import { TableHead } from './TableHead/TableHead'
import { TableDownloadButton } from './TableDownload/TableDownload'
import { TableFilterPanel } from './TableFilter/TableFilterPanel'
import { TablePagination } from './TablePagination/TablePagination'
import './Table.styles.css'
import { isNonEmpty } from '@common/utils'

export const Table = <TData extends Record<string, ReactNode>, TContext = unknown>({
    id,
    data,
    title,
    description,
    onInfo,
    legend,
    ariaLabel,
    className,
    style,
    columns,
    context,
    rowAriaLabel,
    actions,
    emptyState,
    rowVariant,
    selection,
    sorting,
    filtering,
    download,
    pagination,
}: TableProps<TData, TContext>) => {
    const breakpoints = columns.flatMap((col) => (col.breakpoint ? [col.breakpoint] : []))
    const hiddenBreakpoints = useHiddenBreakpoints(breakpoints)
    const hasHiddenColumns = isNonEmpty(hiddenBreakpoints)
    const hiddenColumns = columns.filter((col) => hiddenBreakpoints.includes(col.breakpoint!))
    const autoId = useId()
    const baseId = id ?? autoId
    const titleId = title ? `${baseId}-title` : undefined
    const descriptionId = description ? `${baseId}-desc` : undefined
    const filterPanelId = `${baseId}-filters`
    const hasHeader = title || description || onInfo || filtering || download
    const [filtersOpen, setFiltersOpen] = useState(false)
    const [filterResetKey, setFilterResetKey] = useState(0)

    return (
        <div
            id={id}
            role="region"
            aria-label={ariaLabel}
            aria-labelledby={titleId}
            className={`table-container ${className || ''}`}
            style={style}
        >
            {hasHeader && (
                <div className="table-header">
                    <div className="table-header__start">
                        <div className="table-title-row">
                            {title && <h2 id={titleId}>{title}</h2>}
                            {onInfo && (
                                <button
                                    type="button"
                                    className="table-info-btn"
                                    aria-label="More information"
                                    onClick={onInfo}
                                >
                                    <BsInfoCircle />
                                </button>
                            )}
                        </div>
                        {description && (
                            <div id={descriptionId} className="table-description">
                                {description}
                            </div>
                        )}
                    </div>
                    <div className="table-header__end">
                        {filtering && filtersOpen && (
                            <button
                                type="button"
                                className="table-filter-reset"
                                aria-label="Reset filters"
                                onClick={() => {
                                    setFilterResetKey((k) => k + 1)
                                }}
                            >
                                Reset
                            </button>
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
                        {download && <TableDownloadButton download={download} data={data} />}
                    </div>
                </div>
            )}
            {legend && <div className="table-legend">{legend}</div>}
            {filtering && filtersOpen && (
                <TableFilterPanel
                    id={filterPanelId}
                    filtering={filtering}
                    resetKey={filterResetKey}
                />
            )}
            <table
                aria-label={titleId ? undefined : ariaLabel}
                aria-labelledby={titleId}
                aria-describedby={descriptionId}
            >
                <TableHead
                    columns={columns}
                    hasBreakpoints={hasHiddenColumns}
                    hasActions={isNonEmpty(actions)}
                    selection={selection}
                    sorting={sorting}
                    data={data}
                    context={context}
                />
                <TableBody
                    data={data}
                    columns={columns}
                    context={context}
                    rowAriaLabel={rowAriaLabel}
                    hasBreakpoints={hasHiddenColumns}
                    hiddenColumns={hiddenColumns}
                    actions={actions}
                    emptyState={emptyState}
                    rowVariant={rowVariant}
                    selection={selection}
                />
            </table>
            {pagination && <TablePagination {...pagination} />}
        </div>
    )
}
