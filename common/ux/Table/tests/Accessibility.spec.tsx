import { screen, within } from '@testing-library/react'
import { Row } from './Table.spec.types'
import { basicColumns, rows } from './Table.mocks'
import { Test } from '@common/ux/Test'

describe('Table — Accessibility', () => {
    describe('Region wrapper', () => {
        it('renders a region role on the container', () => {
            Test.Table.Set.mock<Row>({ ariaLabel: 'Users', data: rows, columns: basicColumns })
            expect(Test.Table.Get.region('Users')).toBeInTheDocument()
        })

        it('sets aria-label from the ariaLabel prop', () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'Custom label',
                data: rows,
                columns: basicColumns,
            })
            expect(Test.Table.Get.region()).toHaveAttribute('aria-label', 'Custom label')
        })

        it('sets aria-labelledby pointing to the title when title is provided', () => {
            Test.Table.Set.mock<Row>({
                title: 'My Table',
                ariaLabel: 'Test',
                data: rows,
                columns: basicColumns,
            })
            const heading = Test.Table.Get.heading('My Table')
            const region = Test.Table.Get.region()
            expect(region).toHaveAttribute('aria-labelledby', heading.id)
        })

        it('does not set aria-labelledby when no title is given', () => {
            Test.Table.Set.mock<Row>({ ariaLabel: 'No title', data: rows, columns: basicColumns })
            expect(Test.Table.Get.region()).not.toHaveAttribute('aria-labelledby')
        })
    })

    describe('id prop', () => {
        it('sets the DOM id on the wrapper', () => {
            Test.Table.Set.mock<Row>({
                id: 'my-table',
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
            })
            expect(document.getElementById('my-table')).toBeInTheDocument()
        })

        it('links title id to the table via aria-labelledby when id is provided', () => {
            Test.Table.Set.mock<Row>({
                id: 'custom-id',
                title: 'Titled',
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
            })
            const table = screen.getByRole('table')
            const heading = Test.Table.Get.heading('Titled')
            expect(table).toHaveAttribute('aria-labelledby', heading.id)
        })

        it('generates an auto-id for aria-labelledby when no id prop is given but title exists', () => {
            Test.Table.Set.mock<Row>({
                title: 'Auto ID',
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
            })
            const table = screen.getByRole('table')
            const heading = Test.Table.Get.heading('Auto ID')
            expect(table).toHaveAttribute('aria-labelledby', heading.id)
            expect(heading.id).toBeTruthy()
        })
    })

    describe('className prop', () => {
        it('appends className to the wrapper', () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                className: 'custom-class',
                data: rows,
                columns: basicColumns,
            })
            expect(Test.Table.Get.region()).toHaveClass('custom-class')
        })

        it('keeps the base table-container class alongside custom class', () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                className: 'my-table',
                data: rows,
                columns: basicColumns,
            })
            const region = Test.Table.Get.region()
            expect(region).toHaveClass('table-container')
            expect(region).toHaveClass('my-table')
        })

        it('renders without extra classes when className is omitted', () => {
            Test.Table.Set.mock<Row>({ ariaLabel: 'test', data: rows, columns: basicColumns })
            expect(Test.Table.Get.region().className).toContain('table-container')
        })
    })

    describe('style prop', () => {
        it('applies inline styles to the wrapper', () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                style: { border: '2px solid red' },
                data: rows,
                columns: basicColumns,
            })
            expect(Test.Table.Get.region().style.border).toBe('2px solid red')
        })
    })

    describe('table element', () => {
        it('renders a <table> element', () => {
            Test.Table.Set.mock<Row>({ ariaLabel: 'test', data: rows, columns: basicColumns })
            expect(screen.getByRole('table')).toBeInTheDocument()
        })

        it('links table via aria-labelledby to the title heading', () => {
            Test.Table.Set.mock<Row>({
                title: 'Linked',
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
            })
            const heading = Test.Table.Get.heading('Linked')
            expect(screen.getByRole('table')).toHaveAttribute('aria-labelledby', heading.id)
        })
    })

    describe('Column headers', () => {
        it('renders th elements with scope="col"', () => {
            Test.Table.Set.mock<Row>({ ariaLabel: 'test', data: rows, columns: basicColumns })
            const headers = Test.Table.Get.columnHeaders()
            headers.forEach((th) => {
                expect(th).toHaveAttribute('scope', 'col')
            })
        })

        it('renders column header text for each column', () => {
            Test.Table.Set.mock<Row>({ ariaLabel: 'test', data: rows, columns: basicColumns })
            expect(screen.getByText('Name')).toBeInTheDocument()
            expect(screen.getByText('Value')).toBeInTheDocument()
            expect(screen.getByText('Status')).toBeInTheDocument()
        })

        it('renders expand column header with aria-label "Expand" when breakpoints are present', () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: [
                    { header: 'Name', accessor: 'name' },
                    { header: 'Status', accessor: 'status', breakpoint: '2xl' },
                ],
            })
            expect(screen.getByRole('columnheader', { name: 'Expand' })).toBeInTheDocument()
        })

        it('renders action column header with aria-label "Actions" when actions are present', () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                actions: [{ id: 'edit', label: 'Edit' }],
            })
            expect(screen.getByRole('columnheader', { name: 'Actions' })).toBeInTheDocument()
        })

        it('renders select column header with aria-label "Select" for single selection', () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                selection: {
                    mode: 'single',
                    getRowId: (r) => r.name,
                    selectedRowIds: [],
                    onChange: vi.fn(),
                },
            })
            expect(screen.getByRole('columnheader', { name: 'Select' })).toBeInTheDocument()
        })
    })

    describe('rowAriaLabel', () => {
        it('sets aria-label on each body row', () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                rowAriaLabel: 'Data row',
                data: rows,
                columns: basicColumns,
            })
            const bodyRows = screen
                .getAllByRole('row')
                .filter((row) => row.getAttribute('aria-label') === 'Data row')
            expect(bodyRows).toHaveLength(rows.length)
        })

        it('does not set aria-label on rows when rowAriaLabel is omitted', () => {
            Test.Table.Set.mock<Row>({ ariaLabel: 'test', data: rows, columns: basicColumns })
            const bodyRows = screen.getAllByRole('row')
            // Header row + body rows; body rows should have no aria-label
            const labeled = bodyRows.filter((row) => row.hasAttribute('aria-label'))
            expect(labeled).toHaveLength(0)
        })
    })

    describe('Expand/Collapse row buttons', () => {
        it('renders "Expand row" buttons when breakpoints hide columns', () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: [
                    { header: 'Name', accessor: 'name' },
                    { header: 'Status', accessor: 'status', breakpoint: '2xl' },
                ],
            })
            const expandBtns = Test.Table.Get.expandButtons()
            expect(expandBtns).toHaveLength(rows.length)
        })

        it('changes aria-label to "Collapse row" after expanding', async () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: [
                    { header: 'Name', accessor: 'name' },
                    { header: 'Status', accessor: 'status', breakpoint: '2xl' },
                ],
            })
            const btn = Test.Table.Get.expandButton(0)
            await Test.Table.Click.expandButton(0)
            expect(btn).toHaveAttribute('aria-label', 'Collapse row')
        })

        it('toggles back to "Expand row" after collapsing', async () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: [
                    { header: 'Name', accessor: 'name' },
                    { header: 'Status', accessor: 'status', breakpoint: '2xl' },
                ],
            })
            const btn = Test.Table.Get.expandButton(0)
            const user = await Test.Table.Click.expandButton(0)
            await user.click(btn)
            expect(btn).toHaveAttribute('aria-label', 'Expand row')
        })
    })

    describe('Expanded row details', () => {
        it('renders expanded row with aria-label "Expanded details for row N"', async () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: [
                    { header: 'Name', accessor: 'name' },
                    { header: 'Status', accessor: 'status', breakpoint: '2xl' },
                ],
            })
            await Test.Table.Act.expandRow(0)
            expect(Test.Table.Get.expandedRow(1)).toBeInTheDocument()
        })

        it('expanded row contains aria-hidden spacer cells', async () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: [
                    { header: 'Name', accessor: 'name' },
                    { header: 'Status', accessor: 'status', breakpoint: '2xl' },
                ],
            })
            await Test.Table.Act.expandRow(0)
            const expandedRow = Test.Table.Get.expandedRow(1)
            const hiddenCells = within(expandedRow).getAllByRole('cell', { hidden: true })
            const ariaHidden = hiddenCells.filter((c) => c.getAttribute('aria-hidden') === 'true')
            expect(ariaHidden.length).toBeGreaterThanOrEqual(1)
        })

        it('renders expanded row with correct index for non-first rows', async () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: [
                    { header: 'Name', accessor: 'name' },
                    { header: 'Status', accessor: 'status', breakpoint: '2xl' },
                ],
            })
            await Test.Table.Act.expandRow(2)
            expect(Test.Table.Get.expandedRow(3)).toBeInTheDocument()
        })
    })

    describe('Action menu ARIA', () => {
        it('renders action button with aria-label "Row actions"', () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                actions: [{ id: 'edit', label: 'Edit' }],
            })
            const buttons = Test.Table.Get.actionButtons()
            expect(buttons).toHaveLength(rows.length)
        })

        it('action button has aria-haspopup="true"', () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows.slice(0, 1),
                columns: basicColumns,
                actions: [{ id: 'edit', label: 'Edit' }],
            })
            const btn = Test.Table.Get.actionButton()
            expect(btn).toHaveAttribute('aria-haspopup', 'true')
        })

        it('action button starts with aria-expanded="false"', () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows.slice(0, 1),
                columns: basicColumns,
                actions: [{ id: 'edit', label: 'Edit' }],
            })
            const btn = Test.Table.Get.actionButton()
            expect(btn).toHaveAttribute('aria-expanded', 'false')
        })

        it('action button toggles aria-expanded to "true" when opened', async () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows.slice(0, 1),
                columns: basicColumns,
                actions: [{ id: 'edit', label: 'Edit' }],
            })
            const btn = Test.Table.Get.actionButton()
            await Test.Table.Act.openActionMenu()
            expect(btn).toHaveAttribute('aria-expanded', 'true')
        })

        it('dropdown list has role="menu" and aria-label "Row actions menu"', async () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows.slice(0, 1),
                columns: basicColumns,
                actions: [{ id: 'edit', label: 'Edit' }],
            })
            await Test.Table.Act.openActionMenu()
            const menu = screen.getByRole('menu', { name: 'Row actions menu' })
            expect(menu).toBeInTheDocument()
        })

        it('action items have role="menuitem" with aria-label matching the action label', async () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows.slice(0, 1),
                columns: basicColumns,
                actions: [
                    { id: 'edit', label: 'Edit' },
                    { id: 'delete', label: 'Delete' },
                ],
            })
            await Test.Table.Act.openActionMenu()
            expect(Test.Table.Get.menuItem('Edit')).toBeInTheDocument()
            expect(Test.Table.Get.menuItem('Delete')).toBeInTheDocument()
        })

        it('list items wrapping menuitems have role="none"', async () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows.slice(0, 1),
                columns: basicColumns,
                actions: [{ id: 'edit', label: 'Edit' }],
            })
            await Test.Table.Act.openActionMenu()
            const menu = Test.Table.Get.menu()
            const listItems = menu.querySelectorAll('li')
            listItems.forEach((li) => {
                expect(li).toHaveAttribute('role', 'none')
            })
        })

        it('disables action button when all actions are filtered out', () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows.slice(0, 1),
                columns: basicColumns,
                actions: [
                    { id: 'edit', label: 'Edit', filter: () => false },
                    { id: 'delete', label: 'Delete', filter: () => false },
                ],
            })
            expect(Test.Table.Get.actionButton()).toBeDisabled()
        })
    })

    describe('Selection ARIA', () => {
        it('renders "Select all rows" checkbox in header for multiple mode', () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                selection: {
                    getRowId: (r) => r.name,
                    selectedRowIds: [],
                    onChange: vi.fn(),
                },
            })
            expect(Test.Table.Get.selectAll()).toBeInTheDocument()
        })

        it('does not render "Select all rows" checkbox for single mode', () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                selection: {
                    mode: 'single',
                    getRowId: (r) => r.name,
                    selectedRowIds: [],
                    onChange: vi.fn(),
                },
            })
            expect(
                screen.queryByRole('checkbox', { name: 'Select all rows' }),
            ).not.toBeInTheDocument()
        })

        it('renders per-row checkboxes with "Select row N" aria-labels', () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                selection: {
                    getRowId: (r) => r.name,
                    selectedRowIds: [],
                    onChange: vi.fn(),
                },
            })
            rows.forEach((_, i) => {
                expect(Test.Table.Get.selectRow(i + 1)).toBeInTheDocument()
            })
        })

        it('disabled rows have disabled checkbox', () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                selection: {
                    getRowId: (r) => r.name,
                    selectedRowIds: [],
                    onChange: vi.fn(),
                    isRowSelectable: ({ row }) => row.status !== 'inactive',
                },
            })
            // Row 2 (Beta, inactive) should be disabled
            expect(Test.Table.Get.selectRow(2)).toBeDisabled()
            expect(Test.Table.Get.selectRow(1)).not.toBeDisabled()
        })
    })

    describe('Sorting ARIA', () => {
        it('sortable column has aria-sort="ascending" when sorted asc', () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: [
                    { header: 'Name', accessor: 'name', isSortable: true },
                    { header: 'Value', accessor: 'value' },
                ],
                sorting: {
                    column: 'name',
                    direction: 'asc',
                    onSortChange: vi.fn(),
                },
            })
            const nameHeader = screen.getByRole('columnheader', { name: /Name/i })
            expect(nameHeader).toHaveAttribute('aria-sort', 'ascending')
        })

        it('sortable column has aria-sort="descending" when sorted desc', () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: [
                    { header: 'Name', accessor: 'name', isSortable: true },
                    { header: 'Value', accessor: 'value' },
                ],
                sorting: {
                    column: 'name',
                    direction: 'desc',
                    onSortChange: vi.fn(),
                },
            })
            const nameHeader = screen.getByRole('columnheader', { name: /Name/i })
            expect(nameHeader).toHaveAttribute('aria-sort', 'descending')
        })

        it('non-sorted sortable column does not have aria-sort', () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: [
                    { header: 'Name', accessor: 'name', isSortable: true },
                    { header: 'Value', accessor: 'value', isSortable: true },
                ],
                sorting: {
                    column: 'name',
                    direction: 'asc',
                    onSortChange: vi.fn(),
                },
            })
            const valueHeader = screen.getByRole('columnheader', { name: /Value/i })
            expect(valueHeader).not.toHaveAttribute('aria-sort')
        })

        it('sort buttons have aria-label "Sort by {header}"', () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: [
                    { header: 'Name', accessor: 'name', isSortable: true },
                    { header: 'Value', accessor: 'value', isSortable: true },
                ],
                sorting: {
                    column: 'name',
                    direction: 'asc',
                    onSortChange: vi.fn(),
                },
            })
            expect(Test.Table.Get.sortButton('Name')).toBeInTheDocument()
            expect(Test.Table.Get.sortButton('Value')).toBeInTheDocument()
        })

        it('sort icon has aria-hidden="true"', () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: [{ header: 'Name', accessor: 'name', isSortable: true }],
                sorting: {
                    column: 'name',
                    direction: 'asc',
                    onSortChange: vi.fn(),
                },
            })
            const btn = Test.Table.Get.sortButton('Name')
            const icon = btn.querySelector('.sort-icon')
            expect(icon).toHaveAttribute('aria-hidden', 'true')
        })
    })

    describe('Empty state ARIA', () => {
        it('empty cell has role="status"', () => {
            Test.Table.Set.mock<Row>({ ariaLabel: 'test', data: [], columns: basicColumns })
            expect(Test.Table.Get.emptyState()).toBeInTheDocument()
        })

        it('empty cell shows default "No data" text', () => {
            Test.Table.Set.mock<Row>({ ariaLabel: 'test', data: [], columns: basicColumns })
            expect(screen.getByText('No data')).toBeInTheDocument()
        })

        it('empty cell shows custom emptyState content', () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: [],
                columns: basicColumns,
                emptyState: <span>Nothing here</span>,
            })
            expect(screen.getByText('Nothing here')).toBeInTheDocument()
        })

        it('empty cell colspan spans all columns', () => {
            Test.Table.Set.mock<Row>({ ariaLabel: 'test', data: [], columns: basicColumns })
            const cell = Test.Table.Get.emptyState()
            expect(cell).toHaveAttribute('colspan', String(basicColumns.length))
        })
    })

    describe('Filter panel ARIA', () => {
        it('filter toggle button has aria-label "Toggle filters"', () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                filtering: {
                    inputs: [{ key: 'name', label: 'Name', type: 'text' }],
                    onFilter: vi.fn(),
                },
            })
            expect(Test.Table.Get.filterToggle()).toBeInTheDocument()
        })

        it('filter toggle starts with aria-expanded="false"', () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                filtering: {
                    inputs: [{ key: 'name', label: 'Name', type: 'text' }],
                    onFilter: vi.fn(),
                },
            })
            expect(Test.Table.Get.filterToggle()).toHaveAttribute('aria-expanded', 'false')
        })

        it('filter toggle sets aria-expanded="true" when open', async () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                filtering: {
                    inputs: [{ key: 'name', label: 'Name', type: 'text' }],
                    onFilter: vi.fn(),
                },
            })
            await Test.Table.Act.openFilters()
            expect(Test.Table.Get.filterToggle()).toHaveAttribute('aria-expanded', 'true')
        })

        it('filter panel has role="search" and aria-label "Table filters"', async () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                filtering: {
                    inputs: [{ key: 'name', label: 'Name', type: 'text' }],
                    onFilter: vi.fn(),
                },
            })
            await Test.Table.Act.openFilters()
            expect(Test.Table.Get.filterPanel()).toBeInTheDocument()
        })

        it('filter inputs have associated labels', async () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                filtering: {
                    inputs: [
                        { key: 'name', label: 'Name', type: 'text' },
                        { key: 'value', label: 'Min Value', type: 'number' },
                    ],
                    onFilter: vi.fn(),
                },
            })
            await Test.Table.Act.openFilters()
            expect(screen.getByLabelText('Name')).toBeInTheDocument()
            expect(screen.getByLabelText('Min Value')).toBeInTheDocument()
        })
    })

    describe('Pagination ARIA', () => {
        it('pagination wrapper has role="navigation" and aria-label "Table pagination"', () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                pagination: {
                    page: 1,
                    totalPages: 3,
                    onPageChange: vi.fn(),
                    onPageSizeChange: vi.fn(),
                },
            })
            expect(Test.Table.Get.pagination()).toBeInTheDocument()
        })

        it('page buttons have aria-label "Page N"', () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                pagination: {
                    page: 1,
                    totalPages: 3,
                    onPageChange: vi.fn(),
                    onPageSizeChange: vi.fn(),
                },
            })
            expect(Test.Table.Get.pageButton(1)).toBeInTheDocument()
            expect(Test.Table.Get.pageButton(2)).toBeInTheDocument()
            expect(Test.Table.Get.pageButton(3)).toBeInTheDocument()
        })

        it('current page button has aria-current="page"', () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                pagination: {
                    page: 2,
                    totalPages: 3,
                    onPageChange: vi.fn(),
                    onPageSizeChange: vi.fn(),
                },
            })
            expect(Test.Table.Get.pageButton(2)).toHaveAttribute('aria-current', 'page')
        })

        it('non-current page buttons do not have aria-current', () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                pagination: {
                    page: 2,
                    totalPages: 3,
                    onPageChange: vi.fn(),
                    onPageSizeChange: vi.fn(),
                },
            })
            expect(Test.Table.Get.pageButton(1)).not.toHaveAttribute('aria-current')
        })

        it('first/previous/next/last buttons have correct aria-labels', () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                pagination: {
                    page: 2,
                    totalPages: 5,
                    onPageChange: vi.fn(),
                    onPageSizeChange: vi.fn(),
                },
            })
            expect(Test.Table.Get.firstPage()).toBeInTheDocument()
            expect(Test.Table.Get.prevPage()).toBeInTheDocument()
            expect(Test.Table.Get.nextPage()).toBeInTheDocument()
            expect(Test.Table.Get.lastPage()).toBeInTheDocument()
        })

        it('first/previous buttons are disabled on page 1', () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                pagination: {
                    page: 1,
                    totalPages: 5,
                    onPageChange: vi.fn(),
                    onPageSizeChange: vi.fn(),
                },
            })
            expect(Test.Table.Get.firstPage()).toBeDisabled()
            expect(Test.Table.Get.prevPage()).toBeDisabled()
        })

        it('next/last buttons are disabled on last page', () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                pagination: {
                    page: 5,
                    totalPages: 5,
                    onPageChange: vi.fn(),
                    onPageSizeChange: vi.fn(),
                },
            })
            expect(Test.Table.Get.nextPage()).toBeDisabled()
            expect(Test.Table.Get.lastPage()).toBeDisabled()
        })

        it('shows item range when totalItems is provided', () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                pagination: {
                    page: 1,
                    totalPages: 3,
                    pageSize: 10,
                    totalItems: 25,
                    onPageChange: vi.fn(),
                    onPageSizeChange: vi.fn(),
                },
            })
            expect(screen.getByLabelText('Items 1 to 10')).toBeInTheDocument()
            expect(screen.getByLabelText('Total items: 25')).toBeInTheDocument()
        })
    })

    describe('Download ARIA', () => {
        it('single download button has aria-label "Download" by default', () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                download: { onDownload: vi.fn() },
            })
            expect(Test.Table.Get.downloadButton()).toBeInTheDocument()
        })

        it('single download button uses custom label as aria-label', () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                download: { label: 'Export CSV', onDownload: vi.fn() },
            })
            expect(Test.Table.Get.downloadButton('Export CSV')).toBeInTheDocument()
        })

        it('multi-option download trigger has aria-label "Download"', () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                download: {
                    options: [
                        { value: 'csv', label: 'CSV' },
                        { value: 'pdf', label: 'PDF' },
                    ],
                    onDownload: vi.fn(),
                },
            })
            expect(Test.Table.Get.downloadButton()).toBeInTheDocument()
        })

        it('multi-option dropdown has aria-haspopup="listbox"', () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                download: {
                    options: [
                        { value: 'csv', label: 'CSV' },
                        { value: 'pdf', label: 'PDF' },
                    ],
                    onDownload: vi.fn(),
                },
            })
            expect(Test.Table.Get.downloadButton()).toHaveAttribute('aria-haspopup', 'listbox')
        })
    })

    describe('Info button ARIA', () => {
        it('renders info button with aria-label "More information"', () => {
            Test.Table.Set.mock<Row>({
                title: 'Info',
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                onInfo: vi.fn(),
            })
            expect(Test.Table.Get.infoButton()).toBeInTheDocument()
        })

        it('does not render info button when onInfo is not provided', () => {
            Test.Table.Set.mock<Row>({
                title: 'No Info',
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
            })
            expect(
                screen.queryByRole('button', { name: 'More information' }),
            ).not.toBeInTheDocument()
        })
    })

    describe('Table aria-label fallback', () => {
        it('table element uses aria-label when no title is provided', () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'Fallback label',
                data: rows,
                columns: basicColumns,
            })
            expect(screen.getByRole('table')).toHaveAttribute('aria-label', 'Fallback label')
        })

        it('table element does not have aria-label when title provides aria-labelledby', () => {
            Test.Table.Set.mock<Row>({
                title: 'Titled',
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
            })
            expect(screen.getByRole('table')).not.toHaveAttribute('aria-label')
        })
    })

    describe('Description ARIA', () => {
        it('table has aria-describedby pointing to the description element', () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                description: 'A helpful description',
                data: rows,
                columns: basicColumns,
            })
            const table = screen.getByRole('table')
            const descId = table.getAttribute('aria-describedby')
            expect(descId).toBeTruthy()
            const descEl = document.getElementById(descId!)
            expect(descEl).toBeInTheDocument()
            expect(descEl).toHaveTextContent('A helpful description')
        })

        it('table does not have aria-describedby when no description', () => {
            Test.Table.Set.mock<Row>({ ariaLabel: 'test', data: rows, columns: basicColumns })
            expect(screen.getByRole('table')).not.toHaveAttribute('aria-describedby')
        })
    })

    describe('Filter aria-controls', () => {
        it('filter toggle has aria-controls pointing to the filter panel id', async () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                filtering: {
                    inputs: [{ key: 'name', label: 'Name', type: 'text' }],
                    onFilter: vi.fn(),
                },
            })
            const toggle = Test.Table.Get.filterToggle()
            const controlsId = toggle.getAttribute('aria-controls')
            expect(controlsId).toBeTruthy()
            await Test.Table.Act.openFilters()
            const panel = Test.Table.Get.filterPanel()
            expect(panel).toHaveAttribute('id', controlsId)
        })

        it('filter reset button has aria-label "Reset filters"', async () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                filtering: {
                    inputs: [{ key: 'name', label: 'Name', type: 'text' }],
                    onFilter: vi.fn(),
                },
            })
            await Test.Table.Act.openFilters()
            expect(Test.Table.Get.resetFilters()).toBeInTheDocument()
        })
    })

    describe('Action menu aria-controls', () => {
        it('action button has aria-haspopup and opens portaled menu', async () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows.slice(0, 1),
                columns: basicColumns,
                actions: [{ id: 'edit', label: 'Edit' }],
            })
            const btn = Test.Table.Get.actionButton()
            expect(btn).toHaveAttribute('aria-haspopup', 'true')
            expect(btn).toHaveAttribute('aria-expanded', 'false')
            await Test.Table.Act.openActionMenu()
            expect(btn).toHaveAttribute('aria-expanded', 'true')
            const menu = screen.getByRole('menu', { name: 'Row actions menu' })
            expect(menu).toBeInTheDocument()
        })
    })

    describe('Dropdown aria-controls', () => {
        it('multi-option download trigger has aria-controls linking to the listbox', async () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                download: {
                    options: [
                        { value: 'csv', label: 'CSV' },
                        { value: 'pdf', label: 'PDF' },
                    ],
                    onDownload: vi.fn(),
                },
            })
            const trigger = Test.Table.Get.downloadButton()
            const controlsId = trigger.getAttribute('aria-controls')
            expect(controlsId).toBeTruthy()
            await Test.Table.Click.downloadButton()
            const listbox = screen.getByRole('listbox', { name: 'Download' })
            expect(listbox).toHaveAttribute('id', controlsId)
        })
    })

    describe('Escape key handling', () => {
        it('pressing Escape closes the action menu', async () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows.slice(0, 1),
                columns: basicColumns,
                actions: [{ id: 'edit', label: 'Edit' }],
            })
            const btn = Test.Table.Get.actionButton()
            const user = await Test.Table.Act.openActionMenu()
            expect(btn).toHaveAttribute('aria-expanded', 'true')
            await user.keyboard('{Escape}')
            expect(btn).toHaveAttribute('aria-expanded', 'false')
        })

        it('pressing Escape closes the dropdown', async () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                download: {
                    options: [
                        { value: 'csv', label: 'CSV' },
                        { value: 'pdf', label: 'PDF' },
                    ],
                    onDownload: vi.fn(),
                },
            })
            const trigger = Test.Table.Get.downloadButton()
            const user = await Test.Table.Click.downloadButton()
            expect(trigger).toHaveAttribute('aria-expanded', 'true')
            await user.keyboard('{Escape}')
            expect(trigger).toHaveAttribute('aria-expanded', 'false')
        })
    })
})
