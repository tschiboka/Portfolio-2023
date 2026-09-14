// @ts-nocheck — skill example, outside the tsconfig include.

import type { TableFiltering, TablePagination, TableSorting } from '@common-ux'

import type { FeatureRow } from './Feature.types'

/** Table config beyond the columns — sort, filter, page. */
export const FeatureTable = {
    sorting: (): TableSorting<FeatureRow> => ({
        column: 'prop1',
        direction: 'asc',
        onSortChange: (column, direction) => column,
    }),
    filtering: (): TableFiltering => ({
        inputs: [{ key: 'filter1', type: 'text', label: 'Filter 1' }],
        onFilter: (values) => values,
    }),
    pagination: (): TablePagination => ({
        page: 1,
        pageSize: 10,
        onPageChange: (page) => page,
    }),
}
