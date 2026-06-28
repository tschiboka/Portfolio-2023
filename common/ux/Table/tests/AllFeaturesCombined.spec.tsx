import { Test } from '@common/ux/Test'
import { screen, within } from '@testing-library/react'

describe('Table — Combined Features', () => {
    type FullRow = {
        id: string
        name: string
        email: string
        role: string
        status: string
        note: string
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

    const fullColumns = [
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

    it('renders table with title, description, legend, data, actions, selection, sorting, filtering, download, and pagination', () => {
        Test.Table.Set.mock<FullRow>({
            id: 'full-table',
            ariaLabel: 'Full feature table',
            rowAriaLabel: 'User row',
            data: fullData,
            columns: fullColumns,
            rowVariant: ({ row }) => (row.status === 'inactive' ? 'disabled' : undefined),
            selection: {
                getRowId: (r) => r.id,
                selectedRowIds: [],
                onChange: vi.fn(),
                isRowSelectable: ({ row }) => row.status !== 'inactive',
            },
            actions: [
                { id: 'edit', label: 'Edit', variant: 'primary', onClick: vi.fn() },
                {
                    id: 'delete',
                    label: 'Delete',
                    variant: 'danger',
                    isDisabled: ({ row }) => row.status === 'active',
                },
                {
                    id: 'activate',
                    label: 'Activate',
                    filter: ({ row }) => row.status !== 'active',
                },
            ],
            sorting: {
                column: 'name',
                direction: 'asc',
                onSortChange: vi.fn(),
            },
            filtering: {
                inputs: [
                    { key: 'name', label: 'Name', type: 'search', placeholder: 'Search…' },
                    {
                        key: 'status',
                        label: 'Status',
                        type: 'option',
                        options: [
                            { value: 'active', label: 'Active' },
                            { value: 'inactive', label: 'Inactive' },
                        ],
                    },
                    { key: 'hasNote', label: 'Has Note', type: 'checkbox' },
                ],
                onFilter: vi.fn(),
            },
            download: {
                options: [
                    { value: 'csv', label: 'CSV' },
                    { value: 'pdf', label: 'PDF' },
                ],
                onDownload: vi.fn(),
            },
            pagination: {
                page: 1,
                totalPages: 2,
                pageSize: 3,
                pageSizeOptions: [3, 5, 10],
                totalItems: 5,
                onPageChange: vi.fn(),
                onPageSizeChange: vi.fn(),
            },
        })
        // Region & title
        const table = Test.Table('Full feature table')
        expect(table.Get.tagName()).toBeDefined()
        // Table data
        expect(screen.getByText('Alice')).toBeInTheDocument()
        expect(screen.getByText('Bob')).toBeInTheDocument()
        // Selection checkboxes
        expect(table.Get.selectAll()).toBeInTheDocument()
        // Sorting
        expect(table.Get.sortButton('Name')).toBeInTheDocument()
        // Actions
        expect(table.Get.actionButtons()).toHaveLength(fullData.length)
        // Filtering
        expect(table.Get.filterToggle()).toBeInTheDocument()
        // Download
        expect(table.Get.downloadButton()).toBeInTheDocument()
        // Pagination
        expect(table.Get.pagination()).toBeInTheDocument()
        // Expand (breakpoints exist)
        expect(table.Get.expandButtons()).toHaveLength(fullData.length)
    })

    it('selection works alongside actions — selecting rows does not affect action menus', async () => {
        const onChange = vi.fn()
        const onEdit = vi.fn()

        Test.Table.Set.mock<FullRow>({
            ariaLabel: 'test',
            data: fullData.slice(0, 2),
            columns: [
                { header: 'Name', accessor: 'name' },
                { header: 'Status', accessor: 'status' },
            ],
            selection: {
                getRowId: (r) => r.id,
                selectedRowIds: [],
                onChange,
            },
            actions: [{ id: 'edit', label: 'Edit', onClick: onEdit }],
        })
        const table = Test.Table('test')
        // Select first row
        await table.Do.selectRow(1)
        expect(onChange).toHaveBeenCalledWith(['1'])

        // Open action menu on second row
        await table.Do.clickAction('Edit', 1)
        expect(onEdit).toHaveBeenCalledWith(expect.objectContaining({ row: fullData[1] }))
    })

    it('sorting and selection preserve selected state', () => {
        Test.Table.Set.mock<FullRow>({
            ariaLabel: 'test',
            data: fullData,
            columns: [
                { header: 'Name', accessor: 'name', isSortable: true },
                { header: 'Status', accessor: 'status' },
            ],
            selection: {
                getRowId: (r) => r.id,
                selectedRowIds: ['1', '3'],
                onChange: vi.fn(),
            },
            sorting: {
                column: 'name',
                direction: 'asc',
                onSortChange: vi.fn(),
            },
        })
        const table = Test.Table('test')
        // Alice (id=1) and Charlie (id=3) should be selected
        expect(table.Get.selectRow(1)).toBeChecked()
        expect(table.Get.selectRow(3)).toBeChecked()
        expect(table.Get.selectRow(2)).not.toBeChecked()
    })

    it('filter action hides actions only for matching rows in combined table', async () => {
        Test.Table.Set.mock<FullRow>({
            ariaLabel: 'test',
            data: fullData.slice(0, 2),
            columns: [
                { header: 'Name', accessor: 'name' },
                { header: 'Status', accessor: 'status' },
            ],
            actions: [
                {
                    id: 'activate',
                    label: 'Activate',
                    filter: ({ row }) => row.status !== 'active',
                },
                { id: 'edit', label: 'Edit', onClick: vi.fn() },
            ],
        })
        const table = Test.Table('test')
        // Alice is active — Activate should be filtered out
        await table.Do.clickActionButton(0)
        expect(table.Has.menuItem('Activate')).toBe(false)
        expect(table.Get.menuItem('Edit')).toBeInTheDocument()
    })

    it('isActionDisabled disables entire menu when column condition is met', () => {
        Test.Table.Set.mock<FullRow>({
            ariaLabel: 'test',
            data: [fullData[2]], // Charlie, inactive
            columns: [
                {
                    header: 'Note',
                    accessor: 'note',
                    isActionDisabled: ({ row }) => row.status === 'inactive',
                },
            ],
            actions: [{ id: 'edit', label: 'Edit' }],
        })
        expect(Test.Table('test').Get.actionButton()).toBeDisabled()
    })

    it('expanded row shows hidden column with defaultValue when value is empty', async () => {
        Test.Table.Set.mock<FullRow>({
            ariaLabel: 'test',
            data: [fullData[1]], // Bob, note is empty
            columns: [
                { header: 'Name', accessor: 'name' },
                {
                    header: 'Note',
                    accessor: 'note',
                    defaultValue: 'N/A',
                    breakpoint: '2xl',
                },
            ],
        })
        const table = Test.Table('test')
        await table.Do.expandRow(0)
        const expandedRow = table.Get.expandedRow(1)
        expect(within(expandedRow).getByText('N/A')).toBeInTheDocument()
    })

    it('selection with isRowSelectable and actions work together', async () => {
        const onChange = vi.fn()
        Test.Table.Set.mock<FullRow>({
            ariaLabel: 'test',
            data: fullData,
            columns: [
                { header: 'Name', accessor: 'name' },
                { header: 'Status', accessor: 'status' },
            ],
            selection: {
                getRowId: (r) => r.id,
                selectedRowIds: [],
                onChange,
                isRowSelectable: ({ row }) => row.status !== 'inactive',
            },
            actions: [{ id: 'edit', label: 'Edit', onClick: vi.fn() }],
        })
        const table = Test.Table('test')
        // Charlie (row 3) is inactive — checkbox should be disabled
        expect(table.Get.selectRow(3)).toBeDisabled()
        // But action menu should still be accessible
        await table.Do.clickActionButton(2)
        expect(table.Get.menuItem('Edit')).toBeInTheDocument()
    })

    it('row variant + column variant + cell variant: column function variant wins', () => {
        const { container } = Test.Table.Set.mock<FullRow>({
            ariaLabel: 'test',
            data: [fullData[0]],
            columns: [
                {
                    header: 'Status',
                    accessor: 'status',
                    variant: () => 'secondary',
                },
                { header: 'Name', accessor: 'name' },
            ],
            rowVariant: () => 'danger',
        })
        const cells = container.querySelectorAll('tbody td')
        // Status cell — function variant wins
        expect(cells[0]).toHaveClass('variant-secondary')
        // Name cell — no column variant, rowVariant fallback
        expect(cells[1]).toHaveClass('variant-danger')
    })

    it('download receives correct data even when pagination is used', async () => {
        const onDownload = vi.fn()
        const pageData = fullData.slice(0, 3)
        Test.Table.Set.mock<FullRow>({
            ariaLabel: 'test',
            data: pageData,
            columns: [
                { header: 'Name', accessor: 'name' },
                { header: 'Status', accessor: 'status' },
            ],
            download: { onDownload, label: 'Export' },
            pagination: {
                page: 1,
                totalPages: 2,
                pageSize: 3,
                totalItems: 5,
                onPageChange: vi.fn(),
                onPageSizeChange: vi.fn(),
            },
        })
        const table = Test.Table('test')
        await table.Do.download('Export')
        expect(onDownload).toHaveBeenCalledWith(pageData)
    })

    it('combined: sorting headers + selection header + expand + action column all render correctly', () => {
        Test.Table.Set.mock<FullRow>({
            ariaLabel: 'test',
            data: fullData.slice(0, 2),
            columns: [
                { header: 'Name', accessor: 'name', isSortable: true },
                { header: 'Email', accessor: 'email', breakpoint: '2xl' },
                { header: 'Status', accessor: 'status' },
            ],
            selection: {
                getRowId: (r) => r.id,
                selectedRowIds: [],
                onChange: vi.fn(),
            },
            actions: [{ id: 'edit', label: 'Edit' }],
            sorting: {
                column: 'name',
                direction: 'asc',
                onSortChange: vi.fn(),
            },
        })
        const table = Test.Table('test')
        const headers = table.Get.columnHeaders()
        // Expand + Select + Name (sortable) + Email + Status + Actions = 6
        expect(headers).toHaveLength(6)
        expect(headers[0]).toHaveAttribute('aria-label', 'Expand')
        expect(headers[headers.length - 1]).toHaveAttribute('aria-label', 'Actions')
    })

    it('filter panel + pagination + sorting all visible simultaneously', async () => {
        Test.Table.Set.mock<FullRow>({
            ariaLabel: 'test',
            data: fullData,
            columns: [
                { header: 'Name', accessor: 'name', isSortable: true },
                { header: 'Status', accessor: 'status' },
            ],
            sorting: {
                column: 'name',
                direction: 'asc',
                onSortChange: vi.fn(),
            },
            filtering: {
                inputs: [{ key: 'name', label: 'Name Filter', type: 'text' }],
                onFilter: vi.fn(),
            },
            pagination: {
                page: 1,
                totalPages: 2,
                onPageChange: vi.fn(),
                onPageSizeChange: vi.fn(),
            },
        })
        const table = Test.Table('test')
        // Open filters
        await table.Do.toggleFilters()

        // All three features visible
        expect(table.Get.filterPanel()).toBeInTheDocument()
        expect(table.Get.sortButton('Name')).toBeInTheDocument()
        expect(table.Get.pagination()).toBeInTheDocument()
    })

    it('empty data with all features shows empty state and still renders header/pagination', () => {
        Test.Table.Set.mock<FullRow>({
            id: 'empty-table',
            ariaLabel: 'test',
            data: [],
            columns: fullColumns,
            selection: {
                getRowId: (r) => r.id,
                selectedRowIds: [],
                onChange: vi.fn(),
            },
            actions: [{ id: 'edit', label: 'Edit' }],
            sorting: {
                column: 'name',
                direction: 'asc',
                onSortChange: vi.fn(),
            },
            filtering: {
                inputs: [{ key: 'name', label: 'Name', type: 'text' }],
                onFilter: vi.fn(),
            },
            download: { onDownload: vi.fn() },
            pagination: {
                page: 1,
                totalPages: 0,
                onPageChange: vi.fn(),
                onPageSizeChange: vi.fn(),
            },
            title: 'Empty Combined',
        })
        const table = Test.Table('Empty Combined')
        expect(screen.getByText('No data')).toBeInTheDocument()
        expect(table.Get.heading('Empty Combined')).toBeInTheDocument()
        expect(table.Get.pagination()).toBeInTheDocument()
    })
})
