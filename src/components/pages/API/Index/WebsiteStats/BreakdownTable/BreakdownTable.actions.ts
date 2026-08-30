import type { Nullable } from '@utils'
import type { BreakdownRow } from './BreakdownTable.types'
import { TableAction } from '@ux'

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
