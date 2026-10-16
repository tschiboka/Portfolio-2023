import type { TableColumns } from '@common-ux'
import type { XmasMessageRow } from '../Xmas.types'

export const YourMessagesColumns: TableColumns<XmasMessageRow> = [
    { header: 'Date', accessor: 'date', width: '200px' },
    { header: 'Message', accessor: 'message' },
]
