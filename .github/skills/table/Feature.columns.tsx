// @ts-nocheck — skill example, outside the tsconfig include.

import { CodeText } from '@common-ux'
import { DateTime } from '@common-utils'
import type { TableColumns } from '@common-ux'
import type { FeatureRow } from './Feature.types'

const formatValue = (iso: string) => DateTime.Format.to('DisplayDateTime', iso) ?? iso

export const FeatureColumns: TableColumns<FeatureRow> = [
    {
        header: 'Header 1',
        accessor: 'prop1',
        cell: (value) => formatValue(String(value)),
        isSortable: true,
    },
    {
        header: 'Header 2',
        accessor: 'prop2',
        cell: (value) => <CodeText>{value}</CodeText>,
        isSortable: true,
        breakpoint: 'sm',
    },
]
