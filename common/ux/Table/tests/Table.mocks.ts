import { Row } from './Table.spec.types'

export const rows: Row[] = [
    { name: 'Alpha', value: '10', status: 'active', note: 'First' },
    { name: 'Beta', value: '20', status: 'inactive', note: '' },
    { name: 'Gamma', value: '30', status: 'active', note: 'Third' },
    { name: 'Delta', value: '40', status: 'pending', note: '' },
]

export const basicColumns = [
    { header: 'Name', accessor: 'name' as const },
    { header: 'Value', accessor: 'value' as const },
    { header: 'Status', accessor: 'status' as const },
]
