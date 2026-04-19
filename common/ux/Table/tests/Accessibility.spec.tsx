import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Table } from '../Table'

// ── matchMedia mock (jsdom does not implement it) ────────────────────────────

Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
    })),
})

// ── Helpers ──────────────────────────────────────────────────────────────────

type Row = { name: string; value: string; status: string }

const rows: Row[] = [
    { name: 'Alpha', value: '10', status: 'active' },
    { name: 'Beta', value: '20', status: 'inactive' },
    { name: 'Gamma', value: '30', status: 'pending' },
]

const basicColumns = [
    { header: 'Name', accessor: 'name' as const },
    { header: 'Value', accessor: 'value' as const },
    { header: 'Status', accessor: 'status' as const },
]

// ── Tests ────────────────────────────────────────────────────────────────────

describe('Table — Accessibility', () => {
    // ── Region & Wrapper ─────────────────────────────────────────────────

    describe('Region wrapper', () => {
        it('renders a region role on the container', () => {
            render(<Table<Row> ariaLabel="Users" data={rows} columns={basicColumns} />)
            expect(screen.getByRole('region', { name: 'Users' })).toBeInTheDocument()
        })

        it('sets aria-label from the ariaLabel prop', () => {
            render(<Table<Row> ariaLabel="Custom label" data={rows} columns={basicColumns} />)
            expect(screen.getByRole('region')).toHaveAttribute('aria-label', 'Custom label')
        })

        it('sets aria-labelledby pointing to the title when title is provided', () => {
            render(
                <Table<Row> title="My Table" ariaLabel="Test" data={rows} columns={basicColumns} />,
            )
            const heading = screen.getByRole('heading', { name: 'My Table' })
            const region = screen.getByRole('region')
            expect(region).toHaveAttribute('aria-labelledby', heading.id)
        })

        it('does not set aria-labelledby when no title is given', () => {
            render(<Table<Row> ariaLabel="No title" data={rows} columns={basicColumns} />)
            expect(screen.getByRole('region')).not.toHaveAttribute('aria-labelledby')
        })
    })

    // ── id prop ──────────────────────────────────────────────────────────

    describe('id prop', () => {
        it('sets the DOM id on the wrapper', () => {
            render(<Table<Row> id="my-table" ariaLabel="test" data={rows} columns={basicColumns} />)
            expect(document.getElementById('my-table')).toBeInTheDocument()
        })

        it('links title id to the table via aria-labelledby when id is provided', () => {
            render(
                <Table<Row>
                    id="custom-id"
                    title="Titled"
                    ariaLabel="test"
                    data={rows}
                    columns={basicColumns}
                />,
            )
            const table = screen.getByRole('table')
            const heading = screen.getByRole('heading', { name: 'Titled' })
            expect(table).toHaveAttribute('aria-labelledby', heading.id)
        })

        it('generates an auto-id for aria-labelledby when no id prop is given but title exists', () => {
            render(
                <Table<Row> title="Auto ID" ariaLabel="test" data={rows} columns={basicColumns} />,
            )
            const table = screen.getByRole('table')
            const heading = screen.getByRole('heading', { name: 'Auto ID' })
            expect(table).toHaveAttribute('aria-labelledby', heading.id)
            expect(heading.id).toBeTruthy()
        })
    })

    // ── className & style ────────────────────────────────────────────────

    describe('className prop', () => {
        it('appends className to the wrapper', () => {
            render(
                <Table<Row>
                    ariaLabel="test"
                    className="custom-class"
                    data={rows}
                    columns={basicColumns}
                />,
            )
            expect(screen.getByRole('region')).toHaveClass('custom-class')
        })

        it('keeps the base table-container class alongside custom class', () => {
            render(
                <Table<Row>
                    ariaLabel="test"
                    className="my-table"
                    data={rows}
                    columns={basicColumns}
                />,
            )
            const region = screen.getByRole('region')
            expect(region).toHaveClass('table-container')
            expect(region).toHaveClass('my-table')
        })

        it('renders without extra classes when className is omitted', () => {
            render(<Table<Row> ariaLabel="test" data={rows} columns={basicColumns} />)
            expect(screen.getByRole('region').className).toContain('table-container')
        })
    })

    describe('style prop', () => {
        it('applies inline styles to the wrapper', () => {
            render(
                <Table<Row>
                    ariaLabel="test"
                    style={{ border: '2px solid red' }}
                    data={rows}
                    columns={basicColumns}
                />,
            )
            expect(screen.getByRole('region').style.border).toBe('2px solid red')
        })
    })

    // ── Table element ────────────────────────────────────────────────────

    describe('table element', () => {
        it('renders a <table> element', () => {
            render(<Table<Row> ariaLabel="test" data={rows} columns={basicColumns} />)
            expect(screen.getByRole('table')).toBeInTheDocument()
        })

        it('links table via aria-labelledby to the title heading', () => {
            render(
                <Table<Row> title="Linked" ariaLabel="test" data={rows} columns={basicColumns} />,
            )
            const heading = screen.getByRole('heading', { name: 'Linked' })
            expect(screen.getByRole('table')).toHaveAttribute('aria-labelledby', heading.id)
        })
    })

    // ── Column Headers (scope="col") ─────────────────────────────────────

    describe('Column headers', () => {
        it('renders th elements with scope="col"', () => {
            render(<Table<Row> ariaLabel="test" data={rows} columns={basicColumns} />)
            const headers = screen.getAllByRole('columnheader')
            headers.forEach((th) => {
                expect(th).toHaveAttribute('scope', 'col')
            })
        })

        it('renders column header text for each column', () => {
            render(<Table<Row> ariaLabel="test" data={rows} columns={basicColumns} />)
            expect(screen.getByText('Name')).toBeInTheDocument()
            expect(screen.getByText('Value')).toBeInTheDocument()
            expect(screen.getByText('Status')).toBeInTheDocument()
        })

        it('renders expand column header with aria-label "Expand" when breakpoints are present', () => {
            render(
                <Table<Row>
                    ariaLabel="test"
                    data={rows}
                    columns={[
                        { header: 'Name', accessor: 'name' },
                        { header: 'Status', accessor: 'status', breakpoint: 'xxl' },
                    ]}
                />,
            )
            expect(screen.getByRole('columnheader', { name: 'Expand' })).toBeInTheDocument()
        })

        it('renders action column header with aria-label "Actions" when actions are present', () => {
            render(
                <Table<Row>
                    ariaLabel="test"
                    data={rows}
                    columns={basicColumns}
                    actions={[{ id: 'edit', label: 'Edit' }]}
                />,
            )
            expect(screen.getByRole('columnheader', { name: 'Actions' })).toBeInTheDocument()
        })

        it('renders select column header with aria-label "Select" for single selection', () => {
            render(
                <Table<Row>
                    ariaLabel="test"
                    data={rows}
                    columns={basicColumns}
                    selection={{
                        mode: 'single',
                        getRowId: (r) => r.name,
                        selectedRowIds: [],
                        onChange: jest.fn(),
                    }}
                />,
            )
            expect(screen.getByRole('columnheader', { name: 'Select' })).toBeInTheDocument()
        })
    })

    // ── Row aria-label ───────────────────────────────────────────────────

    describe('rowAriaLabel', () => {
        it('sets aria-label on each body row', () => {
            render(
                <Table<Row>
                    ariaLabel="test"
                    rowAriaLabel="Data row"
                    data={rows}
                    columns={basicColumns}
                />,
            )
            const bodyRows = screen
                .getAllByRole('row')
                .filter((row) => row.getAttribute('aria-label') === 'Data row')
            expect(bodyRows).toHaveLength(rows.length)
        })

        it('does not set aria-label on rows when rowAriaLabel is omitted', () => {
            render(<Table<Row> ariaLabel="test" data={rows} columns={basicColumns} />)
            const bodyRows = screen.getAllByRole('row')
            // Header row + body rows; body rows should have no aria-label
            const labeled = bodyRows.filter((row) => row.hasAttribute('aria-label'))
            expect(labeled).toHaveLength(0)
        })
    })

    // ── Expand / Collapse buttons ────────────────────────────────────────

    describe('Expand/Collapse row buttons', () => {
        it('renders "Expand row" buttons when breakpoints hide columns', () => {
            render(
                <Table<Row>
                    ariaLabel="test"
                    data={rows}
                    columns={[
                        { header: 'Name', accessor: 'name' },
                        { header: 'Status', accessor: 'status', breakpoint: 'xxl' },
                    ]}
                />,
            )
            const expandBtns = screen.getAllByRole('button', { name: 'Expand row' })
            expect(expandBtns).toHaveLength(rows.length)
        })

        it('changes aria-label to "Collapse row" after expanding', async () => {
            const user = userEvent.setup()
            render(
                <Table<Row>
                    ariaLabel="test"
                    data={rows}
                    columns={[
                        { header: 'Name', accessor: 'name' },
                        { header: 'Status', accessor: 'status', breakpoint: 'xxl' },
                    ]}
                />,
            )
            const btn = screen.getAllByRole('button', { name: 'Expand row' })[0]
            await user.click(btn)
            expect(btn).toHaveAttribute('aria-label', 'Collapse row')
        })

        it('toggles back to "Expand row" after collapsing', async () => {
            const user = userEvent.setup()
            render(
                <Table<Row>
                    ariaLabel="test"
                    data={rows}
                    columns={[
                        { header: 'Name', accessor: 'name' },
                        { header: 'Status', accessor: 'status', breakpoint: 'xxl' },
                    ]}
                />,
            )
            const btn = screen.getAllByRole('button', { name: 'Expand row' })[0]
            await user.click(btn)
            await user.click(btn)
            expect(btn).toHaveAttribute('aria-label', 'Expand row')
        })
    })

    // ── Expanded Row ARIA ────────────────────────────────────────────────

    describe('Expanded row details', () => {
        it('renders expanded row with aria-label "Expanded details for row N"', async () => {
            const user = userEvent.setup()
            render(
                <Table<Row>
                    ariaLabel="test"
                    data={rows}
                    columns={[
                        { header: 'Name', accessor: 'name' },
                        { header: 'Status', accessor: 'status', breakpoint: 'xxl' },
                    ]}
                />,
            )
            await user.click(screen.getAllByRole('button', { name: 'Expand row' })[0])
            expect(
                screen.getByRole('row', { name: 'Expanded details for row 1' }),
            ).toBeInTheDocument()
        })

        it('expanded row contains aria-hidden spacer cells', async () => {
            const user = userEvent.setup()
            render(
                <Table<Row>
                    ariaLabel="test"
                    data={rows}
                    columns={[
                        { header: 'Name', accessor: 'name' },
                        { header: 'Status', accessor: 'status', breakpoint: 'xxl' },
                    ]}
                />,
            )
            await user.click(screen.getAllByRole('button', { name: 'Expand row' })[0])
            const expandedRow = screen.getByRole('row', { name: 'Expanded details for row 1' })
            const hiddenCells = within(expandedRow).getAllByRole('cell', { hidden: true })
            const ariaHidden = hiddenCells.filter((c) => c.getAttribute('aria-hidden') === 'true')
            expect(ariaHidden.length).toBeGreaterThanOrEqual(1)
        })

        it('renders expanded row with correct index for non-first rows', async () => {
            const user = userEvent.setup()
            render(
                <Table<Row>
                    ariaLabel="test"
                    data={rows}
                    columns={[
                        { header: 'Name', accessor: 'name' },
                        { header: 'Status', accessor: 'status', breakpoint: 'xxl' },
                    ]}
                />,
            )
            await user.click(screen.getAllByRole('button', { name: 'Expand row' })[2])
            expect(
                screen.getByRole('row', { name: 'Expanded details for row 3' }),
            ).toBeInTheDocument()
        })
    })

    // ── Action Menu ARIA ─────────────────────────────────────────────────

    describe('Action menu ARIA', () => {
        it('renders action button with aria-label "Row actions"', () => {
            render(
                <Table<Row>
                    ariaLabel="test"
                    data={rows}
                    columns={basicColumns}
                    actions={[{ id: 'edit', label: 'Edit' }]}
                />,
            )
            const buttons = screen.getAllByRole('button', { name: 'Row actions' })
            expect(buttons).toHaveLength(rows.length)
        })

        it('action button has aria-haspopup="true"', () => {
            render(
                <Table<Row>
                    ariaLabel="test"
                    data={rows.slice(0, 1)}
                    columns={basicColumns}
                    actions={[{ id: 'edit', label: 'Edit' }]}
                />,
            )
            const btn = screen.getByRole('button', { name: 'Row actions' })
            expect(btn).toHaveAttribute('aria-haspopup', 'true')
        })

        it('action button starts with aria-expanded="false"', () => {
            render(
                <Table<Row>
                    ariaLabel="test"
                    data={rows.slice(0, 1)}
                    columns={basicColumns}
                    actions={[{ id: 'edit', label: 'Edit' }]}
                />,
            )
            const btn = screen.getByRole('button', { name: 'Row actions' })
            expect(btn).toHaveAttribute('aria-expanded', 'false')
        })

        it('action button toggles aria-expanded to "true" when opened', async () => {
            const user = userEvent.setup()
            render(
                <Table<Row>
                    ariaLabel="test"
                    data={rows.slice(0, 1)}
                    columns={basicColumns}
                    actions={[{ id: 'edit', label: 'Edit' }]}
                />,
            )
            const btn = screen.getByRole('button', { name: 'Row actions' })
            await user.click(btn)
            expect(btn).toHaveAttribute('aria-expanded', 'true')
        })

        it('dropdown list has role="menu" and aria-label "Row actions menu"', async () => {
            const user = userEvent.setup()
            render(
                <Table<Row>
                    ariaLabel="test"
                    data={rows.slice(0, 1)}
                    columns={basicColumns}
                    actions={[{ id: 'edit', label: 'Edit' }]}
                />,
            )
            await user.click(screen.getByRole('button', { name: 'Row actions' }))
            const menu = screen.getByRole('menu', { name: 'Row actions menu' })
            expect(menu).toBeInTheDocument()
        })

        it('action items have role="menuitem" with aria-label matching the action label', async () => {
            const user = userEvent.setup()
            render(
                <Table<Row>
                    ariaLabel="test"
                    data={rows.slice(0, 1)}
                    columns={basicColumns}
                    actions={[
                        { id: 'edit', label: 'Edit' },
                        { id: 'delete', label: 'Delete' },
                    ]}
                />,
            )
            await user.click(screen.getByRole('button', { name: 'Row actions' }))
            expect(screen.getByRole('menuitem', { name: 'Edit' })).toBeInTheDocument()
            expect(screen.getByRole('menuitem', { name: 'Delete' })).toBeInTheDocument()
        })

        it('list items wrapping menuitems have role="none"', async () => {
            const user = userEvent.setup()
            render(
                <Table<Row>
                    ariaLabel="test"
                    data={rows.slice(0, 1)}
                    columns={basicColumns}
                    actions={[{ id: 'edit', label: 'Edit' }]}
                />,
            )
            await user.click(screen.getByRole('button', { name: 'Row actions' }))
            const menu = screen.getByRole('menu')
            const listItems = menu.querySelectorAll('li')
            listItems.forEach((li) => {
                expect(li).toHaveAttribute('role', 'none')
            })
        })

        it('disables action button when all actions are filtered out', () => {
            render(
                <Table<Row>
                    ariaLabel="test"
                    data={rows.slice(0, 1)}
                    columns={basicColumns}
                    actions={[
                        { id: 'edit', label: 'Edit', filter: () => false },
                        { id: 'delete', label: 'Delete', filter: () => false },
                    ]}
                />,
            )
            expect(screen.getByRole('button', { name: 'Row actions' })).toBeDisabled()
        })
    })

    // ── Selection ARIA ───────────────────────────────────────────────────

    describe('Selection ARIA', () => {
        it('renders "Select all rows" checkbox in header for multiple mode', () => {
            render(
                <Table<Row>
                    ariaLabel="test"
                    data={rows}
                    columns={basicColumns}
                    selection={{
                        getRowId: (r) => r.name,
                        selectedRowIds: [],
                        onChange: jest.fn(),
                    }}
                />,
            )
            expect(screen.getByRole('checkbox', { name: 'Select all rows' })).toBeInTheDocument()
        })

        it('does not render "Select all rows" checkbox for single mode', () => {
            render(
                <Table<Row>
                    ariaLabel="test"
                    data={rows}
                    columns={basicColumns}
                    selection={{
                        mode: 'single',
                        getRowId: (r) => r.name,
                        selectedRowIds: [],
                        onChange: jest.fn(),
                    }}
                />,
            )
            expect(
                screen.queryByRole('checkbox', { name: 'Select all rows' }),
            ).not.toBeInTheDocument()
        })

        it('renders per-row checkboxes with "Select row N" aria-labels', () => {
            render(
                <Table<Row>
                    ariaLabel="test"
                    data={rows}
                    columns={basicColumns}
                    selection={{
                        getRowId: (r) => r.name,
                        selectedRowIds: [],
                        onChange: jest.fn(),
                    }}
                />,
            )
            rows.forEach((_, i) => {
                expect(
                    screen.getByRole('checkbox', { name: `Select row ${i + 1}` }),
                ).toBeInTheDocument()
            })
        })

        it('disabled rows have disabled checkbox', () => {
            render(
                <Table<Row>
                    ariaLabel="test"
                    data={rows}
                    columns={basicColumns}
                    selection={{
                        getRowId: (r) => r.name,
                        selectedRowIds: [],
                        onChange: jest.fn(),
                        isRowSelectable: ({ row }) => row.status !== 'inactive',
                    }}
                />,
            )
            // Row 2 (Beta, inactive) should be disabled
            expect(screen.getByRole('checkbox', { name: 'Select row 2' })).toBeDisabled()
            expect(screen.getByRole('checkbox', { name: 'Select row 1' })).not.toBeDisabled()
        })
    })

    // ── Sorting ARIA ─────────────────────────────────────────────────────

    describe('Sorting ARIA', () => {
        it('sortable column has aria-sort="ascending" when sorted asc', () => {
            render(
                <Table<Row>
                    ariaLabel="test"
                    data={rows}
                    columns={[
                        { header: 'Name', accessor: 'name', isSortable: true },
                        { header: 'Value', accessor: 'value' },
                    ]}
                    sorting={{
                        column: 'name',
                        direction: 'asc',
                        onSortChange: jest.fn(),
                    }}
                />,
            )
            const nameHeader = screen.getByRole('columnheader', { name: /Name/i })
            expect(nameHeader).toHaveAttribute('aria-sort', 'ascending')
        })

        it('sortable column has aria-sort="descending" when sorted desc', () => {
            render(
                <Table<Row>
                    ariaLabel="test"
                    data={rows}
                    columns={[
                        { header: 'Name', accessor: 'name', isSortable: true },
                        { header: 'Value', accessor: 'value' },
                    ]}
                    sorting={{
                        column: 'name',
                        direction: 'desc',
                        onSortChange: jest.fn(),
                    }}
                />,
            )
            const nameHeader = screen.getByRole('columnheader', { name: /Name/i })
            expect(nameHeader).toHaveAttribute('aria-sort', 'descending')
        })

        it('non-sorted sortable column does not have aria-sort', () => {
            render(
                <Table<Row>
                    ariaLabel="test"
                    data={rows}
                    columns={[
                        { header: 'Name', accessor: 'name', isSortable: true },
                        { header: 'Value', accessor: 'value', isSortable: true },
                    ]}
                    sorting={{
                        column: 'name',
                        direction: 'asc',
                        onSortChange: jest.fn(),
                    }}
                />,
            )
            const valueHeader = screen.getByRole('columnheader', { name: /Value/i })
            expect(valueHeader).not.toHaveAttribute('aria-sort')
        })

        it('sort buttons have aria-label "Sort by {header}"', () => {
            render(
                <Table<Row>
                    ariaLabel="test"
                    data={rows}
                    columns={[
                        { header: 'Name', accessor: 'name', isSortable: true },
                        { header: 'Value', accessor: 'value', isSortable: true },
                    ]}
                    sorting={{
                        column: 'name',
                        direction: 'asc',
                        onSortChange: jest.fn(),
                    }}
                />,
            )
            expect(screen.getByRole('button', { name: 'Sort by Name' })).toBeInTheDocument()
            expect(screen.getByRole('button', { name: 'Sort by Value' })).toBeInTheDocument()
        })

        it('sort icon has aria-hidden="true"', () => {
            render(
                <Table<Row>
                    ariaLabel="test"
                    data={rows}
                    columns={[{ header: 'Name', accessor: 'name', isSortable: true }]}
                    sorting={{
                        column: 'name',
                        direction: 'asc',
                        onSortChange: jest.fn(),
                    }}
                />,
            )
            const btn = screen.getByRole('button', { name: 'Sort by Name' })
            const icon = btn.querySelector('.sort-icon')
            expect(icon).toHaveAttribute('aria-hidden', 'true')
        })
    })

    // ── Empty State ARIA ─────────────────────────────────────────────────

    describe('Empty state ARIA', () => {
        it('empty cell has role="status"', () => {
            render(<Table<Row> ariaLabel="test" data={[]} columns={basicColumns} />)
            expect(screen.getByRole('status')).toBeInTheDocument()
        })

        it('empty cell shows default "No data" text', () => {
            render(<Table<Row> ariaLabel="test" data={[]} columns={basicColumns} />)
            expect(screen.getByText('No data')).toBeInTheDocument()
        })

        it('empty cell shows custom emptyState content', () => {
            render(
                <Table<Row>
                    ariaLabel="test"
                    data={[]}
                    columns={basicColumns}
                    emptyState={<span>Nothing here</span>}
                />,
            )
            expect(screen.getByText('Nothing here')).toBeInTheDocument()
        })

        it('empty cell colspan spans all columns', () => {
            render(<Table<Row> ariaLabel="test" data={[]} columns={basicColumns} />)
            const cell = screen.getByRole('status')
            expect(cell).toHaveAttribute('colspan', String(basicColumns.length))
        })
    })

    // ── Filter Panel ARIA ────────────────────────────────────────────────

    describe('Filter panel ARIA', () => {
        it('filter toggle button has aria-label "Toggle filters"', () => {
            render(
                <Table<Row>
                    ariaLabel="test"
                    data={rows}
                    columns={basicColumns}
                    filtering={{
                        inputs: [{ key: 'name', label: 'Name', type: 'text' }],
                        onFilter: jest.fn(),
                    }}
                />,
            )
            expect(screen.getByRole('button', { name: 'Toggle filters' })).toBeInTheDocument()
        })

        it('filter toggle starts with aria-expanded="false"', () => {
            render(
                <Table<Row>
                    ariaLabel="test"
                    data={rows}
                    columns={basicColumns}
                    filtering={{
                        inputs: [{ key: 'name', label: 'Name', type: 'text' }],
                        onFilter: jest.fn(),
                    }}
                />,
            )
            expect(screen.getByRole('button', { name: 'Toggle filters' })).toHaveAttribute(
                'aria-expanded',
                'false',
            )
        })

        it('filter toggle sets aria-expanded="true" when open', async () => {
            const user = userEvent.setup()
            render(
                <Table<Row>
                    ariaLabel="test"
                    data={rows}
                    columns={basicColumns}
                    filtering={{
                        inputs: [{ key: 'name', label: 'Name', type: 'text' }],
                        onFilter: jest.fn(),
                    }}
                />,
            )
            await user.click(screen.getByRole('button', { name: 'Toggle filters' }))
            expect(screen.getByRole('button', { name: 'Toggle filters' })).toHaveAttribute(
                'aria-expanded',
                'true',
            )
        })

        it('filter panel has role="search" and aria-label "Table filters"', async () => {
            const user = userEvent.setup()
            render(
                <Table<Row>
                    ariaLabel="test"
                    data={rows}
                    columns={basicColumns}
                    filtering={{
                        inputs: [{ key: 'name', label: 'Name', type: 'text' }],
                        onFilter: jest.fn(),
                    }}
                />,
            )
            await user.click(screen.getByRole('button', { name: 'Toggle filters' }))
            expect(screen.getByRole('search', { name: 'Table filters' })).toBeInTheDocument()
        })

        it('filter inputs have associated labels', async () => {
            const user = userEvent.setup()
            render(
                <Table<Row>
                    ariaLabel="test"
                    data={rows}
                    columns={basicColumns}
                    filtering={{
                        inputs: [
                            { key: 'name', label: 'Name', type: 'text' },
                            { key: 'value', label: 'Min Value', type: 'number' },
                        ],
                        onFilter: jest.fn(),
                    }}
                />,
            )
            await user.click(screen.getByRole('button', { name: 'Toggle filters' }))
            expect(screen.getByLabelText('Name')).toBeInTheDocument()
            expect(screen.getByLabelText('Min Value')).toBeInTheDocument()
        })
    })

    // ── Pagination ARIA ──────────────────────────────────────────────────

    describe('Pagination ARIA', () => {
        it('pagination wrapper has role="navigation" and aria-label "Table pagination"', () => {
            render(
                <Table<Row>
                    ariaLabel="test"
                    data={rows}
                    columns={basicColumns}
                    pagination={{
                        page: 1,
                        totalPages: 3,
                        onPageChange: jest.fn(),
                        onPageSizeChange: jest.fn(),
                    }}
                />,
            )
            expect(screen.getByRole('navigation', { name: 'Table pagination' })).toBeInTheDocument()
        })

        it('page buttons have aria-label "Page N"', () => {
            render(
                <Table<Row>
                    ariaLabel="test"
                    data={rows}
                    columns={basicColumns}
                    pagination={{
                        page: 1,
                        totalPages: 3,
                        onPageChange: jest.fn(),
                        onPageSizeChange: jest.fn(),
                    }}
                />,
            )
            expect(screen.getByRole('button', { name: 'Page 1' })).toBeInTheDocument()
            expect(screen.getByRole('button', { name: 'Page 2' })).toBeInTheDocument()
            expect(screen.getByRole('button', { name: 'Page 3' })).toBeInTheDocument()
        })

        it('current page button has aria-current="page"', () => {
            render(
                <Table<Row>
                    ariaLabel="test"
                    data={rows}
                    columns={basicColumns}
                    pagination={{
                        page: 2,
                        totalPages: 3,
                        onPageChange: jest.fn(),
                        onPageSizeChange: jest.fn(),
                    }}
                />,
            )
            expect(screen.getByRole('button', { name: 'Page 2' })).toHaveAttribute(
                'aria-current',
                'page',
            )
        })

        it('non-current page buttons do not have aria-current', () => {
            render(
                <Table<Row>
                    ariaLabel="test"
                    data={rows}
                    columns={basicColumns}
                    pagination={{
                        page: 2,
                        totalPages: 3,
                        onPageChange: jest.fn(),
                        onPageSizeChange: jest.fn(),
                    }}
                />,
            )
            expect(screen.getByRole('button', { name: 'Page 1' })).not.toHaveAttribute(
                'aria-current',
            )
        })

        it('first/previous/next/last buttons have correct aria-labels', () => {
            render(
                <Table<Row>
                    ariaLabel="test"
                    data={rows}
                    columns={basicColumns}
                    pagination={{
                        page: 2,
                        totalPages: 5,
                        onPageChange: jest.fn(),
                        onPageSizeChange: jest.fn(),
                    }}
                />,
            )
            expect(screen.getByRole('button', { name: 'First page' })).toBeInTheDocument()
            expect(screen.getByRole('button', { name: 'Previous page' })).toBeInTheDocument()
            expect(screen.getByRole('button', { name: 'Next page' })).toBeInTheDocument()
            expect(screen.getByRole('button', { name: 'Last page' })).toBeInTheDocument()
        })

        it('first/previous buttons are disabled on page 1', () => {
            render(
                <Table<Row>
                    ariaLabel="test"
                    data={rows}
                    columns={basicColumns}
                    pagination={{
                        page: 1,
                        totalPages: 5,
                        onPageChange: jest.fn(),
                        onPageSizeChange: jest.fn(),
                    }}
                />,
            )
            expect(screen.getByRole('button', { name: 'First page' })).toBeDisabled()
            expect(screen.getByRole('button', { name: 'Previous page' })).toBeDisabled()
        })

        it('next/last buttons are disabled on last page', () => {
            render(
                <Table<Row>
                    ariaLabel="test"
                    data={rows}
                    columns={basicColumns}
                    pagination={{
                        page: 5,
                        totalPages: 5,
                        onPageChange: jest.fn(),
                        onPageSizeChange: jest.fn(),
                    }}
                />,
            )
            expect(screen.getByRole('button', { name: 'Next page' })).toBeDisabled()
            expect(screen.getByRole('button', { name: 'Last page' })).toBeDisabled()
        })

        it('shows item range when totalItems is provided', () => {
            render(
                <Table<Row>
                    ariaLabel="test"
                    data={rows}
                    columns={basicColumns}
                    pagination={{
                        page: 1,
                        totalPages: 3,
                        pageSize: 10,
                        totalItems: 25,
                        onPageChange: jest.fn(),
                        onPageSizeChange: jest.fn(),
                    }}
                />,
            )
            expect(screen.getByLabelText('Items 1 to 10')).toBeInTheDocument()
            expect(screen.getByLabelText('Total items: 25')).toBeInTheDocument()
        })
    })

    // ── Download ARIA ────────────────────────────────────────────────────

    describe('Download ARIA', () => {
        it('single download button has aria-label "Download" by default', () => {
            render(
                <Table<Row>
                    ariaLabel="test"
                    data={rows}
                    columns={basicColumns}
                    download={{ onDownload: jest.fn() }}
                />,
            )
            expect(screen.getByRole('button', { name: 'Download' })).toBeInTheDocument()
        })

        it('single download button uses custom label as aria-label', () => {
            render(
                <Table<Row>
                    ariaLabel="test"
                    data={rows}
                    columns={basicColumns}
                    download={{ label: 'Export CSV', onDownload: jest.fn() }}
                />,
            )
            expect(screen.getByRole('button', { name: 'Export CSV' })).toBeInTheDocument()
        })

        it('multi-option download trigger has aria-label "Download"', () => {
            render(
                <Table<Row>
                    ariaLabel="test"
                    data={rows}
                    columns={basicColumns}
                    download={{
                        options: [
                            { value: 'csv', label: 'CSV' },
                            { value: 'pdf', label: 'PDF' },
                        ],
                        onDownload: jest.fn(),
                    }}
                />,
            )
            expect(screen.getByRole('button', { name: 'Download' })).toBeInTheDocument()
        })

        it('multi-option dropdown has aria-haspopup="listbox"', () => {
            render(
                <Table<Row>
                    ariaLabel="test"
                    data={rows}
                    columns={basicColumns}
                    download={{
                        options: [
                            { value: 'csv', label: 'CSV' },
                            { value: 'pdf', label: 'PDF' },
                        ],
                        onDownload: jest.fn(),
                    }}
                />,
            )
            expect(screen.getByRole('button', { name: 'Download' })).toHaveAttribute(
                'aria-haspopup',
                'listbox',
            )
        })
    })

    // ── Info Button ARIA ─────────────────────────────────────────────────

    describe('Info button ARIA', () => {
        it('renders info button with aria-label "More information"', () => {
            render(
                <Table<Row>
                    title="Info"
                    ariaLabel="test"
                    data={rows}
                    columns={basicColumns}
                    onInfo={jest.fn()}
                />,
            )
            expect(screen.getByRole('button', { name: 'More information' })).toBeInTheDocument()
        })

        it('does not render info button when onInfo is not provided', () => {
            render(
                <Table<Row> title="No Info" ariaLabel="test" data={rows} columns={basicColumns} />,
            )
            expect(
                screen.queryByRole('button', { name: 'More information' }),
            ).not.toBeInTheDocument()
        })
    })

    // ── Table aria-label fallback ────────────────────────────────────────

    describe('Table aria-label fallback', () => {
        it('table element uses aria-label when no title is provided', () => {
            render(<Table<Row> ariaLabel="Fallback label" data={rows} columns={basicColumns} />)
            expect(screen.getByRole('table')).toHaveAttribute('aria-label', 'Fallback label')
        })

        it('table element does not have aria-label when title provides aria-labelledby', () => {
            render(
                <Table<Row> title="Titled" ariaLabel="test" data={rows} columns={basicColumns} />,
            )
            expect(screen.getByRole('table')).not.toHaveAttribute('aria-label')
        })
    })

    // ── Description aria-describedby ─────────────────────────────────────

    describe('Description ARIA', () => {
        it('table has aria-describedby pointing to the description element', () => {
            render(
                <Table<Row>
                    ariaLabel="test"
                    description="A helpful description"
                    data={rows}
                    columns={basicColumns}
                />,
            )
            const table = screen.getByRole('table')
            const descId = table.getAttribute('aria-describedby')
            expect(descId).toBeTruthy()
            const descEl = document.getElementById(descId!)
            expect(descEl).toBeInTheDocument()
            expect(descEl).toHaveTextContent('A helpful description')
        })

        it('table does not have aria-describedby when no description', () => {
            render(<Table<Row> ariaLabel="test" data={rows} columns={basicColumns} />)
            expect(screen.getByRole('table')).not.toHaveAttribute('aria-describedby')
        })
    })

    // ── Filter aria-controls ─────────────────────────────────────────────

    describe('Filter aria-controls', () => {
        it('filter toggle has aria-controls pointing to the filter panel id', async () => {
            const user = userEvent.setup()
            render(
                <Table<Row>
                    ariaLabel="test"
                    data={rows}
                    columns={basicColumns}
                    filtering={{
                        inputs: [{ key: 'name', label: 'Name', type: 'text' }],
                        onFilter: jest.fn(),
                    }}
                />,
            )
            const toggle = screen.getByRole('button', { name: 'Toggle filters' })
            const controlsId = toggle.getAttribute('aria-controls')
            expect(controlsId).toBeTruthy()
            await user.click(toggle)
            const panel = screen.getByRole('search', { name: 'Table filters' })
            expect(panel).toHaveAttribute('id', controlsId)
        })

        it('filter reset button has aria-label "Reset filters"', async () => {
            const user = userEvent.setup()
            render(
                <Table<Row>
                    ariaLabel="test"
                    data={rows}
                    columns={basicColumns}
                    filtering={{
                        inputs: [{ key: 'name', label: 'Name', type: 'text' }],
                        onFilter: jest.fn(),
                    }}
                />,
            )
            await user.click(screen.getByRole('button', { name: 'Toggle filters' }))
            expect(screen.getByRole('button', { name: 'Reset filters' })).toBeInTheDocument()
        })
    })

    // ── Action menu aria-controls ────────────────────────────────────────

    describe('Action menu aria-controls', () => {
        it('action button has aria-controls linking to the menu', async () => {
            const user = userEvent.setup()
            render(
                <Table<Row>
                    ariaLabel="test"
                    data={rows.slice(0, 1)}
                    columns={basicColumns}
                    actions={[{ id: 'edit', label: 'Edit' }]}
                />,
            )
            const btn = screen.getByRole('button', { name: 'Row actions' })
            const controlsId = btn.getAttribute('aria-controls')
            expect(controlsId).toBeTruthy()
            await user.click(btn)
            const menu = screen.getByRole('menu', { name: 'Row actions menu' })
            expect(menu).toHaveAttribute('id', controlsId)
        })
    })

    // ── Dropdown aria-controls ───────────────────────────────────────────

    describe('Dropdown aria-controls', () => {
        it('multi-option download trigger has aria-controls linking to the listbox', async () => {
            const user = userEvent.setup()
            render(
                <Table<Row>
                    ariaLabel="test"
                    data={rows}
                    columns={basicColumns}
                    download={{
                        options: [
                            { value: 'csv', label: 'CSV' },
                            { value: 'pdf', label: 'PDF' },
                        ],
                        onDownload: jest.fn(),
                    }}
                />,
            )
            const trigger = screen.getByRole('button', { name: 'Download' })
            const controlsId = trigger.getAttribute('aria-controls')
            expect(controlsId).toBeTruthy()
            await user.click(trigger)
            const listbox = screen.getByRole('listbox', { name: 'Download' })
            expect(listbox).toHaveAttribute('id', controlsId)
        })
    })

    // ── Escape key handling ──────────────────────────────────────────────

    describe('Escape key handling', () => {
        it('pressing Escape closes the action menu', async () => {
            const user = userEvent.setup()
            render(
                <Table<Row>
                    ariaLabel="test"
                    data={rows.slice(0, 1)}
                    columns={basicColumns}
                    actions={[{ id: 'edit', label: 'Edit' }]}
                />,
            )
            const btn = screen.getByRole('button', { name: 'Row actions' })
            await user.click(btn)
            expect(btn).toHaveAttribute('aria-expanded', 'true')
            await user.keyboard('{Escape}')
            expect(btn).toHaveAttribute('aria-expanded', 'false')
        })

        it('pressing Escape closes the dropdown', async () => {
            const user = userEvent.setup()
            render(
                <Table<Row>
                    ariaLabel="test"
                    data={rows}
                    columns={basicColumns}
                    download={{
                        options: [
                            { value: 'csv', label: 'CSV' },
                            { value: 'pdf', label: 'PDF' },
                        ],
                        onDownload: jest.fn(),
                    }}
                />,
            )
            const trigger = screen.getByRole('button', { name: 'Download' })
            await user.click(trigger)
            expect(trigger).toHaveAttribute('aria-expanded', 'true')
            await user.keyboard('{Escape}')
            expect(trigger).toHaveAttribute('aria-expanded', 'false')
        })
    })
})
