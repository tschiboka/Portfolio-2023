/** Sort direction for a table column. */
export type SortDirection = 'asc' | 'desc'

/** A table's sort state — which column is sorted and in which direction. */
export type TableSortState = {
    column: string
    direction: SortDirection
}

/** A table's pagination state — current page and rows per page. */
export type Paging = {
    pageNumber: number
    pageSize: number
}
