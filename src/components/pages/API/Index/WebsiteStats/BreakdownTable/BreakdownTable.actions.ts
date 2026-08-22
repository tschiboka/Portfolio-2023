import type { TableAction } from '@common/ux/Table/Table.types'
import type { Nullable } from '@common/utils'
import type { BreakdownRow } from './BreakdownTable.types'

export const breakdownActions = (
    setDetailRow: (row: Nullable<BreakdownRow>) => void,
): TableAction<BreakdownRow>[] => [
    {
        id: 'details',
        label: 'Details',
        onClick: ({ row }) => setDetailRow(row),
        filter: ({ row }) => row.type === 'message' || row.type === 'error',
    },
]
