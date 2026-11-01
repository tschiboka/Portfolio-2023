import type { FullRow, Row } from './Table.spec.types'
import type { TableColumns } from '../Table.types'

const rows: Row[] = [
    { name: 'Alpha', value: '10', status: 'active', note: 'First' },
    { name: 'Beta', value: '20', status: 'inactive', note: '' },
    { name: 'Gamma', value: '30', status: 'active', note: 'Third' },
    { name: 'Delta', value: '40', status: 'pending', note: '' },
]

const basicColumns = [
    { header: 'Name', accessor: 'name' as const },
    { header: 'Value', accessor: 'value' as const },
    { header: 'Status', accessor: 'status' as const },
]

const selectorRows: Row[] = [
    { name: 'A', value: '1', status: 'active', note: '' },
    { name: 'B', value: '2', status: 'inactive', note: '' },
    { name: 'C', value: '3', status: 'active', note: '' },
]

const baseSelection = {
    getRowId: (r: Row) => r.name,
    selectedRowIds: [] as string[],
    onChange: vi.fn(),
}

const fullData: FullRow[] = [
    {
        id: '1',
        name: 'Alice',
        email: 'alice@test.com',
        role: 'Admin',
        status: 'active',
        note: 'Lead',
    },
    { id: '2', name: 'Bob', email: 'bob@test.com', role: 'Editor', status: 'active', note: '' },
    {
        id: '3',
        name: 'Charlie',
        email: 'charlie@test.com',
        role: 'Viewer',
        status: 'inactive',
        note: 'On leave',
    },
    {
        id: '4',
        name: 'Diana',
        email: 'diana@test.com',
        role: 'Editor',
        status: 'pending',
        note: '',
    },
    {
        id: '5',
        name: 'Eve',
        email: 'eve@test.com',
        role: 'Viewer',
        status: 'active',
        note: 'New hire',
    },
]

const fullColumns: TableColumns<FullRow> = [
    { header: 'Name', accessor: 'name' as const, isSortable: true },
    { header: 'Email', accessor: 'email' as const, breakpoint: 'lg' as const },
    { header: 'Role', accessor: 'role' as const, isSortable: true },
    { header: 'Status', accessor: 'status' as const },
    {
        header: 'Note',
        accessor: 'note' as const,
        defaultValue: 'N/A',
        breakpoint: 'xl' as const,
    },
]

export const TableMocks = { rows, basicColumns, selectorRows, baseSelection, fullData, fullColumns }
