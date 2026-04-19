import { getParentCategory } from './Categories.utils'
import type { TableColumns } from '@common/ux/Table/Table.types'
import type { GetCategoryResponse } from '@common/types'

export const columns: TableColumns<GetCategoryResponse> = [
    { header: 'Name', accessor: 'name' },
    {
        header: 'Parent',
        accessor: 'parentId',
        cell: getParentCategory,
    },
    { header: 'Description', accessor: 'description', breakpoint: 'md' },
    { header: 'Icon', accessor: 'icon' },
    { header: 'Color', accessor: 'color' },
]
