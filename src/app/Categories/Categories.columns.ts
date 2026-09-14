import { type ReactNode } from 'react'
import { CellMeta, CellValue, TableColumns } from '@common-ux'
import type { GetCategoryResponse } from '@common-types'

const getParentCategory = (
    cell: CellValue<GetCategoryResponse>,
    { data }: CellMeta<GetCategoryResponse>,
): ReactNode => data.find((c) => c._id === cell)?.name

export const CategoriesColumns: TableColumns<GetCategoryResponse> = [
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
