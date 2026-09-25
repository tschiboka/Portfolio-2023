import type { TableColumns } from '@common-ux'
import type { XmasMessageRow } from '../Xmas2025.types'

export const MessageWallColumns: TableColumns<XmasMessageRow> = [
    { header: 'Date', accessor: 'date', width: '200px' },
    { header: 'Name', accessor: 'name' },
    { header: 'Message', accessor: 'message' },
]
