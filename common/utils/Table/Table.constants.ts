import type { Paging, TableSortState } from '@common-types'

/** First page, 10 rows — applied when no pagination is configured. */
const pagingDefaults: Paging = { pageNumber: 1, pageSize: 10 }

/** Selectable page sizes for the pagination dropdown. */
const pageSizeOptions: number[] = [5, 10, 25, 50, 100]

/** No column, ascending — applied when no sorting is configured. */
const sortingDefaults: TableSortState = { column: '', direction: 'asc' }

export const TableConstants = { pagingDefaults, pageSizeOptions, sortingDefaults }
