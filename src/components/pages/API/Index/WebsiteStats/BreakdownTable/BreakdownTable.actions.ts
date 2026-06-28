import type { TableAction } from '@common/ux/Table/Table.types'
import type { BreakdownRow } from './BreakdownTable.types'

export const breakdownActions = (
    setDetailRow: (row: BreakdownRow | null) => void,
): TableAction<BreakdownRow>[] => [
    {
        id: 'details',
        label: 'Details',
        onClick: ({ row }) => setDetailRow(row),
        filter: ({ row }) => row.type === 'message' || row.type === 'error',
    },
]
