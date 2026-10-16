import type { Paging, TableSortState } from '@common-types'

/** First page, 10 rows — applied when no pagination is configured. */
const paging: Paging = { pageNumber: 1, pageSize: 10 }

/** No column, ascending — applied when no sorting is configured. */
const sorting: TableSortState = { column: '', direction: 'asc' }

export const TableDefaults = { paging, sorting }
