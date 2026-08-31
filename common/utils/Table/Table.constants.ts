import type { Paging, TableSortState } from '@common-types'

/** First page, 10 rows — applied when no pagination is configured. */
export const TablePagingDefaults: Paging = { pageNumber: 1, pageSize: 10 }

/** Selectable page sizes for the pagination dropdown. */
export const TablePageSizeOptions: number[] = [5, 10, 25, 50, 100]

/** No column, ascending — applied when no sorting is configured. */
export const TableSortingDefaults: TableSortState = { column: '', direction: 'asc' }
