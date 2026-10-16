import type { TableColumns } from '@common-ux'
import type { BreakdownRow } from './BreakdownPreview.types'

export const BreakdownPreviewColumns: TableColumns<BreakdownRow> = [
    { header: 'Path', accessor: 'path' },
    { header: 'Today', accessor: 'today' },
    { header: 'Total', accessor: 'total' },
]
