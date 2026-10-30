import { within } from '@testing-library/react'
import { Const } from '@common-ux/Const'
import { Test, Accessor } from '@common-ux/Test'
import { Row } from './Table.spec.types'
import { TableMocks } from './Table.mocks'
import { Table } from '..'

const { rows, basicColumns } = TableMocks

describe('Table — Accessibility', () => {
    describe('Region wrapper', () => {
        it('should render a region role on the container', () => {
            Test.Table.Set.mock<Row>({ ariaLabel: 'Users', data: rows, columns: basicColumns })
            expect(Test.Table('Users').Get.tagName()).toBeDefined()
        })

        it('should set aria-label from the ariaLabel prop', () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'Custom label',
                data: rows,
                columns: basicColumns,
            })
            expect(Test.Table('Custom label').Get.attribute('aria-label')).toBe('Custom label')
        })

        it('should set aria-labelledby pointing to the title when title is provided', () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                title: 'My Table',
            })
            const table = Test.Table('My Table')
            const heading = table.Get.heading('My Table')
            expect(table.Get.attribute('aria-labelledby')).toBe(heading.id)
        })

        it('should not set aria-labelledby when no title is given', () => {
            Test.Table.Set.mock<Row>({ ariaLabel: 'No title', data: rows, columns: basicColumns })
            expect(Test.Table('No title').Get.attribute('aria-labelledby')).toBeNull()
        })
    })

    describe('id prop', () => {
        it('should set the DOM id on the wrapper', () => {
            Test.Table.Set.mock<Row>({
                id: 'my-table',
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
            })
            expect(document.getElementById('my-table')).toBeInTheDocument()
        })

        it('should link the title id to the table via aria-labelledby when id is provided', () => {
            Test.Table.Set.mock<Row>({
                id: 'custom-id',
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                title: 'Titled',
            })
            const table = Test.Table('Titled')
            const heading = table.Get.heading('Titled')
            expect(table.Get.table()).toHaveAttribute('aria-labelledby', heading.id)
        })

        it('should generate an auto-id for aria-labelledby when no id prop is given but title exists', () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                title: 'Auto ID',
            })
            const table = Test.Table('Auto ID')
            const heading = table.Get.heading('Auto ID')
            expect(table.Get.table()).toHaveAttribute('aria-labelledby', heading.id)
            expect(heading.id).toBeTruthy()
        })
    })

    describe('className prop', () => {
        it('should append className to the wrapper', () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                className: 'custom-class',
                data: rows,
                columns: basicColumns,
            })
            expect(Test.Table('test').Get.className()).toContain('custom-class')
        })

        it('should keep the base table-container class alongside custom class', () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                className: 'my-table',
                data: rows,
                columns: basicColumns,
            })
            const table = Test.Table('test')
            expect(table.Get.className()).toContain('table-container')
            expect(table.Get.className()).toContain('my-table')
        })

        it('should render without extra classes when className is omitted', () => {
            Test.Table.Set.mock<Row>({ ariaLabel: 'test', data: rows, columns: basicColumns })
            expect(Test.Table('test').Get.className()).toContain('table-container')
        })
    })

    describe('style prop', () => {
        it('should apply inline styles to the wrapper', () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                style: { border: `2px solid ${Const.Color.Black[3]}` },
                data: rows,
                columns: basicColumns,
            })
            // jsdom normalises a hex colour to rgb()
            expect(Test.Table('test').Get.style().border).toBe('2px solid rgb(51, 51, 51)')
        })
    })

    describe('table element', () => {
        it('should render a <table> element', () => {
            Test.Table.Set.mock<Row>({ ariaLabel: 'test', data: rows, columns: basicColumns })
            expect(Test.Table('test').Get.table()).toBeInTheDocument()
        })

        it('should link the table to the title heading via aria-labelledby', () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                title: 'Linked',
            })
            const table = Test.Table('Linked')
            const heading = table.Get.heading('Linked')
            expect(table.Get.table()).toHaveAttribute('aria-labelledby', heading.id)
        })
    })

    describe('Column headers', () => {
        it('should render th elements with scope="col"', () => {
            Test.Table.Set.mock<Row>({ ariaLabel: 'test', data: rows, columns: basicColumns })
            Test.Table('test')
                .Get.columnHeaders()
                .forEach((th) => {
                    expect(th).toHaveAttribute('scope', 'col')
                })
        })

        it('should render column header text for each column', () => {
            Test.Table.Set.mock<Row>({ ariaLabel: 'test', data: rows, columns: basicColumns })
            const table = Test.Table('test')
            expect(table.Get.byText('Name')).toBeInTheDocument()
            expect(table.Get.byText('Value')).toBeInTheDocument()
            expect(table.Get.byText('Status')).toBeInTheDocument()
        })

        it('should render expand column header with aria-label "Expand" when breakpoints are present', () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: [
                    { header: 'Name', accessor: 'name' },
                    { header: 'Status', accessor: 'status', breakpoint: '2xl' },
                ],
            })
            expect(
                Accessor.screen.getByRole('columnheader', { name: 'Expand' }),
            ).toBeInTheDocument()
        })

        it('should render action column header with aria-label "Actions" when actions are present', () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                actions: [{ id: 'edit', label: 'Edit' }],
            })
            expect(
                Accessor.screen.getByRole('columnheader', { name: 'Actions' }),
            ).toBeInTheDocument()
        })

        it('should render select column header with aria-label "Select" for single selection', () => {
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
                Accessor.screen.getByRole('columnheader', { name: 'Select' }),
            ).toBeInTheDocument()
        })
    })

    describe('rowAriaLabel', () => {
        it('should set aria-label on each body row', () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                rowAriaLabel: 'Data row',
                data: rows,
                columns: basicColumns,
            })
            const bodyRows = Accessor.screen
                .getAllByRole('row')
                .filter((row) => row.getAttribute('aria-label') === 'Data row')
            expect(bodyRows).toHaveLength(rows.length)
        })

        it('should not set aria-label on rows when rowAriaLabel is omitted', () => {
            Test.Table.Set.mock<Row>({ ariaLabel: 'test', data: rows, columns: basicColumns })
            const bodyRows = Accessor.screen.getAllByRole('row')
            const labeled = bodyRows.filter((row) => row.hasAttribute('aria-label'))
            expect(labeled).toHaveLength(0)
        })
    })

    describe('Expand/Collapse row buttons', () => {
        it('should render "Expand row" buttons when breakpoints hide columns', () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: [
                    { header: 'Name', accessor: 'name' },
                    { header: 'Status', accessor: 'status', breakpoint: '2xl' },
                ],
            })
            expect(Test.Table('test').Get.expandButtons()).toHaveLength(rows.length)
        })

        it('should change aria-label to "Collapse row" after expanding', async () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: [
                    { header: 'Name', accessor: 'name' },
                    { header: 'Status', accessor: 'status', breakpoint: '2xl' },
                ],
            })
            const table = Test.Table('test')
            const btn = table.Get.expandButton(0)
            await table.Do.expandRow(0)
            expect(btn).toHaveAttribute('aria-label', 'Collapse row')
        })

        it('should toggle back to "Expand row" after collapsing', async () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: [
                    { header: 'Name', accessor: 'name' },
                    { header: 'Status', accessor: 'status', breakpoint: '2xl' },
                ],
            })
            const btn = Test.Table('test').Get.expandButton(0)
            await Accessor.user.click(btn)
            await Accessor.user.click(btn)
            expect(btn).toHaveAttribute('aria-label', 'Expand row')
        })
    })

    describe('Expanded row details', () => {
        it('should render expanded row with aria-label "Expanded details for row N"', async () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: [
                    { header: 'Name', accessor: 'name' },
                    { header: 'Status', accessor: 'status', breakpoint: '2xl' },
                ],
            })
            const table = Test.Table('test')
            await table.Do.expandRow(0)
            expect(table.Get.expandedRow(1)).toBeInTheDocument()
        })

        it('should give the expanded row aria-hidden spacer cells', async () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: [
                    { header: 'Name', accessor: 'name' },
                    { header: 'Status', accessor: 'status', breakpoint: '2xl' },
                ],
            })
            const table = Test.Table('test')
            await table.Do.expandRow(0)
            const expandedRow = table.Get.expandedRow(1)
            const hiddenCells = within(expandedRow).getAllByRole('cell', { hidden: true })
            const ariaHidden = hiddenCells.filter((c) => c.getAttribute('aria-hidden') === 'true')
            expect(ariaHidden.length).toBeGreaterThanOrEqual(1)
        })

        it('should render expanded row with correct index for non-first rows', async () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: [
                    { header: 'Name', accessor: 'name' },
                    { header: 'Status', accessor: 'status', breakpoint: '2xl' },
                ],
            })
            const table = Test.Table('test')
            await table.Do.expandRow(2)
            expect(table.Get.expandedRow(3)).toBeInTheDocument()
        })
    })

    describe('Action menu ARIA', () => {
        it('should render action button with aria-label "Row actions"', () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                actions: [{ id: 'edit', label: 'Edit' }],
            })
            expect(Test.Table('test').Get.actionButtons()).toHaveLength(rows.length)
        })

        it('should give the action button aria-haspopup="true"', () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows.slice(0, 1),
                columns: basicColumns,
                actions: [{ id: 'edit', label: 'Edit' }],
            })
            expect(Test.Table('test').Get.actionButton()).toHaveAttribute('aria-haspopup', 'true')
        })

        it('should start the action button with aria-expanded="false"', () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows.slice(0, 1),
                columns: basicColumns,
                actions: [{ id: 'edit', label: 'Edit' }],
            })
            expect(Test.Table('test').Get.actionButton()).toHaveAttribute('aria-expanded', 'false')
        })

        it('should toggle aria-expanded to "true" on the action button when opened', async () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows.slice(0, 1),
                columns: basicColumns,
                actions: [{ id: 'edit', label: 'Edit' }],
            })
            const table = Test.Table('test')
            const btn = table.Get.actionButton()
            await table.Do.clickActionButton()
            expect(btn).toHaveAttribute('aria-expanded', 'true')
        })

        it('should give the dropdown list role="menu" and an aria-label', async () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows.slice(0, 1),
                columns: basicColumns,
                actions: [{ id: 'edit', label: 'Edit' }],
            })
            await Test.Table('test').Do.clickActionButton()
            expect(
                Accessor.screen.getByRole('menu', { name: 'Row actions menu' }),
            ).toBeInTheDocument()
        })

        it('should give the action items role="menuitem" with a matching aria-label', async () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows.slice(0, 1),
                columns: basicColumns,
                actions: [
                    { id: 'edit', label: 'Edit' },
                    { id: 'delete', label: 'Delete' },
                ],
            })
            const table = Test.Table('test')
            await table.Do.clickActionButton()
            expect(table.Get.menuItem('Edit')).toBeInTheDocument()
            expect(table.Get.menuItem('Delete')).toBeInTheDocument()
        })

        it('should give the list items wrapping menuitems role="none"', async () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows.slice(0, 1),
                columns: basicColumns,
                actions: [{ id: 'edit', label: 'Edit' }],
            })
            const table = Test.Table('test')
            await table.Do.clickActionButton()
            const menu = table.Get.menu()
            const listItems = menu.querySelectorAll('li')
            listItems.forEach((li) => {
                expect(li).toHaveAttribute('role', 'none')
            })
        })

        it('should disable action button when all actions are filtered out', () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows.slice(0, 1),
                columns: basicColumns,
                actions: [
                    { id: 'edit', label: 'Edit', filter: () => false },
                    { id: 'delete', label: 'Delete', filter: () => false },
                ],
            })
            expect(Test.Table('test').Get.actionButton()).toBeDisabled()
        })
    })

    describe('Selection ARIA', () => {
        it('should render "Select all rows" checkbox in header for multiple mode', () => {
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
            expect(Test.Table('test').Get.selectAll()).toBeInTheDocument()
        })

        it('should not render "Select all rows" checkbox for single mode', () => {
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
                Accessor.screen.queryByRole('checkbox', { name: 'Select all rows' }),
            ).not.toBeInTheDocument()
        })

        it('should render per-row checkboxes with "Select row N" aria-labels', () => {
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
            const table = Test.Table('test')
            rows.forEach((_, i) => {
                expect(table.Get.selectRow(i + 1)).toBeInTheDocument()
            })
        })

        it('should give disabled rows a disabled checkbox', () => {
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
            const table = Test.Table('test')
            expect(table.Get.selectRow(2)).toBeDisabled()
            expect(table.Get.selectRow(1)).not.toBeDisabled()
        })
    })

    describe('Sorting ARIA', () => {
        it('should give the sortable column aria-sort="ascending" when sorted ascending', () => {
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
            expect(Accessor.screen.getByRole('columnheader', { name: /Name/i })).toHaveAttribute(
                'aria-sort',
                'ascending',
            )
        })

        it('should give the sortable column aria-sort="descending" when sorted descending', () => {
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
            expect(Accessor.screen.getByRole('columnheader', { name: /Name/i })).toHaveAttribute(
                'aria-sort',
                'descending',
            )
        })

        it('should leave a non-sorted sortable column without aria-sort', () => {
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
            expect(
                Accessor.screen.getByRole('columnheader', { name: /Value/i }),
            ).not.toHaveAttribute('aria-sort')
        })

        it('should give the sort buttons a "Sort by {header}" aria-label', () => {
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
            const table = Test.Table('test')
            expect(table.Get.sortButton('Name')).toBeInTheDocument()
            expect(table.Get.sortButton('Value')).toBeInTheDocument()
        })

        it('should give the sort icon aria-hidden="true"', () => {
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
            const btn = Test.Table('test').Get.sortButton('Name')
            const icon = btn.querySelector('.sort-icon')
            expect(icon).toHaveAttribute('aria-hidden', 'true')
        })
    })

    describe('Empty state ARIA', () => {
        it('should give the empty cell role="status"', () => {
            Test.Table.Set.mock<Row>({ ariaLabel: 'test', data: [], columns: basicColumns })
            expect(Test.Table('test').Get.emptyState()).toBeInTheDocument()
        })

        it('should show the default "No data" text in the empty cell', () => {
            Test.Table.Set.mock<Row>({ ariaLabel: 'test', data: [], columns: basicColumns })
            expect(Test.Table('test').Get.byText('No data')).toBeInTheDocument()
        })

        it('should show the custom emptyState content in the empty cell', () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: [],
                columns: basicColumns,
                emptyState: <span>Nothing here</span>,
            })
            expect(Test.Table('test').Get.byText('Nothing here')).toBeInTheDocument()
        })

        it('should span every column with the empty cell colspan', () => {
            Test.Table.Set.mock<Row>({ ariaLabel: 'test', data: [], columns: basicColumns })
            expect(Test.Table('test').Get.emptyState()).toHaveAttribute(
                'colspan',
                String(basicColumns.length),
            )
        })
    })

    describe('Filter panel ARIA', () => {
        it('should give the filter toggle button a "Toggle filters" aria-label', () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                filtering: {
                    inputs: [{ key: 'name', label: 'Name', type: 'text' }],
                    onFilter: vi.fn(),
                },
            })
            expect(Test.Table('test').Get.filterToggle()).toBeInTheDocument()
        })

        it('should start the filter toggle with aria-expanded="false"', () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                filtering: {
                    inputs: [{ key: 'name', label: 'Name', type: 'text' }],
                    onFilter: vi.fn(),
                },
            })
            expect(Test.Table('test').Get.filterToggle()).toHaveAttribute('aria-expanded', 'false')
        })

        it('should set aria-expanded="true" on the filter toggle when open', async () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                filtering: {
                    inputs: [{ key: 'name', label: 'Name', type: 'text' }],
                    onFilter: vi.fn(),
                },
            })
            const table = Test.Table('test')
            await table.Do.toggleFilters()
            expect(table.Get.filterToggle()).toHaveAttribute('aria-expanded', 'true')
        })

        it('should give the filter panel role="search" and a "Table filters" aria-label', async () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                filtering: {
                    inputs: [{ key: 'name', label: 'Name', type: 'text' }],
                    onFilter: vi.fn(),
                },
            })
            const table = Test.Table('test')
            await table.Do.toggleFilters()
            expect(table.Get.filterPanel()).toBeInTheDocument()
        })

        it('should give the filter inputs associated labels', async () => {
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
            const table = Test.Table('test')
            await table.Do.toggleFilters()
            expect(table.Get.byLabel('Name')).toBeInTheDocument()
            expect(table.Get.byLabel('Min Value')).toBeInTheDocument()
        })
    })

    describe('Pagination ARIA', () => {
        it('should give the pagination wrapper role="navigation" and an aria-label', () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                pagination: {
                    pageNumber: 1,
                    totalPages: 3,
                    onPageChange: vi.fn(),
                    onPageSizeChange: vi.fn(),
                },
            })
            expect(Test.Table('test').Get.pagination()).toBeInTheDocument()
        })

        it('should give the page buttons a "Page N" aria-label', () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                pagination: {
                    pageNumber: 1,
                    totalPages: 3,
                    onPageChange: vi.fn(),
                    onPageSizeChange: vi.fn(),
                },
            })
            const table = Test.Table('test')
            expect(table.Get.pageButton(1)).toBeInTheDocument()
            expect(table.Get.pageButton(2)).toBeInTheDocument()
            expect(table.Get.pageButton(3)).toBeInTheDocument()
        })

        it('should give the current page button aria-current="page"', () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                pagination: {
                    pageNumber: 2,
                    totalPages: 3,
                    onPageChange: vi.fn(),
                    onPageSizeChange: vi.fn(),
                },
            })
            expect(Test.Table('test').Get.pageButton(2)).toHaveAttribute('aria-current', 'page')
        })

        it('should leave non-current page buttons without aria-current', () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                pagination: {
                    pageNumber: 2,
                    totalPages: 3,
                    onPageChange: vi.fn(),
                    onPageSizeChange: vi.fn(),
                },
            })
            expect(Test.Table('test').Get.pageButton(1)).not.toHaveAttribute('aria-current')
        })

        it('should give the first/previous/next/last buttons correct aria-labels', () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                pagination: {
                    pageNumber: 2,
                    totalPages: 5,
                    onPageChange: vi.fn(),
                    onPageSizeChange: vi.fn(),
                },
            })
            const table = Test.Table('test')
            expect(table.Get.firstPage()).toBeInTheDocument()
            expect(table.Get.prevPage()).toBeInTheDocument()
            expect(table.Get.nextPage()).toBeInTheDocument()
            expect(table.Get.lastPage()).toBeInTheDocument()
        })

        it('should disable the first/previous buttons on page 1', () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                pagination: {
                    pageNumber: 1,
                    totalPages: 5,
                    onPageChange: vi.fn(),
                    onPageSizeChange: vi.fn(),
                },
            })
            const table = Test.Table('test')
            expect(table.Get.firstPage()).toBeDisabled()
            expect(table.Get.prevPage()).toBeDisabled()
        })

        it('should disable the next/last buttons on the last page', () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                pagination: {
                    pageNumber: 5,
                    totalPages: 5,
                    onPageChange: vi.fn(),
                    onPageSizeChange: vi.fn(),
                },
            })
            const table = Test.Table('test')
            expect(table.Get.nextPage()).toBeDisabled()
            expect(table.Get.lastPage()).toBeDisabled()
        })

        it('should show item range when totalItems is provided', () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                pagination: {
                    pageNumber: 1,
                    totalPages: 3,
                    pageSize: 10,
                    totalItems: 25,
                    onPageChange: vi.fn(),
                    onPageSizeChange: vi.fn(),
                },
            })
            expect(Accessor.screen.getByLabelText('Items 1 to 10')).toBeInTheDocument()
            expect(Accessor.screen.getByLabelText('Total items: 25')).toBeInTheDocument()
        })
    })

    describe('Download ARIA', () => {
        it('should give the single download button a "Download" aria-label by default', () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                download: { onDownload: vi.fn() },
            })
            expect(Test.Table('test').Get.downloadButton()).toBeInTheDocument()
        })

        it('should use the custom label as aria-label on the single download button', () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                download: { label: 'Export CSV', onDownload: vi.fn() },
            })
            expect(Test.Table('test').Get.downloadButton('Export CSV')).toBeInTheDocument()
        })

        it('should give the multi-option download trigger a "Download" aria-label', () => {
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
            expect(Test.Table('test').Get.downloadButton()).toBeInTheDocument()
        })

        it('should give the multi-option dropdown aria-haspopup="listbox"', () => {
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
            expect(Test.Table('test').Get.downloadButton()).toHaveAttribute(
                'aria-haspopup',
                'listbox',
            )
        })
    })

    describe('Info button ARIA', () => {
        it('should render info button with aria-label "More information"', () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                title: 'Info',
                children: <Table.Info text="Some info" />,
            })
            const table = Test.Table('Info')
            expect(table.Get.infoButton()).toBeInTheDocument()
        })

        it('should not render info button when infoText is not provided', () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                title: 'No Info',
            })
            expect(
                Accessor.screen.queryByRole('button', { name: 'More information' }),
            ).not.toBeInTheDocument()
        })
    })

    describe('Table aria-label fallback', () => {
        it('should use aria-label on the table element when no title is provided', () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'Fallback label',
                data: rows,
                columns: basicColumns,
            })
            expect(Test.Table('Fallback label').Get.table()).toHaveAttribute(
                'aria-label',
                'Fallback label',
            )
        })

        it('should leave the table element without aria-label when the title labels it', () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                title: 'Titled',
            })
            expect(Test.Table('Titled').Get.table()).not.toHaveAttribute('aria-label')
        })
    })

    describe('Description ARIA', () => {
        it('should render description text in the header slot', () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                children: <Table.Header>A helpful description</Table.Header>,
            })
            expect(Test.Table('test').Get.byText('A helpful description')).toBeInTheDocument()
        })

        it('should leave the table without aria-describedby when there is no description', () => {
            Test.Table.Set.mock<Row>({ ariaLabel: 'test', data: rows, columns: basicColumns })
            expect(Test.Table('test').Get.table()).not.toHaveAttribute('aria-describedby')
        })
    })

    describe('Filter aria-controls', () => {
        it('should point the filter toggle aria-controls at the filter panel', async () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                filtering: {
                    inputs: [{ key: 'name', label: 'Name', type: 'text' }],
                    onFilter: vi.fn(),
                },
            })
            const table = Test.Table('test')
            const toggle = table.Get.filterToggle()
            const controlsId = toggle.getAttribute('aria-controls')
            expect(controlsId).toBeTruthy()
            await table.Do.toggleFilters()
            const panel = table.Get.filterPanel()
            expect(panel).toHaveAttribute('id', controlsId)
        })

        it('should give the filter reset button a "Reset filters" aria-label', async () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                filtering: {
                    inputs: [{ key: 'name', label: 'Name', type: 'text' }],
                    onFilter: vi.fn(),
                },
            })
            const table = Test.Table('test')
            await table.Do.toggleFilters()
            expect(table.Get.resetFilters()).toBeInTheDocument()
        })
    })

    describe('Action menu aria-controls', () => {
        it('should give the action button aria-haspopup and open a portaled menu', async () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows.slice(0, 1),
                columns: basicColumns,
                actions: [{ id: 'edit', label: 'Edit' }],
            })
            const table = Test.Table('test')
            const btn = table.Get.actionButton()
            expect(btn).toHaveAttribute('aria-haspopup', 'true')
            expect(btn).toHaveAttribute('aria-expanded', 'false')
            await table.Do.clickActionButton()
            expect(btn).toHaveAttribute('aria-expanded', 'true')
            expect(
                Accessor.screen.getByRole('menu', { name: 'Row actions menu' }),
            ).toBeInTheDocument()
        })
    })

    describe('Dropdown aria-controls', () => {
        it('should link the multi-option aria-controls to the listbox', async () => {
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
            const table = Test.Table('test')
            const trigger = table.Get.downloadButton()
            const controlsId = trigger.getAttribute('aria-controls')
            expect(controlsId).toBeTruthy()
            await table.Do.download()
            expect(Accessor.screen.getByRole('listbox', { name: 'Download' })).toHaveAttribute(
                'id',
                controlsId,
            )
        })
    })

    describe('Escape key handling', () => {
        it('should close the action menu when Escape is pressed', async () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows.slice(0, 1),
                columns: basicColumns,
                actions: [{ id: 'edit', label: 'Edit' }],
            })
            const table = Test.Table('test')
            const btn = table.Get.actionButton()
            await table.Do.clickActionButton()
            expect(btn).toHaveAttribute('aria-expanded', 'true')
            await table.Do.keyboard('{Escape}')
            expect(btn).toHaveAttribute('aria-expanded', 'false')
        })

        it('should close the dropdown when Escape is pressed', async () => {
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
            const table = Test.Table('test')
            const trigger = table.Get.downloadButton()
            await table.Do.download()
            expect(trigger).toHaveAttribute('aria-expanded', 'true')
            await table.Do.keyboard('{Escape}')
            expect(trigger).toHaveAttribute('aria-expanded', 'false')
        })
    })
})
