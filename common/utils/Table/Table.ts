import { TableDefaults } from './Table.defaults'
import { TableOptions } from './Table.options'
import { TableUtils } from './Table.utils'

const { getPageWindow, isFirstPage, isLastPage } = TableUtils

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
        defaults: TableDefaults.paging,
        pageSizeOptions: TableOptions.pageSizes,
        getWindow: getPageWindow,
        isFirst: isFirstPage,
        isLast: isLastPage,
    },
    Sorting: {
        defaults: TableDefaults.sorting,
    },
}

export { TableUtils }
