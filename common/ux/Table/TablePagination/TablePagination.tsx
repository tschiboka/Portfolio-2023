import type { TablePagination as TablePaginationProps } from '../Table.types'
import { TableDropdown } from '../TableInputs/TableDropdown'
import {
    DEFAULT_PAGE_SIZE,
    DEFAULT_PAGE_SIZE_OPTIONS,
    getPageWindow,
    isFirstPage,
    isLastPage,
} from './TablePagination.utils'
import './TablePagination.styles.css'
import { isDefined } from '@common/utils/Predicate/Predicate'

export const TablePagination = ({
    page,
    totalPages,
    pageSize = DEFAULT_PAGE_SIZE,
    pageSizeOptions = DEFAULT_PAGE_SIZE_OPTIONS,
    totalItems,
    onPageChange,
    onPageSizeChange,
}: TablePaginationProps) => {
    const start = (page - 1) * pageSize + 1
    const end = totalItems ? Math.min(page * pageSize, totalItems) : page * pageSize
    const pages = getPageWindow(page, totalPages)
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
                        disabled={isFirstPage(page)}
                        onClick={() => onPageChange(1)}
                    >
                        &laquo;
                    </button>
                    <button
                        type="button"
                        aria-label="Previous page"
                        disabled={isFirstPage(page)}
                        onClick={() => onPageChange(page - 1)}
                    >
                        &lsaquo;
                    </button>
                    {pages.map((p) => (
                        <button
                            key={p}
                            type="button"
                            className={p === page ? 'active' : ''}
                            aria-label={`Page ${p}`}
                            aria-current={p === page ? 'page' : undefined}
                            onClick={() => onPageChange(p)}
                        >
                            {p}
                        </button>
                    ))}
                    <button
                        type="button"
                        aria-label="Next page"
                        disabled={isLastPage(page, totalPages)}
                        onClick={() => onPageChange(page + 1)}
                    >
                        &rsaquo;
                    </button>
                    <button
                        type="button"
                        aria-label="Last page"
                        disabled={isLastPage(page, totalPages)}
                        onClick={() => onPageChange(totalPages)}
                    >
                        &raquo;
                    </button>
                </div>
            </div>
        </div>
    )
}
