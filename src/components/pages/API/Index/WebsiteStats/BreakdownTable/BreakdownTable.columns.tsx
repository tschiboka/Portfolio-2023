import { CodeText } from '@ux'
import { DateTime } from '@utils'
import type { TableColumns } from '@ux'
import type { BreakdownRow } from './BreakdownTable.types'
import { ActivityTypePill } from '../ActivityTypePill/ActivityTypePill'
import type { ActivityType } from '@types'

const formatDate = (iso: string) => DateTime.Format.to('DisplayDateTime', iso) ?? iso

export const activityColumns: TableColumns<BreakdownRow> = [
    {
        header: 'Date',
        accessor: 'datetime',
        cell: (cell) => formatDate(String(cell)),
        isSortable: true,
    },
    {
        header: 'Type',
        accessor: 'type',
        cell: (type) => <ActivityTypePill type={type as ActivityType} />,
        isSortable: true,
    },
    {
        header: 'Path',
        accessor: 'path',
        cell: (path) => <CodeText>{path}</CodeText>,
        isSortable: true,
        breakpoint: 'sm',
    },
]
