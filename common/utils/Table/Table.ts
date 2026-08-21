import { TablePagingDefaults, TablePageSizeOptions, TableSortingDefaults } from './Table.constants'
import { getPageWindow, isFirstPage, isLastPage } from './Table.utils'

/**
 * Shared table state defaults and paging helpers.
 * Reads like a sentence: `Table.Paging.defaults.pageNumber`, `Table.Sorting.defaults.column`.
 * @example
 * Table.Paging.getWindow(5, 10)       // [4, 5, 6]
 * Table.Paging.defaults               // { pageNumber: 1, pageSize: 10 }
 * Table.Sorting.defaults              // { column: '', direction: 'asc' }
 */
export const Table = {
    Paging: {
        defaults: TablePagingDefaults,
        pageSizeOptions: TablePageSizeOptions,
        getWindow: getPageWindow,
        isFirst: isFirstPage,
        isLast: isLastPage,
    },
    Sorting: {
        defaults: TableSortingDefaults,
    },
}

export { getPageWindow, isFirstPage, isLastPage }
