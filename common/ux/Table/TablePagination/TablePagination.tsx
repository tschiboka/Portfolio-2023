import type { TablePagination as TablePaginationProps } from '../Table.types'
import { TableDropdown } from '../TableInputs/TableDropdown'
import { Table } from '@common-utils'
import './TablePagination.styles.css'
import { isDefined } from '@common-utils'

export const TablePagination = ({
    pageNumber,
    totalPages,
    pageSize = Table.Paging.defaults.pageSize,
    pageSizeOptions = Table.Paging.pageSizeOptions,
    totalItems,
    onPageChange,
    onPageSizeChange,
}: TablePaginationProps) => {
    const start = (pageNumber - 1) * pageSize + 1
    const end = totalItems ? Math.min(pageNumber * pageSize, totalItems) : pageNumber * pageSize
    const pages = Table.Paging.getWindow(pageNumber, totalPages)
    const sizeOptions = pageSizeOptions.map((s) => ({ label: String(s), value: s }))

    return (
        <div className="table-pagination" role="navigation" aria-label="Table pagination">
            <div className="table-pagination__info">
                {isDefined(totalItems) && (
                    <span>
                        Showing{' '}
                        <span
                            className="table-pagination__range"
                            aria-label={`Items ${start} to ${end}`}
                        >
                            {start}–{end}
                        </span>{' '}
                        of{' '}
                        <span
                            className="table-pagination__total"
                            aria-label={`Total items: ${totalItems}`}
                        >
                            {totalItems}
                        </span>
                    </span>
                )}
            </div>
            <div className="table-pagination__controls">
                <div className="table-pagination__size">
                    <span>Page size</span>
                    <TableDropdown
                        options={sizeOptions}
                        value={pageSize}
                        onChange={(v) => onPageSizeChange(Number(v))}
                        ariaLabel="Page size"
                    />
                </div>
                <div className="table-pagination__nav">
                    <button
                        type="button"
                        aria-label="First page"
                        disabled={Table.Paging.isFirst(pageNumber)}
                        onClick={() => onPageChange(1)}
                    >
                        &laquo;
                    </button>
                    <button
                        type="button"
                        aria-label="Previous page"
                        disabled={Table.Paging.isFirst(pageNumber)}
                        onClick={() => onPageChange(pageNumber - 1)}
                    >
                        &lsaquo;
                    </button>
                    {pages.map((p) => (
                        <button
                            key={p}
                            type="button"
                            className={p === pageNumber ? 'active' : ''}
                            aria-label={`Page ${p}`}
                            aria-current={p === pageNumber ? 'page' : undefined}
                            onClick={() => onPageChange(p)}
                        >
                            {p}
                        </button>
                    ))}
                    <button
                        type="button"
                        aria-label="Next page"
                        disabled={Table.Paging.isLast(pageNumber, totalPages)}
                        onClick={() => onPageChange(pageNumber + 1)}
                    >
                        &rsaquo;
                    </button>
                    <button
                        type="button"
                        aria-label="Last page"
                        disabled={Table.Paging.isLast(pageNumber, totalPages)}
                        onClick={() => onPageChange(totalPages)}
                    >
                        &raquo;
                    </button>
                </div>
            </div>
        </div>
    )
}
