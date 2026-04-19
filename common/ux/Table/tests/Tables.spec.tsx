import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Table } from '../Table'
import type { CellMeta } from '../Table.types'
import { getCellContent, getTotalCols } from '../Table.utils'

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
import { getNextSortDirection } from '../TableHead/TableHead.utils'
import {
    getPageWindow,
    isFirstPage,
    isLastPage,
    DEFAULT_PAGE_SIZE,
    DEFAULT_PAGE_SIZE_OPTIONS,
} from '../TablePagination/TablePagination.utils'
import {
    getSelectableRows,
    getSelectableIds,
    getAllSelected,
} from '../TableCheckbox/TableCheckbox.selectors'

// ── Shared Helpers ───────────────────────────────────────────────────────────

type Row = { name: string; value: string; status: string; note: string }

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

// ═════════════════════════════════════════════════════════════════════════════
//  SECTION 1 — FUNDAMENTALS
// ═════════════════════════════════════════════════════════════════════════════

describe('Table — Fundamentals', () => {
    // ── Title ────────────────────────────────────────────────────────────

    describe('Title', () => {
        it('renders a heading when title is provided', () => {
            render(<Table<Row> title="Users" ariaLabel="test" data={rows} columns={basicColumns} />)
            expect(screen.getByRole('heading', { name: 'Users' })).toBeInTheDocument()
        })

        it('does not render a heading when title is omitted', () => {
            render(<Table<Row> ariaLabel="test" data={rows} columns={basicColumns} />)
            expect(screen.queryByRole('heading')).not.toBeInTheDocument()
        })

        it('does not render header section when no title, description, onInfo, filtering, or download', () => {
            const { container } = render(
                <Table<Row> ariaLabel="test" data={rows} columns={basicColumns} />,
            )
            expect(container.querySelector('.table-header')).not.toBeInTheDocument()
        })
    })

    // ── Description ──────────────────────────────────────────────────────

    describe('Description', () => {
        it('renders description text', () => {
            render(
                <Table<Row>
                    title="T"
                    description="Detailed info"
                    ariaLabel="test"
                    data={rows}
                    columns={basicColumns}
                />,
            )
            expect(screen.getByText('Detailed info')).toBeInTheDocument()
        })

        it('renders description as ReactNode', () => {
            render(
                <Table<Row>
                    title="T"
                    description={<strong>Bold description</strong>}
                    ariaLabel="test"
                    data={rows}
                    columns={basicColumns}
                />,
            )
            expect(screen.getByText('Bold description').tagName).toBe('STRONG')
        })

        it('does not render description when omitted', () => {
            const { container } = render(
                <Table<Row> title="T" ariaLabel="test" data={rows} columns={basicColumns} />,
            )
            expect(container.querySelector('.table-description')).not.toBeInTheDocument()
        })
    })

    // ── Info Button ──────────────────────────────────────────────────────

    describe('Info button', () => {
        it('renders info button when onInfo is provided', () => {
            render(
                <Table<Row>
                    title="T"
                    onInfo={jest.fn()}
                    ariaLabel="test"
                    data={rows}
                    columns={basicColumns}
                />,
            )
            expect(screen.getByRole('button', { name: 'More information' })).toBeInTheDocument()
        })

        it('calls onInfo when clicked', async () => {
            const onInfo = jest.fn()
            const user = userEvent.setup()
            render(
                <Table<Row>
                    title="T"
                    onInfo={onInfo}
                    ariaLabel="test"
                    data={rows}
                    columns={basicColumns}
                />,
            )
            await user.click(screen.getByRole('button', { name: 'More information' }))
            expect(onInfo).toHaveBeenCalledTimes(1)
        })
    })

    // ── Legend ────────────────────────────────────────────────────────────

    describe('Legend', () => {
        it('renders legend content below the header', () => {
            render(
                <Table<Row>
                    title="T"
                    ariaLabel="test"
                    data={rows}
                    columns={basicColumns}
                    legend={<span data-testid="legend">Legend here</span>}
                />,
            )
            expect(screen.getByTestId('legend')).toBeInTheDocument()
        })

        it('does not render legend wrapper when omitted', () => {
            const { container } = render(
                <Table<Row> ariaLabel="test" data={rows} columns={basicColumns} />,
            )
            expect(container.querySelector('.table-legend')).not.toBeInTheDocument()
        })
    })

    // ── Empty State ──────────────────────────────────────────────────────

    describe('Empty state', () => {
        it('shows "No data" by default when data is empty', () => {
            render(<Table<Row> ariaLabel="test" data={[]} columns={basicColumns} />)
            expect(screen.getByText('No data')).toBeInTheDocument()
        })

        it('shows custom emptyState content', () => {
            render(
                <Table<Row>
                    ariaLabel="test"
                    data={[]}
                    columns={basicColumns}
                    emptyState="Nothing found"
                />,
            )
            expect(screen.getByText('Nothing found')).toBeInTheDocument()
        })

        it('shows custom emptyState as ReactNode', () => {
            render(
                <Table<Row>
                    ariaLabel="test"
                    data={[]}
                    columns={basicColumns}
                    emptyState={<em>Try adjusting filters</em>}
                />,
            )
            expect(screen.getByText('Try adjusting filters')).toBeInTheDocument()
        })

        it('empty state cell spans all columns', () => {
            render(<Table<Row> ariaLabel="test" data={[]} columns={basicColumns} />)
            expect(screen.getByRole('status')).toHaveAttribute(
                'colspan',
                String(basicColumns.length),
            )
        })

        it('empty state cell spans all columns including actions column', () => {
            render(
                <Table<Row>
                    ariaLabel="test"
                    data={[]}
                    columns={basicColumns}
                    actions={[{ id: 'x', label: 'X' }]}
                />,
            )
            expect(screen.getByRole('status')).toHaveAttribute(
                'colspan',
                String(basicColumns.length + 1),
            )
        })

        it('empty state cell spans all columns including selection column', () => {
            render(
                <Table<Row>
                    ariaLabel="test"
                    data={[]}
                    columns={basicColumns}
                    selection={{
                        getRowId: (r) => r.name,
                        selectedRowIds: [],
                        onChange: jest.fn(),
                    }}
                />,
            )
            expect(screen.getByRole('status')).toHaveAttribute(
                'colspan',
                String(basicColumns.length + 1),
            )
        })

        it('does not show empty state when data has rows', () => {
            render(<Table<Row> ariaLabel="test" data={rows} columns={basicColumns} />)
            expect(screen.queryByText('No data')).not.toBeInTheDocument()
        })
    })

    // ── Basic Data Rendering ─────────────────────────────────────────────

    describe('Basic data rendering', () => {
        it('renders correct number of body rows', () => {
            render(<Table<Row> ariaLabel="test" data={rows} columns={basicColumns} />)
            // 1 header row + N body rows
            const allRows = screen.getAllByRole('row')
            expect(allRows).toHaveLength(rows.length + 1)
        })

        it('renders column headers', () => {
            render(<Table<Row> ariaLabel="test" data={rows} columns={basicColumns} />)
            expect(screen.getByText('Name')).toBeInTheDocument()
            expect(screen.getByText('Value')).toBeInTheDocument()
            expect(screen.getByText('Status')).toBeInTheDocument()
        })

        it('renders cell values from data', () => {
            render(<Table<Row> ariaLabel="test" data={rows} columns={basicColumns} />)
            expect(screen.getByText('Alpha')).toBeInTheDocument()
            expect(screen.getByText('10')).toBeInTheDocument()
            expect(screen.getAllByText('active').length).toBeGreaterThanOrEqual(1)
        })

        it('renders all data rows', () => {
            render(<Table<Row> ariaLabel="test" data={rows} columns={basicColumns} />)
            rows.forEach((row) => {
                expect(screen.getByText(row.name)).toBeInTheDocument()
            })
        })
    })
})

// ═════════════════════════════════════════════════════════════════════════════
//  SECTION 2 — CELL RENDERING & DEFAULTS
// ═════════════════════════════════════════════════════════════════════════════

describe('Table — Cell Rendering & Defaults', () => {
    describe('Default cell rendering', () => {
        it('renders raw value when no cell function or defaultValue', () => {
            render(
                <Table<Row>
                    ariaLabel="test"
                    data={[{ name: 'Foo', value: '42', status: 'ok', note: 'hi' }]}
                    columns={[{ header: 'Name', accessor: 'name' }]}
                />,
            )
            expect(screen.getByText('Foo')).toBeInTheDocument()
        })

        it('renders dash "-" for empty string when no defaultValue', () => {
            render(
                <Table<Row>
                    ariaLabel="test"
                    data={[{ name: '', value: '', status: '', note: '' }]}
                    columns={[{ header: 'Name', accessor: 'name' }]}
                />,
            )
            expect(screen.getByText('-')).toBeInTheDocument()
        })

        it('renders custom defaultValue for empty cells', () => {
            render(
                <Table<Row>
                    ariaLabel="test"
                    data={[{ name: '', value: '', status: '', note: '' }]}
                    columns={[{ header: 'Name', accessor: 'name', defaultValue: 'N/A' }]}
                />,
            )
            expect(screen.getByText('N/A')).toBeInTheDocument()
        })

        it('renders custom defaultValue as ReactNode', () => {
            render(
                <Table<Row>
                    ariaLabel="test"
                    data={[{ name: '', value: '', status: '', note: '' }]}
                    columns={[
                        {
                            header: 'Name',
                            accessor: 'name',
                            defaultValue: <em>empty</em>,
                        },
                    ]}
                />,
            )
            expect(screen.getByText('empty').tagName).toBe('EM')
        })
    })

    describe('Custom cell renderer', () => {
        it('calls cell function with value and meta', () => {
            const cellFn = jest.fn((val) => <strong>{String(val).toUpperCase()}</strong>)
            render(
                <Table<Row>
                    ariaLabel="test"
                    data={[{ name: 'alpha', value: '1', status: 'ok', note: '' }]}
                    columns={[{ header: 'Name', accessor: 'name', cell: cellFn }]}
                />,
            )
            expect(cellFn).toHaveBeenCalledTimes(1)
            expect(screen.getByText('ALPHA')).toBeInTheDocument()
        })

        it('cell function receives correct meta fields', () => {
            const cellFn = jest.fn((_val, meta: CellMeta<Row>) => <span>{meta.index}</span>)
            const data = [{ name: 'A', value: '1', status: 'x', note: '' }]
            render(
                <Table<Row>
                    ariaLabel="test"
                    data={data}
                    columns={[{ header: 'Name', accessor: 'name', cell: cellFn }]}
                />,
            )
            const meta = cellFn.mock.calls[0][1]
            expect(meta.index).toBe(0)
            expect(meta.row).toEqual(data[0])
            expect(meta.data).toEqual(data)
            expect(meta.cell).toBe('A')
        })

        it('cell function receives context when provided', () => {
            const cellFn = jest.fn((_val, meta: CellMeta<Row, string>) => (
                <span>{String(meta.context)}</span>
            ))
            render(
                <Table<Row, string>
                    ariaLabel="test"
                    data={[{ name: 'A', value: '1', status: 'x', note: '' }]}
                    columns={[{ header: 'Name', accessor: 'name', cell: cellFn }]}
                    context="my-context"
                />,
            )
            expect(cellFn.mock.calls[0][1].context).toBe('my-context')
        })

        it('custom cell overrides defaultValue even for empty cells', () => {
            render(
                <Table<Row>
                    ariaLabel="test"
                    data={[{ name: '', value: '', status: '', note: '' }]}
                    columns={[
                        {
                            header: 'Name',
                            accessor: 'name',
                            cell: (val) => <span>{val || 'CUSTOM EMPTY'}</span>,
                            defaultValue: 'N/A',
                        },
                    ]}
                />,
            )
            expect(screen.getByText('CUSTOM EMPTY')).toBeInTheDocument()
            expect(screen.queryByText('N/A')).not.toBeInTheDocument()
        })
    })

    describe('getCellContent utility', () => {
        it('returns raw value for non-empty cells without cell function', () => {
            const result = getCellContent({
                col: { header: 'Name', accessor: 'name' },
                row: { name: 'Test', value: '1', status: 'ok', note: '' },
                index: 0,
                data: [{ name: 'Test', value: '1', status: 'ok', note: '' }],
            })
            expect(result).toBe('Test')
        })

        it('returns dash for empty string without defaultValue', () => {
            const result = getCellContent({
                col: { header: 'Name', accessor: 'name' },
                row: { name: '', value: '1', status: 'ok', note: '' },
                index: 0,
                data: [{ name: '', value: '1', status: 'ok', note: '' }],
            })
            expect(result).toBe('-')
        })

        it('returns defaultValue for empty string', () => {
            const result = getCellContent({
                col: { header: 'Name', accessor: 'name', defaultValue: 'N/A' },
                row: { name: '', value: '1', status: 'ok', note: '' },
                index: 0,
                data: [{ name: '', value: '1', status: 'ok', note: '' }],
            })
            expect(result).toBe('N/A')
        })

        it('uses cell function when provided', () => {
            const result = getCellContent({
                col: { header: 'Name', accessor: 'name', cell: (v) => `[${v}]` },
                row: { name: 'X', value: '1', status: 'ok', note: '' },
                index: 0,
                data: [{ name: 'X', value: '1', status: 'ok', note: '' }],
            })
            expect(result).toBe('[X]')
        })
    })
})

// ═════════════════════════════════════════════════════════════════════════════
//  SECTION 3 — VARIANTS
// ═════════════════════════════════════════════════════════════════════════════

describe('Table — Variants', () => {
    describe('Static column variant', () => {
        it('applies variant class to cells in that column', () => {
            const { container } = render(
                <Table<Row>
                    ariaLabel="test"
                    data={rows.slice(0, 1)}
                    columns={[
                        { header: 'Name', accessor: 'name', variant: 'primary' },
                        { header: 'Value', accessor: 'value' },
                    ]}
                />,
            )
            const cells = container.querySelectorAll('td')
            expect(cells[0]).toHaveClass('variant-primary')
        })

        it.each(['primary', 'secondary', 'danger', 'disabled'] as const)(
            'applies variant-%s class',
            (variant) => {
                const { container } = render(
                    <Table<Row>
                        ariaLabel="test"
                        data={rows.slice(0, 1)}
                        columns={[{ header: 'Name', accessor: 'name', variant }]}
                    />,
                )
                const cell = container.querySelector('td')
                expect(cell).toHaveClass(`variant-${variant}`)
            },
        )
    })

    describe('Function column variant', () => {
        it('applies variant class based on cell value', () => {
            const { container } = render(
                <Table<Row>
                    ariaLabel="test"
                    data={[
                        { name: 'A', value: '1', status: 'active', note: '' },
                        { name: 'B', value: '2', status: 'inactive', note: '' },
                    ]}
                    columns={[
                        {
                            header: 'Status',
                            accessor: 'status',
                            variant: (_, { row }) =>
                                row.status === 'active' ? 'primary' : 'danger',
                        },
                    ]}
                />,
            )
            const cells = container.querySelectorAll('tbody td')
            expect(cells[0]).toHaveClass('variant-primary')
            expect(cells[1]).toHaveClass('variant-danger')
        })

        it('applies no variant class when function returns undefined', () => {
            const { container } = render(
                <Table<Row>
                    ariaLabel="test"
                    data={rows.slice(0, 1)}
                    columns={[
                        {
                            header: 'Name',
                            accessor: 'name',
                            variant: () => undefined,
                        },
                    ]}
                />,
            )
            const cell = container.querySelector('tbody td')
            expect(cell?.className).not.toContain('variant-')
        })
    })

    describe('Row variant', () => {
        it('applies row variant to all cells in a row', () => {
            const { container } = render(
                <Table<Row>
                    ariaLabel="test"
                    data={[{ name: 'A', value: '1', status: 'inactive', note: '' }]}
                    columns={[
                        { header: 'Name', accessor: 'name' },
                        { header: 'Value', accessor: 'value' },
                    ]}
                    rowVariant={({ row }) => (row.status === 'inactive' ? 'disabled' : undefined)}
                />,
            )
            const cells = container.querySelectorAll('tbody td')
            cells.forEach((cell) => {
                expect(cell).toHaveClass('variant-disabled')
            })
        })

        it('row variant does not override column variant (column variant wins)', () => {
            const { container } = render(
                <Table<Row>
                    ariaLabel="test"
                    data={[{ name: 'A', value: '1', status: 'inactive', note: '' }]}
                    columns={[
                        { header: 'Name', accessor: 'name', variant: 'primary' },
                        { header: 'Value', accessor: 'value' },
                    ]}
                    rowVariant={() => 'danger'}
                />,
            )
            const cells = container.querySelectorAll('tbody td')
            // Name column: static variant 'primary' overrides rowVariant because
            // in the code, col.variant (when string) is used, rowVariant is fallback
            expect(cells[0]).toHaveClass('variant-primary')
            // Value column: no column variant, so rowVariant applies
            expect(cells[1]).toHaveClass('variant-danger')
        })

        it('function column variant takes priority over row variant', () => {
            const { container } = render(
                <Table<Row>
                    ariaLabel="test"
                    data={[{ name: 'A', value: '1', status: 'x', note: '' }]}
                    columns={[
                        {
                            header: 'Name',
                            accessor: 'name',
                            variant: () => 'secondary',
                        },
                    ]}
                    rowVariant={() => 'danger'}
                />,
            )
            const cell = container.querySelector('tbody td')
            expect(cell).toHaveClass('variant-secondary')
        })

        it('row variant undefined does not add variant class', () => {
            const { container } = render(
                <Table<Row>
                    ariaLabel="test"
                    data={rows.slice(0, 1)}
                    columns={[{ header: 'Name', accessor: 'name' }]}
                    rowVariant={() => undefined}
                />,
            )
            const cell = container.querySelector('tbody td')
            expect(cell?.className).not.toContain('variant-')
        })
    })
})

// ═════════════════════════════════════════════════════════════════════════════
//  SECTION 4 — ACTIONS
// ═════════════════════════════════════════════════════════════════════════════

describe('Table — Actions', () => {
    describe('Basic actions', () => {
        it('renders action column when actions are provided', () => {
            render(
                <Table<Row>
                    ariaLabel="test"
                    data={rows.slice(0, 1)}
                    columns={basicColumns}
                    actions={[{ id: 'edit', label: 'Edit' }]}
                />,
            )
            expect(screen.getByRole('button', { name: 'Row actions' })).toBeInTheDocument()
        })

        it('does not render action column when no actions', () => {
            render(<Table<Row> ariaLabel="test" data={rows} columns={basicColumns} />)
            expect(screen.queryByRole('button', { name: 'Row actions' })).not.toBeInTheDocument()
        })

        it('renders one action button per row', () => {
            render(
                <Table<Row>
                    ariaLabel="test"
                    data={rows}
                    columns={basicColumns}
                    actions={[{ id: 'edit', label: 'Edit' }]}
                />,
            )
            expect(screen.getAllByRole('button', { name: 'Row actions' })).toHaveLength(rows.length)
        })
    })

    describe('onClick action', () => {
        it('calls onClick with correct meta when action is clicked', async () => {
            const onClick = jest.fn()
            const user = userEvent.setup()
            render(
                <Table<Row>
                    ariaLabel="test"
                    data={rows.slice(0, 1)}
                    columns={basicColumns}
                    actions={[{ id: 'edit', label: 'Edit', onClick }]}
                />,
            )
            await user.click(screen.getByRole('button', { name: 'Row actions' }))
            await user.click(screen.getByRole('menuitem', { name: 'Edit' }))
            expect(onClick).toHaveBeenCalledTimes(1)
            expect(onClick).toHaveBeenCalledWith(
                expect.objectContaining({
                    row: rows[0],
                    index: 0,
                }),
            )
        })

        it('closes dropdown after clicking an action', async () => {
            const user = userEvent.setup()
            render(
                <Table<Row>
                    ariaLabel="test"
                    data={rows.slice(0, 1)}
                    columns={basicColumns}
                    actions={[{ id: 'edit', label: 'Edit', onClick: jest.fn() }]}
                />,
            )
            await user.click(screen.getByRole('button', { name: 'Row actions' }))
            await user.click(screen.getByRole('menuitem', { name: 'Edit' }))
            expect(screen.queryByRole('menu')).not.toBeInTheDocument()
        })
    })

    describe('href action', () => {
        it('navigates to href computed from meta', async () => {
            const user = userEvent.setup()
            const originalHref = window.location.href
            render(
                <Table<Row>
                    ariaLabel="test"
                    data={rows.slice(0, 1)}
                    columns={basicColumns}
                    actions={[
                        {
                            id: 'view',
                            label: 'View',
                            href: ({ row }) => `#${row.name.toLowerCase()}`,
                        },
                    ]}
                />,
            )
            await user.click(screen.getByRole('button', { name: 'Row actions' }))
            await user.click(screen.getByRole('menuitem', { name: 'View' }))
            // jsdom doesn't navigate, but we can check the location was set
            expect(window.location.href).toContain('alpha')
            // Restore
            window.location.href = originalHref
        })
    })

    describe('filter action', () => {
        it('hides action when filter returns false', async () => {
            const user = userEvent.setup()
            render(
                <Table<Row>
                    ariaLabel="test"
                    data={[
                        { name: 'Visible', value: '1', status: 'active', note: '' },
                        { name: 'Hidden', value: '2', status: 'inactive', note: '' },
                    ]}
                    columns={basicColumns}
                    actions={[
                        {
                            id: 'activate',
                            label: 'Activate',
                            filter: ({ row }) => row.status !== 'active',
                        },
                    ]}
                />,
            )
            // First row — action filtered out (active)
            const btns = screen.getAllByRole('button', { name: 'Row actions' })
            await user.click(btns[0])
            expect(screen.queryByRole('menuitem', { name: 'Activate' })).not.toBeInTheDocument()
        })

        it('shows action when filter returns true', async () => {
            const user = userEvent.setup()
            render(
                <Table<Row>
                    ariaLabel="test"
                    data={[
                        { name: 'Active', value: '1', status: 'active', note: '' },
                        { name: 'Inactive', value: '2', status: 'inactive', note: '' },
                    ]}
                    columns={basicColumns}
                    actions={[
                        {
                            id: 'activate',
                            label: 'Activate',
                            filter: ({ row }) => row.status !== 'active',
                        },
                    ]}
                />,
            )
            // Second row — action visible (inactive)
            const btns = screen.getAllByRole('button', { name: 'Row actions' })
            await user.click(btns[1])
            expect(screen.getByRole('menuitem', { name: 'Activate' })).toBeInTheDocument()
        })
    })

    describe('isDisabled action', () => {
        it('disables the action item when isDisabled returns true', async () => {
            const user = userEvent.setup()
            render(
                <Table<Row>
                    ariaLabel="test"
                    data={rows.slice(0, 1)}
                    columns={basicColumns}
                    actions={[
                        {
                            id: 'delete',
                            label: 'Delete',
                            isDisabled: () => true,
                        },
                    ]}
                />,
            )
            await user.click(screen.getByRole('button', { name: 'Row actions' }))
            expect(screen.getByRole('menuitem', { name: 'Delete' })).toBeDisabled()
        })

        it('does not disable the action item when isDisabled returns false', async () => {
            const user = userEvent.setup()
            render(
                <Table<Row>
                    ariaLabel="test"
                    data={rows.slice(0, 1)}
                    columns={basicColumns}
                    actions={[
                        {
                            id: 'delete',
                            label: 'Delete',
                            isDisabled: () => false,
                        },
                    ]}
                />,
            )
            await user.click(screen.getByRole('button', { name: 'Row actions' }))
            expect(screen.getByRole('menuitem', { name: 'Delete' })).not.toBeDisabled()
        })
    })

    describe('isActionDisabled (column-level)', () => {
        it('disables entire action button when isActionDisabled returns true', () => {
            render(
                <Table<Row>
                    ariaLabel="test"
                    data={[{ name: 'Disabled', value: '0', status: 'x', note: '' }]}
                    columns={[
                        {
                            header: 'Name',
                            accessor: 'name' as const,
                            isActionDisabled: () => true,
                        },
                    ]}
                    actions={[{ id: 'edit', label: 'Edit' }]}
                />,
            )
            expect(screen.getByRole('button', { name: 'Row actions' })).toBeDisabled()
        })

        it('does not disable action button when isActionDisabled returns false', () => {
            render(
                <Table<Row>
                    ariaLabel="test"
                    data={[{ name: 'Enabled', value: '1', status: 'x', note: '' }]}
                    columns={[
                        {
                            header: 'Name',
                            accessor: 'name' as const,
                            isActionDisabled: () => false,
                        },
                    ]}
                    actions={[{ id: 'edit', label: 'Edit' }]}
                />,
            )
            expect(screen.getByRole('button', { name: 'Row actions' })).not.toBeDisabled()
        })
    })

    describe('Action variants', () => {
        it.each(['primary', 'secondary', 'danger'] as const)(
            'applies %s variant class to action item',
            async (variant) => {
                const user = userEvent.setup()
                render(
                    <Table<Row>
                        ariaLabel="test"
                        data={rows.slice(0, 1)}
                        columns={basicColumns}
                        actions={[{ id: 'a', label: 'Action', variant }]}
                    />,
                )
                await user.click(screen.getByRole('button', { name: 'Row actions' }))
                const item = screen.getByRole('menuitem', { name: 'Action' })
                expect(item).toHaveClass(variant)
            },
        )
    })

    describe('Action menu toggle', () => {
        it('opens the menu on click', async () => {
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
            expect(screen.getByRole('menu')).toBeInTheDocument()
        })

        it('closes the menu on second click', async () => {
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
            await user.click(btn)
            expect(screen.queryByRole('menu')).not.toBeInTheDocument()
        })

        it('renders multiple actions in the dropdown', async () => {
            const user = userEvent.setup()
            render(
                <Table<Row>
                    ariaLabel="test"
                    data={rows.slice(0, 1)}
                    columns={basicColumns}
                    actions={[
                        { id: 'edit', label: 'Edit' },
                        { id: 'delete', label: 'Delete' },
                        { id: 'view', label: 'View' },
                    ]}
                />,
            )
            await user.click(screen.getByRole('button', { name: 'Row actions' }))
            expect(screen.getAllByRole('menuitem')).toHaveLength(3)
        })

        it('renders action icon when provided', async () => {
            const user = userEvent.setup()
            render(
                <Table<Row>
                    ariaLabel="test"
                    data={rows.slice(0, 1)}
                    columns={basicColumns}
                    actions={[
                        {
                            id: 'edit',
                            label: 'Edit',
                            icon: <span data-testid="edit-icon">✏️</span>,
                        },
                    ]}
                />,
            )
            await user.click(screen.getByRole('button', { name: 'Row actions' }))
            expect(screen.getByTestId('edit-icon')).toBeInTheDocument()
        })
    })
})

// ═════════════════════════════════════════════════════════════════════════════
//  SECTION 5 — SELECTION
// ═════════════════════════════════════════════════════════════════════════════

describe('Table — Selection', () => {
    describe('Multiple selection', () => {
        it('renders checkbox for every row', () => {
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

        it('renders "Select all rows" header checkbox', () => {
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

        it('calls onChange with row id when a row checkbox is clicked', async () => {
            const onChange = jest.fn()
            const user = userEvent.setup()
            render(
                <Table<Row>
                    ariaLabel="test"
                    data={rows}
                    columns={basicColumns}
                    selection={{
                        getRowId: (r) => r.name,
                        selectedRowIds: [],
                        onChange,
                    }}
                />,
            )
            await user.click(screen.getByRole('checkbox', { name: 'Select row 1' }))
            expect(onChange).toHaveBeenCalledWith(['Alpha'])
        })

        it('calls onChange removing id when already selected row is deselected', async () => {
            const onChange = jest.fn()
            const user = userEvent.setup()
            render(
                <Table<Row>
                    ariaLabel="test"
                    data={rows}
                    columns={basicColumns}
                    selection={{
                        getRowId: (r) => r.name,
                        selectedRowIds: ['Alpha'],
                        onChange,
                    }}
                />,
            )
            await user.click(screen.getByRole('checkbox', { name: 'Select row 1' }))
            expect(onChange).toHaveBeenCalledWith([])
        })

        it('select-all selects all rows', async () => {
            const onChange = jest.fn()
            const user = userEvent.setup()
            render(
                <Table<Row>
                    ariaLabel="test"
                    data={rows}
                    columns={basicColumns}
                    selection={{
                        getRowId: (r) => r.name,
                        selectedRowIds: [],
                        onChange,
                    }}
                />,
            )
            await user.click(screen.getByRole('checkbox', { name: 'Select all rows' }))
            expect(onChange).toHaveBeenCalledWith(rows.map((r) => r.name))
        })

        it('select-all deselects all when all are selected', async () => {
            const onChange = jest.fn()
            const user = userEvent.setup()
            render(
                <Table<Row>
                    ariaLabel="test"
                    data={rows}
                    columns={basicColumns}
                    selection={{
                        getRowId: (r) => r.name,
                        selectedRowIds: rows.map((r) => r.name),
                        onChange,
                    }}
                />,
            )
            await user.click(screen.getByRole('checkbox', { name: 'Select all rows' }))
            expect(onChange).toHaveBeenCalledWith([])
        })

        it('select-all checkbox is checked when all rows are selected', () => {
            render(
                <Table<Row>
                    ariaLabel="test"
                    data={rows}
                    columns={basicColumns}
                    selection={{
                        getRowId: (r) => r.name,
                        selectedRowIds: rows.map((r) => r.name),
                        onChange: jest.fn(),
                    }}
                />,
            )
            expect(screen.getByRole('checkbox', { name: 'Select all rows' })).toBeChecked()
        })

        it('select-all checkbox is unchecked when not all rows are selected', () => {
            render(
                <Table<Row>
                    ariaLabel="test"
                    data={rows}
                    columns={basicColumns}
                    selection={{
                        getRowId: (r) => r.name,
                        selectedRowIds: ['Alpha'],
                        onChange: jest.fn(),
                    }}
                />,
            )
            expect(screen.getByRole('checkbox', { name: 'Select all rows' })).not.toBeChecked()
        })

        it('row checkbox is checked when its id is in selectedRowIds', () => {
            render(
                <Table<Row>
                    ariaLabel="test"
                    data={rows}
                    columns={basicColumns}
                    selection={{
                        getRowId: (r) => r.name,
                        selectedRowIds: ['Beta'],
                        onChange: jest.fn(),
                    }}
                />,
            )
            expect(screen.getByRole('checkbox', { name: 'Select row 2' })).toBeChecked()
            expect(screen.getByRole('checkbox', { name: 'Select row 1' })).not.toBeChecked()
        })

        it('adds to existing selection when selecting another row', async () => {
            const onChange = jest.fn()
            const user = userEvent.setup()
            render(
                <Table<Row>
                    ariaLabel="test"
                    data={rows}
                    columns={basicColumns}
                    selection={{
                        getRowId: (r) => r.name,
                        selectedRowIds: ['Alpha'],
                        onChange,
                    }}
                />,
            )
            await user.click(screen.getByRole('checkbox', { name: 'Select row 2' }))
            expect(onChange).toHaveBeenCalledWith(['Alpha', 'Beta'])
        })
    })

    describe('Single selection', () => {
        it('does not render select-all checkbox', () => {
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

        it('selects only the clicked row', async () => {
            const onChange = jest.fn()
            const user = userEvent.setup()
            render(
                <Table<Row>
                    ariaLabel="test"
                    data={rows}
                    columns={basicColumns}
                    selection={{
                        mode: 'single',
                        getRowId: (r) => r.name,
                        selectedRowIds: [],
                        onChange,
                    }}
                />,
            )
            await user.click(screen.getByRole('checkbox', { name: 'Select row 1' }))
            expect(onChange).toHaveBeenCalledWith(['Alpha'])
        })

        it('deselects the row when clicking already selected', async () => {
            const onChange = jest.fn()
            const user = userEvent.setup()
            render(
                <Table<Row>
                    ariaLabel="test"
                    data={rows}
                    columns={basicColumns}
                    selection={{
                        mode: 'single',
                        getRowId: (r) => r.name,
                        selectedRowIds: ['Alpha'],
                        onChange,
                    }}
                />,
            )
            await user.click(screen.getByRole('checkbox', { name: 'Select row 1' }))
            expect(onChange).toHaveBeenCalledWith([])
        })
    })

    describe('isRowSelectable', () => {
        it('disables checkbox for non-selectable rows', () => {
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
            // Beta (index 1) is inactive
            expect(screen.getByRole('checkbox', { name: 'Select row 2' })).toBeDisabled()
        })

        it('enables checkbox for selectable rows', () => {
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
            expect(screen.getByRole('checkbox', { name: 'Select row 1' })).not.toBeDisabled()
            expect(screen.getByRole('checkbox', { name: 'Select row 3' })).not.toBeDisabled()
        })

        it('select-all only selects selectable rows', async () => {
            const onChange = jest.fn()
            const user = userEvent.setup()
            render(
                <Table<Row>
                    ariaLabel="test"
                    data={rows}
                    columns={basicColumns}
                    selection={{
                        getRowId: (r) => r.name,
                        selectedRowIds: [],
                        onChange,
                        isRowSelectable: ({ row }) => row.status !== 'inactive',
                    }}
                />,
            )
            await user.click(screen.getByRole('checkbox', { name: 'Select all rows' }))
            // Beta is inactive, should not be in the list
            expect(onChange).toHaveBeenCalledWith(expect.not.arrayContaining(['Beta']))
            expect(onChange).toHaveBeenCalledWith(
                expect.arrayContaining(['Alpha', 'Gamma', 'Delta']),
            )
        })

        it('select-all is disabled when no rows are selectable', () => {
            render(
                <Table<Row>
                    ariaLabel="test"
                    data={rows}
                    columns={basicColumns}
                    selection={{
                        getRowId: (r) => r.name,
                        selectedRowIds: [],
                        onChange: jest.fn(),
                        isRowSelectable: () => false,
                    }}
                />,
            )
            expect(screen.getByRole('checkbox', { name: 'Select all rows' })).toBeDisabled()
        })
    })

    describe('Selection selectors (unit)', () => {
        const data: Row[] = [
            { name: 'A', value: '1', status: 'active', note: '' },
            { name: 'B', value: '2', status: 'inactive', note: '' },
            { name: 'C', value: '3', status: 'active', note: '' },
        ]

        const baseSelection = {
            getRowId: (r: Row) => r.name,
            selectedRowIds: [] as string[],
            onChange: jest.fn(),
        }

        it('getSelectableRows returns all rows when no isRowSelectable', () => {
            const result = getSelectableRows({ data, selection: baseSelection })
            expect(result).toEqual(data)
        })

        it('getSelectableRows filters based on isRowSelectable', () => {
            const result = getSelectableRows({
                data,
                selection: {
                    ...baseSelection,
                    isRowSelectable: ({ row }) => row.status === 'active',
                },
            })
            expect(result).toHaveLength(2)
            expect(result.map((r) => r.name)).toEqual(['A', 'C'])
        })

        it('getSelectableIds returns ids of selectable rows', () => {
            const result = getSelectableIds({
                data,
                selection: {
                    ...baseSelection,
                    isRowSelectable: ({ row }) => row.status === 'active',
                },
            })
            expect(result).toEqual(['A', 'C'])
        })

        it('getAllSelected returns true when all selectable rows are selected', () => {
            const result = getAllSelected({
                data,
                selection: {
                    ...baseSelection,
                    selectedRowIds: ['A', 'C'],
                    isRowSelectable: ({ row }) => row.status === 'active',
                },
            })
            expect(result).toBe(true)
        })

        it('getAllSelected returns false when not all selectable rows are selected', () => {
            const result = getAllSelected({
                data,
                selection: {
                    ...baseSelection,
                    selectedRowIds: ['A'],
                    isRowSelectable: ({ row }) => row.status === 'active',
                },
            })
            expect(result).toBe(false)
        })

        it('getAllSelected returns false when no rows are selectable', () => {
            const result = getAllSelected({
                data,
                selection: {
                    ...baseSelection,
                    selectedRowIds: [],
                    isRowSelectable: () => false,
                },
            })
            expect(result).toBe(false)
        })
    })
})

// ═════════════════════════════════════════════════════════════════════════════
//  SECTION 6 — SORTING
// ═════════════════════════════════════════════════════════════════════════════

describe('Table — Sorting', () => {
    describe('Sortable headers', () => {
        it('renders sort button for sortable columns', () => {
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
            expect(screen.getByRole('button', { name: 'Sort by Name' })).toBeInTheDocument()
        })

        it('does not render sort button for non-sortable columns', () => {
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
            expect(screen.queryByRole('button', { name: 'Sort by Value' })).not.toBeInTheDocument()
        })

        it('renders non-sortable column header as plain text', () => {
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
            const valueHeader = screen
                .getAllByRole('columnheader')
                .find((th) => th.textContent === 'Value')
            expect(valueHeader).toBeTruthy()
            expect(valueHeader?.querySelector('button')).toBeNull()
        })
    })

    describe('Sort interactions', () => {
        it('calls onSortChange when a sortable header is clicked', async () => {
            const onSortChange = jest.fn()
            const user = userEvent.setup()
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
                        onSortChange,
                    }}
                />,
            )
            await user.click(screen.getByRole('button', { name: 'Sort by Name' }))
            expect(onSortChange).toHaveBeenCalledTimes(1)
        })

        it('toggles to desc when clicking the currently asc-sorted column', async () => {
            const onSortChange = jest.fn()
            const user = userEvent.setup()
            render(
                <Table<Row>
                    ariaLabel="test"
                    data={rows}
                    columns={[{ header: 'Name', accessor: 'name', isSortable: true }]}
                    sorting={{
                        column: 'name',
                        direction: 'asc',
                        onSortChange,
                    }}
                />,
            )
            await user.click(screen.getByRole('button', { name: 'Sort by Name' }))
            expect(onSortChange).toHaveBeenCalledWith('name', 'desc')
        })

        it('sorts asc when clicking a different column', async () => {
            const onSortChange = jest.fn()
            const user = userEvent.setup()
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
                        onSortChange,
                    }}
                />,
            )
            await user.click(screen.getByRole('button', { name: 'Sort by Value' }))
            expect(onSortChange).toHaveBeenCalledWith('value', 'asc')
        })

        it('sorts asc when clicking current column that is desc', async () => {
            const onSortChange = jest.fn()
            const user = userEvent.setup()
            render(
                <Table<Row>
                    ariaLabel="test"
                    data={rows}
                    columns={[{ header: 'Name', accessor: 'name', isSortable: true }]}
                    sorting={{
                        column: 'name',
                        direction: 'desc',
                        onSortChange,
                    }}
                />,
            )
            await user.click(screen.getByRole('button', { name: 'Sort by Name' }))
            expect(onSortChange).toHaveBeenCalledWith('name', 'asc')
        })
    })

    describe('Sort header styling classes', () => {
        it('adds sorted and sorted-asc class to the active ascending column', () => {
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
            const th = screen.getByRole('columnheader', { name: /Name/ })
            expect(th).toHaveClass('sorted')
            expect(th).toHaveClass('sorted-asc')
        })

        it('adds sorted and sorted-desc class for descending', () => {
            render(
                <Table<Row>
                    ariaLabel="test"
                    data={rows}
                    columns={[{ header: 'Name', accessor: 'name', isSortable: true }]}
                    sorting={{
                        column: 'name',
                        direction: 'desc',
                        onSortChange: jest.fn(),
                    }}
                />,
            )
            const th = screen.getByRole('columnheader', { name: /Name/ })
            expect(th).toHaveClass('sorted')
            expect(th).toHaveClass('sorted-desc')
        })

        it('does not add sorted class to inactive sortable column', () => {
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
            const th = screen.getByRole('columnheader', { name: /Value/ })
            expect(th).not.toHaveClass('sorted')
        })
    })

    describe('getNextSortDirection utility', () => {
        it('returns desc when current column is same and direction is asc', () => {
            expect(getNextSortDirection('name', 'asc', 'name')).toBe('desc')
        })

        it('returns asc when current column is same and direction is desc', () => {
            expect(getNextSortDirection('name', 'desc', 'name')).toBe('asc')
        })

        it('returns asc when target column is different', () => {
            expect(getNextSortDirection('name', 'asc', 'value')).toBe('asc')
        })

        it('returns asc when target column is different and current is desc', () => {
            expect(getNextSortDirection('name', 'desc', 'value')).toBe('asc')
        })
    })
})

// ═════════════════════════════════════════════════════════════════════════════
//  SECTION 7 — FILTERING
// ═════════════════════════════════════════════════════════════════════════════

describe('Table — Filtering', () => {
    describe('Filter toggle', () => {
        it('renders filter button when filtering is provided', () => {
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

        it('does not show filter panel initially', () => {
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
            expect(screen.queryByRole('search')).not.toBeInTheDocument()
        })

        it('shows filter panel after clicking toggle', async () => {
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
            expect(screen.getByRole('search')).toBeInTheDocument()
        })

        it('hides filter panel when toggled off', async () => {
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
            const btn = screen.getByRole('button', { name: 'Toggle filters' })
            await user.click(btn)
            await user.click(btn)
            expect(screen.queryByRole('search')).not.toBeInTheDocument()
        })

        it('adds active class when filter panel is open', async () => {
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
            const btn = screen.getByRole('button', { name: 'Toggle filters' })
            await user.click(btn)
            expect(btn).toHaveClass('active')
        })
    })

    describe('Text filter input', () => {
        it('renders text input with label', async () => {
            const user = userEvent.setup()
            render(
                <Table<Row>
                    ariaLabel="test"
                    data={rows}
                    columns={basicColumns}
                    filtering={{
                        inputs: [
                            {
                                key: 'name',
                                label: 'Name',
                                type: 'text',
                                placeholder: 'Enter name…',
                            },
                        ],
                        onFilter: jest.fn(),
                    }}
                />,
            )
            await user.click(screen.getByRole('button', { name: 'Toggle filters' }))
            const input = screen.getByLabelText('Name')
            expect(input).toHaveAttribute('type', 'text')
            expect(input).toHaveAttribute('placeholder', 'Enter name…')
        })

        it('calls onFilter with text value on input', async () => {
            const onFilter = jest.fn()
            const user = userEvent.setup()
            render(
                <Table<Row>
                    ariaLabel="test"
                    data={rows}
                    columns={basicColumns}
                    filtering={{
                        inputs: [{ key: 'name', label: 'Name', type: 'text' }],
                        onFilter,
                    }}
                />,
            )
            await user.click(screen.getByRole('button', { name: 'Toggle filters' }))
            await user.type(screen.getByLabelText('Name'), 'Alpha')
            // Called on each keystroke
            expect(onFilter).toHaveBeenLastCalledWith(expect.objectContaining({ name: 'Alpha' }))
        })
    })

    describe('Number filter input', () => {
        it('renders number input with min/max', async () => {
            const user = userEvent.setup()
            render(
                <Table<Row>
                    ariaLabel="test"
                    data={rows}
                    columns={basicColumns}
                    filtering={{
                        inputs: [
                            { key: 'min', label: 'Min Value', type: 'number', min: 0, max: 100 },
                        ],
                        onFilter: jest.fn(),
                    }}
                />,
            )
            await user.click(screen.getByRole('button', { name: 'Toggle filters' }))
            const input = screen.getByLabelText('Min Value')
            expect(input).toHaveAttribute('type', 'number')
            expect(input).toHaveAttribute('min', '0')
            expect(input).toHaveAttribute('max', '100')
        })

        it('calls onFilter with numeric value', async () => {
            const onFilter = jest.fn()
            const user = userEvent.setup()
            render(
                <Table<Row>
                    ariaLabel="test"
                    data={rows}
                    columns={basicColumns}
                    filtering={{
                        inputs: [{ key: 'min', label: 'Min', type: 'number' }],
                        onFilter,
                    }}
                />,
            )
            await user.click(screen.getByRole('button', { name: 'Toggle filters' }))
            await user.type(screen.getByLabelText('Min'), '42')
            expect(onFilter).toHaveBeenLastCalledWith(expect.objectContaining({ min: 42 }))
        })
    })

    describe('Search filter input', () => {
        it('renders search input', async () => {
            const user = userEvent.setup()
            render(
                <Table<Row>
                    ariaLabel="test"
                    data={rows}
                    columns={basicColumns}
                    filtering={{
                        inputs: [
                            { key: 'q', label: 'Search', type: 'search', placeholder: 'Search…' },
                        ],
                        onFilter: jest.fn(),
                    }}
                />,
            )
            await user.click(screen.getByRole('button', { name: 'Toggle filters' }))
            expect(screen.getByLabelText('Search')).toHaveAttribute('type', 'search')
        })
    })

    describe('Date filter input', () => {
        it('renders date input with min/max', async () => {
            const user = userEvent.setup()
            render(
                <Table<Row>
                    ariaLabel="test"
                    data={rows}
                    columns={basicColumns}
                    filtering={{
                        inputs: [
                            {
                                key: 'from',
                                label: 'From',
                                type: 'date',
                                min: '2020-01-01',
                                max: '2026-12-31',
                            },
                        ],
                        onFilter: jest.fn(),
                    }}
                />,
            )
            await user.click(screen.getByRole('button', { name: 'Toggle filters' }))
            const input = screen.getByLabelText('From')
            expect(input).toHaveAttribute('type', 'date')
            expect(input).toHaveAttribute('min', '2020-01-01')
            expect(input).toHaveAttribute('max', '2026-12-31')
        })
    })

    describe('Checkbox filter input', () => {
        it('renders checkbox input', async () => {
            const user = userEvent.setup()
            render(
                <Table<Row>
                    ariaLabel="test"
                    data={rows}
                    columns={basicColumns}
                    filtering={{
                        inputs: [{ key: 'active', label: 'Active only', type: 'checkbox' }],
                        onFilter: jest.fn(),
                    }}
                />,
            )
            await user.click(screen.getByRole('button', { name: 'Toggle filters' }))
            expect(screen.getByLabelText('Active only')).toHaveAttribute('type', 'checkbox')
        })

        it('calls onFilter with boolean value', async () => {
            const onFilter = jest.fn()
            const user = userEvent.setup()
            render(
                <Table<Row>
                    ariaLabel="test"
                    data={rows}
                    columns={basicColumns}
                    filtering={{
                        inputs: [{ key: 'active', label: 'Active only', type: 'checkbox' }],
                        onFilter,
                    }}
                />,
            )
            await user.click(screen.getByRole('button', { name: 'Toggle filters' }))
            await user.click(screen.getByLabelText('Active only'))
            expect(onFilter).toHaveBeenLastCalledWith(expect.objectContaining({ active: true }))
        })

        it('toggles checkbox back to false', async () => {
            const onFilter = jest.fn()
            const user = userEvent.setup()
            render(
                <Table<Row>
                    ariaLabel="test"
                    data={rows}
                    columns={basicColumns}
                    filtering={{
                        inputs: [{ key: 'active', label: 'Active only', type: 'checkbox' }],
                        onFilter,
                    }}
                />,
            )
            await user.click(screen.getByRole('button', { name: 'Toggle filters' }))
            const checkbox = screen.getByLabelText('Active only')
            await user.click(checkbox)
            await user.click(checkbox)
            expect(onFilter).toHaveBeenLastCalledWith(expect.objectContaining({ active: false }))
        })
    })

    describe('Option (select) filter input', () => {
        it('renders dropdown trigger with aria-label', async () => {
            const user = userEvent.setup()
            render(
                <Table<Row>
                    ariaLabel="test"
                    data={rows}
                    columns={basicColumns}
                    filtering={{
                        inputs: [
                            {
                                key: 'status',
                                label: 'Status',
                                type: 'option',
                                options: [
                                    { value: 'active', label: 'Active' },
                                    { value: 'inactive', label: 'Inactive' },
                                ],
                            },
                        ],
                        onFilter: jest.fn(),
                    }}
                />,
            )
            await user.click(screen.getByRole('button', { name: 'Toggle filters' }))
            expect(screen.getByRole('button', { name: 'Status' })).toBeInTheDocument()
        })

        it('shows options including "All" when dropdown is opened', async () => {
            const user = userEvent.setup()
            render(
                <Table<Row>
                    ariaLabel="test"
                    data={rows}
                    columns={basicColumns}
                    filtering={{
                        inputs: [
                            {
                                key: 'status',
                                label: 'Status',
                                type: 'option',
                                options: [
                                    { value: 'active', label: 'Active' },
                                    { value: 'inactive', label: 'Inactive' },
                                ],
                            },
                        ],
                        onFilter: jest.fn(),
                    }}
                />,
            )
            await user.click(screen.getByRole('button', { name: 'Toggle filters' }))
            await user.click(screen.getByRole('button', { name: 'Status' }))
            expect(screen.getByRole('option', { name: 'All' })).toBeInTheDocument()
            expect(screen.getByRole('option', { name: 'Active' })).toBeInTheDocument()
            expect(screen.getByRole('option', { name: 'Inactive' })).toBeInTheDocument()
        })
    })

    describe('Multiple filter inputs combined', () => {
        it('renders all filter inputs in a single panel', async () => {
            const user = userEvent.setup()
            render(
                <Table<Row>
                    ariaLabel="test"
                    data={rows}
                    columns={basicColumns}
                    filtering={{
                        inputs: [
                            { key: 'name', label: 'Name', type: 'text' },
                            { key: 'min', label: 'Min', type: 'number' },
                            { key: 'active', label: 'Active', type: 'checkbox' },
                        ],
                        onFilter: jest.fn(),
                    }}
                />,
            )
            await user.click(screen.getByRole('button', { name: 'Toggle filters' }))
            expect(screen.getByLabelText('Name')).toBeInTheDocument()
            expect(screen.getByLabelText('Min')).toBeInTheDocument()
            expect(screen.getByLabelText('Active')).toBeInTheDocument()
        })

        it('onFilter receives all current filter values', async () => {
            const onFilter = jest.fn()
            const user = userEvent.setup()
            render(
                <Table<Row>
                    ariaLabel="test"
                    data={rows}
                    columns={basicColumns}
                    filtering={{
                        inputs: [
                            { key: 'name', label: 'Name', type: 'text' },
                            { key: 'active', label: 'Active', type: 'checkbox' },
                        ],
                        onFilter,
                    }}
                />,
            )
            await user.click(screen.getByRole('button', { name: 'Toggle filters' }))
            await user.type(screen.getByLabelText('Name'), 'X')
            // The onFilter receives both keys
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            const lastCall = onFilter.mock.calls[onFilter.mock.calls.length - 1][0] as Record<
                string,
                unknown
            >
            expect(lastCall).toHaveProperty('name', 'X')
            expect(lastCall).toHaveProperty('active', false)
        })
    })

    describe('Reset button', () => {
        it('shows Reset button only when filter panel is open', async () => {
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
            expect(screen.queryByRole('button', { name: 'Reset filters' })).not.toBeInTheDocument()
            await user.click(screen.getByRole('button', { name: 'Toggle filters' }))
            expect(screen.getByRole('button', { name: 'Reset filters' })).toBeInTheDocument()
        })

        it('resets filter values when Reset is clicked', async () => {
            const onFilter = jest.fn()
            const user = userEvent.setup()
            render(
                <Table<Row>
                    ariaLabel="test"
                    data={rows}
                    columns={basicColumns}
                    filtering={{
                        inputs: [{ key: 'name', label: 'Name', type: 'text' }],
                        onFilter,
                    }}
                />,
            )
            await user.click(screen.getByRole('button', { name: 'Toggle filters' }))
            await user.type(screen.getByLabelText('Name'), 'hello')
            await user.click(screen.getByRole('button', { name: 'Reset filters' }))
            // After reset, onFilter is called with default values
            expect(onFilter).toHaveBeenLastCalledWith(expect.objectContaining({ name: '' }))
        })
    })
})

// ═════════════════════════════════════════════════════════════════════════════
//  SECTION 8 — PAGINATION
// ═════════════════════════════════════════════════════════════════════════════

describe('Table — Pagination', () => {
    describe('Basic rendering', () => {
        it('renders pagination navigation', () => {
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

        it('does not render pagination when prop is omitted', () => {
            render(<Table<Row> ariaLabel="test" data={rows} columns={basicColumns} />)
            expect(screen.queryByRole('navigation')).not.toBeInTheDocument()
        })

        it('renders page buttons for the window', () => {
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
    })

    describe('Page navigation', () => {
        it('calls onPageChange with page number when page button is clicked', async () => {
            const onPageChange = jest.fn()
            const user = userEvent.setup()
            render(
                <Table<Row>
                    ariaLabel="test"
                    data={rows}
                    columns={basicColumns}
                    pagination={{
                        page: 1,
                        totalPages: 3,
                        onPageChange,
                        onPageSizeChange: jest.fn(),
                    }}
                />,
            )
            await user.click(screen.getByRole('button', { name: 'Page 2' }))
            expect(onPageChange).toHaveBeenCalledWith(2)
        })

        it('calls onPageChange(1) when First page is clicked', async () => {
            const onPageChange = jest.fn()
            const user = userEvent.setup()
            render(
                <Table<Row>
                    ariaLabel="test"
                    data={rows}
                    columns={basicColumns}
                    pagination={{
                        page: 3,
                        totalPages: 5,
                        onPageChange,
                        onPageSizeChange: jest.fn(),
                    }}
                />,
            )
            await user.click(screen.getByRole('button', { name: 'First page' }))
            expect(onPageChange).toHaveBeenCalledWith(1)
        })

        it('calls onPageChange(page-1) when Previous page is clicked', async () => {
            const onPageChange = jest.fn()
            const user = userEvent.setup()
            render(
                <Table<Row>
                    ariaLabel="test"
                    data={rows}
                    columns={basicColumns}
                    pagination={{
                        page: 3,
                        totalPages: 5,
                        onPageChange,
                        onPageSizeChange: jest.fn(),
                    }}
                />,
            )
            await user.click(screen.getByRole('button', { name: 'Previous page' }))
            expect(onPageChange).toHaveBeenCalledWith(2)
        })

        it('calls onPageChange(page+1) when Next page is clicked', async () => {
            const onPageChange = jest.fn()
            const user = userEvent.setup()
            render(
                <Table<Row>
                    ariaLabel="test"
                    data={rows}
                    columns={basicColumns}
                    pagination={{
                        page: 3,
                        totalPages: 5,
                        onPageChange,
                        onPageSizeChange: jest.fn(),
                    }}
                />,
            )
            await user.click(screen.getByRole('button', { name: 'Next page' }))
            expect(onPageChange).toHaveBeenCalledWith(4)
        })

        it('calls onPageChange(totalPages) when Last page is clicked', async () => {
            const onPageChange = jest.fn()
            const user = userEvent.setup()
            render(
                <Table<Row>
                    ariaLabel="test"
                    data={rows}
                    columns={basicColumns}
                    pagination={{
                        page: 3,
                        totalPages: 5,
                        onPageChange,
                        onPageSizeChange: jest.fn(),
                    }}
                />,
            )
            await user.click(screen.getByRole('button', { name: 'Last page' }))
            expect(onPageChange).toHaveBeenCalledWith(5)
        })
    })

    describe('First/Last page disabled states', () => {
        it('disables First and Previous on page 1', () => {
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
            expect(screen.getByRole('button', { name: 'Next page' })).not.toBeDisabled()
            expect(screen.getByRole('button', { name: 'Last page' })).not.toBeDisabled()
        })

        it('disables Next and Last on last page', () => {
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
            expect(screen.getByRole('button', { name: 'First page' })).not.toBeDisabled()
            expect(screen.getByRole('button', { name: 'Previous page' })).not.toBeDisabled()
            expect(screen.getByRole('button', { name: 'Next page' })).toBeDisabled()
            expect(screen.getByRole('button', { name: 'Last page' })).toBeDisabled()
        })

        it('all nav buttons disabled when there is only one page', () => {
            render(
                <Table<Row>
                    ariaLabel="test"
                    data={rows}
                    columns={basicColumns}
                    pagination={{
                        page: 1,
                        totalPages: 1,
                        onPageChange: jest.fn(),
                        onPageSizeChange: jest.fn(),
                    }}
                />,
            )
            expect(screen.getByRole('button', { name: 'First page' })).toBeDisabled()
            expect(screen.getByRole('button', { name: 'Previous page' })).toBeDisabled()
            expect(screen.getByRole('button', { name: 'Next page' })).toBeDisabled()
            expect(screen.getByRole('button', { name: 'Last page' })).toBeDisabled()
        })
    })

    describe('Current page highlighting', () => {
        it('active page button has "active" class', () => {
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
            expect(screen.getByRole('button', { name: 'Page 2' })).toHaveClass('active')
        })

        it('non-active page buttons do not have "active" class', () => {
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
            expect(screen.getByRole('button', { name: 'Page 1' })).not.toHaveClass('active')
            expect(screen.getByRole('button', { name: 'Page 3' })).not.toHaveClass('active')
        })
    })

    describe('Total items info', () => {
        it('shows item range and total when totalItems is provided', () => {
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
            expect(screen.getByText('25')).toBeInTheDocument()
        })

        it('does not show item info when totalItems is not provided', () => {
            const { container } = render(
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
            const info = container.querySelector('.table-pagination__info')
            expect(info?.textContent).toBe('')
        })

        it('caps the end at totalItems on the last page', () => {
            render(
                <Table<Row>
                    ariaLabel="test"
                    data={rows}
                    columns={basicColumns}
                    pagination={{
                        page: 3,
                        totalPages: 3,
                        pageSize: 10,
                        totalItems: 25,
                        onPageChange: jest.fn(),
                        onPageSizeChange: jest.fn(),
                    }}
                />,
            )
            // Page 3 of 25 items at size 10 = items 21–25
            expect(screen.getByLabelText('Items 21 to 25')).toBeInTheDocument()
        })
    })

    describe('Pagination utilities', () => {
        it('DEFAULT_PAGE_SIZE is 10', () => {
            expect(DEFAULT_PAGE_SIZE).toBe(10)
        })

        it('DEFAULT_PAGE_SIZE_OPTIONS is [10, 25, 50, 100]', () => {
            expect(DEFAULT_PAGE_SIZE_OPTIONS).toEqual([10, 25, 50, 100])
        })

        describe('getPageWindow', () => {
            it('returns all pages when totalPages <= 3', () => {
                expect(getPageWindow(1, 1)).toEqual([1])
                expect(getPageWindow(1, 2)).toEqual([1, 2])
                expect(getPageWindow(1, 3)).toEqual([1, 2, 3])
            })

            it('returns first 3 pages when on first page', () => {
                expect(getPageWindow(1, 10)).toEqual([1, 2, 3])
            })

            it('returns last 3 pages when on last page', () => {
                expect(getPageWindow(10, 10)).toEqual([8, 9, 10])
            })

            it('returns centered window when in the middle', () => {
                expect(getPageWindow(5, 10)).toEqual([4, 5, 6])
            })

            it('returns first window when on page 2', () => {
                expect(getPageWindow(2, 10)).toEqual([1, 2, 3])
            })

            it('returns last window when on second-to-last page', () => {
                expect(getPageWindow(9, 10)).toEqual([8, 9, 10])
            })
        })

        describe('isFirstPage', () => {
            it('returns true for page 1', () => {
                expect(isFirstPage(1)).toBe(true)
            })

            it('returns true for page 0', () => {
                expect(isFirstPage(0)).toBe(true)
            })

            it('returns false for page 2', () => {
                expect(isFirstPage(2)).toBe(false)
            })
        })

        describe('isLastPage', () => {
            it('returns true when page equals totalPages', () => {
                expect(isLastPage(5, 5)).toBe(true)
            })

            it('returns true when page exceeds totalPages', () => {
                expect(isLastPage(6, 5)).toBe(true)
            })

            it('returns false when page is less than totalPages', () => {
                expect(isLastPage(3, 5)).toBe(false)
            })
        })
    })
})

// ═════════════════════════════════════════════════════════════════════════════
//  SECTION 9 — DOWNLOAD
// ═════════════════════════════════════════════════════════════════════════════

describe('Table — Download', () => {
    describe('Single download', () => {
        it('renders download button', () => {
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

        it('calls onDownload with current data', async () => {
            const onDownload = jest.fn()
            const user = userEvent.setup()
            render(
                <Table<Row>
                    ariaLabel="test"
                    data={rows}
                    columns={basicColumns}
                    download={{ onDownload }}
                />,
            )
            await user.click(screen.getByRole('button', { name: 'Download' }))
            expect(onDownload).toHaveBeenCalledWith(rows)
        })

        it('renders label text when label is provided', () => {
            render(
                <Table<Row>
                    ariaLabel="test"
                    data={rows}
                    columns={basicColumns}
                    download={{ label: 'Export CSV', onDownload: jest.fn() }}
                />,
            )
            expect(screen.getByText('Export CSV')).toBeInTheDocument()
        })

        it('does not render label text when label is omitted', () => {
            const { container } = render(
                <Table<Row>
                    ariaLabel="test"
                    data={rows}
                    columns={basicColumns}
                    download={{ onDownload: jest.fn() }}
                />,
            )
            expect(container.querySelector('.download-label')).not.toBeInTheDocument()
        })
    })

    describe('Multi-format download', () => {
        it('renders dropdown trigger', () => {
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

        it('shows options when dropdown is opened', async () => {
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
            await user.click(screen.getByRole('button', { name: 'Download' }))
            expect(screen.getByRole('option', { name: 'CSV' })).toBeInTheDocument()
            expect(screen.getByRole('option', { name: 'PDF' })).toBeInTheDocument()
        })

        it('calls onDownload with selected format and data', async () => {
            const onDownload = jest.fn()
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
                        onDownload,
                    }}
                />,
            )
            await user.click(screen.getByRole('button', { name: 'Download' }))
            await user.click(screen.getByRole('option', { name: 'CSV' }))
            expect(onDownload).toHaveBeenCalledWith('csv', rows)
        })
    })

    describe('Download without title', () => {
        it('renders download button even without a title', () => {
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
    })
})

// ═════════════════════════════════════════════════════════════════════════════
//  SECTION 10 — RESPONSIVE / BREAKPOINTS
// ═════════════════════════════════════════════════════════════════════════════

describe('Table — Responsive / Breakpoints', () => {
    describe('Expand button', () => {
        it('renders expand buttons when columns have breakpoints', () => {
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
            expect(screen.getAllByRole('button', { name: 'Expand row' })).toHaveLength(rows.length)
        })

        it('does not render expand buttons when no columns have breakpoints', () => {
            render(<Table<Row> ariaLabel="test" data={rows} columns={basicColumns} />)
            expect(screen.queryByRole('button', { name: 'Expand row' })).not.toBeInTheDocument()
        })
    })

    describe('Row expansion', () => {
        it('shows expanded row details after clicking expand', async () => {
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

        it('expanded row shows hidden column headers and values', async () => {
            const user = userEvent.setup()
            render(
                <Table<Row>
                    ariaLabel="test"
                    data={[{ name: 'Alpha', value: '10', status: 'active', note: '' }]}
                    columns={[
                        { header: 'Name', accessor: 'name' },
                        { header: 'Status', accessor: 'status', breakpoint: 'xxl' },
                    ]}
                />,
            )
            await user.click(screen.getByRole('button', { name: 'Expand row' }))
            const expandedRow = screen.getByRole('row', {
                name: 'Expanded details for row 1',
            })
            expect(within(expandedRow).getByText('Status')).toBeInTheDocument()
        })

        it('hides expanded row after clicking collapse', async () => {
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
            expect(
                screen.queryByRole('row', { name: 'Expanded details for row 1' }),
            ).not.toBeInTheDocument()
        })

        it('multiple rows can be expanded simultaneously', async () => {
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
            const btns = screen.getAllByRole('button', { name: 'Expand row' })
            await user.click(btns[0])
            await user.click(btns[1])
            expect(
                screen.getByRole('row', { name: 'Expanded details for row 1' }),
            ).toBeInTheDocument()
            expect(
                screen.getByRole('row', { name: 'Expanded details for row 2' }),
            ).toBeInTheDocument()
        })
    })

    describe('Breakpoint class on cells', () => {
        it('adds breakpoint class to cells', () => {
            const { container } = render(
                <Table<Row>
                    ariaLabel="test"
                    data={rows.slice(0, 1)}
                    columns={[
                        { header: 'Name', accessor: 'name' },
                        { header: 'Status', accessor: 'status', breakpoint: 'lg' },
                    ]}
                />,
            )
            const cells = container.querySelectorAll('tbody td')
            // lg (992) is not hidden at 1024px, so no expand col — cells[0]=Name, cells[1]=Status
            const statusCell = cells[1]
            expect(statusCell).toHaveClass('lg')
        })

        it('adds breakpoint class to header', () => {
            render(
                <Table<Row>
                    ariaLabel="test"
                    data={rows.slice(0, 1)}
                    columns={[
                        { header: 'Name', accessor: 'name' },
                        { header: 'Status', accessor: 'status', breakpoint: 'lg' },
                    ]}
                />,
            )
            const statusHeader = screen
                .getAllByRole('columnheader')
                .find((th) => th.textContent === 'Status')
            expect(statusHeader).toHaveClass('lg')
        })
    })
})

// ═════════════════════════════════════════════════════════════════════════════
//  SECTION 11 — UTILITY FUNCTIONS
// ═════════════════════════════════════════════════════════════════════════════

describe('Table — Utility Functions', () => {
    describe('getTotalCols', () => {
        it('returns column count with no extras', () => {
            expect(getTotalCols(3, false, false, false)).toBe(3)
        })

        it('adds 1 for breakpoints', () => {
            expect(getTotalCols(3, true, false, false)).toBe(4)
        })

        it('adds 1 for actions', () => {
            expect(getTotalCols(3, false, true, false)).toBe(4)
        })

        it('adds 1 for selection', () => {
            expect(getTotalCols(3, false, false, true)).toBe(4)
        })

        it('adds all extras', () => {
            expect(getTotalCols(3, true, true, true)).toBe(6)
        })

        it('handles zero columns', () => {
            expect(getTotalCols(0, false, false, false)).toBe(0)
        })
    })
})

// ═════════════════════════════════════════════════════════════════════════════
//  SECTION 12 — COMBINED FEATURES (Integration)
// ═════════════════════════════════════════════════════════════════════════════

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
        render(
            <Table<FullRow>
                id="full-table"
                title="Combined Table"
                description="All features at once"
                onInfo={jest.fn()}
                legend={<span>Legend</span>}
                ariaLabel="Full feature table"
                rowAriaLabel="User row"
                data={fullData}
                columns={fullColumns}
                rowVariant={({ row }) => (row.status === 'inactive' ? 'disabled' : undefined)}
                selection={{
                    getRowId: (r) => r.id,
                    selectedRowIds: [],
                    onChange: jest.fn(),
                    isRowSelectable: ({ row }) => row.status !== 'inactive',
                }}
                actions={[
                    { id: 'edit', label: 'Edit', variant: 'primary', onClick: jest.fn() },
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
                ]}
                sorting={{
                    column: 'name',
                    direction: 'asc',
                    onSortChange: jest.fn(),
                }}
                filtering={{
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
                    onFilter: jest.fn(),
                }}
                download={{
                    options: [
                        { value: 'csv', label: 'CSV' },
                        { value: 'pdf', label: 'PDF' },
                    ],
                    onDownload: jest.fn(),
                }}
                pagination={{
                    page: 1,
                    totalPages: 2,
                    pageSize: 3,
                    pageSizeOptions: [3, 5, 10],
                    totalItems: 5,
                    onPageChange: jest.fn(),
                    onPageSizeChange: jest.fn(),
                }}
            />,
        )
        // Region & title
        expect(screen.getByRole('region', { name: 'Combined Table' })).toBeInTheDocument()
        expect(screen.getByRole('heading', { name: 'Combined Table' })).toBeInTheDocument()
        expect(screen.getByText('All features at once')).toBeInTheDocument()
        expect(screen.getByText('Legend')).toBeInTheDocument()
        expect(screen.getByRole('button', { name: 'More information' })).toBeInTheDocument()
        // Table data
        expect(screen.getByText('Alice')).toBeInTheDocument()
        expect(screen.getByText('Bob')).toBeInTheDocument()
        // Selection checkboxes
        expect(screen.getByRole('checkbox', { name: 'Select all rows' })).toBeInTheDocument()
        // Sorting
        expect(screen.getByRole('button', { name: 'Sort by Name' })).toBeInTheDocument()
        // Actions
        expect(screen.getAllByRole('button', { name: 'Row actions' })).toHaveLength(fullData.length)
        // Filtering
        expect(screen.getByRole('button', { name: 'Toggle filters' })).toBeInTheDocument()
        // Download
        expect(screen.getByRole('button', { name: 'Download' })).toBeInTheDocument()
        // Pagination
        expect(screen.getByRole('navigation', { name: 'Table pagination' })).toBeInTheDocument()
        // Expand (breakpoints exist)
        expect(screen.getAllByRole('button', { name: 'Expand row' })).toHaveLength(fullData.length)
    })

    it('selection works alongside actions — selecting rows does not affect action menus', async () => {
        const onChange = jest.fn()
        const onEdit = jest.fn()
        const user = userEvent.setup()

        render(
            <Table<FullRow>
                ariaLabel="test"
                data={fullData.slice(0, 2)}
                columns={[
                    { header: 'Name', accessor: 'name' },
                    { header: 'Status', accessor: 'status' },
                ]}
                selection={{
                    getRowId: (r) => r.id,
                    selectedRowIds: [],
                    onChange,
                }}
                actions={[{ id: 'edit', label: 'Edit', onClick: onEdit }]}
            />,
        )
        // Select first row
        await user.click(screen.getByRole('checkbox', { name: 'Select row 1' }))
        expect(onChange).toHaveBeenCalledWith(['1'])

        // Open action menu on second row
        const actionBtns = screen.getAllByRole('button', { name: 'Row actions' })
        await user.click(actionBtns[1])
        await user.click(screen.getByRole('menuitem', { name: 'Edit' }))
        expect(onEdit).toHaveBeenCalledWith(expect.objectContaining({ row: fullData[1] }))
    })

    it('sorting and selection preserve selected state', () => {
        render(
            <Table<FullRow>
                ariaLabel="test"
                data={fullData}
                columns={[
                    { header: 'Name', accessor: 'name', isSortable: true },
                    { header: 'Status', accessor: 'status' },
                ]}
                selection={{
                    getRowId: (r) => r.id,
                    selectedRowIds: ['1', '3'],
                    onChange: jest.fn(),
                }}
                sorting={{
                    column: 'name',
                    direction: 'asc',
                    onSortChange: jest.fn(),
                }}
            />,
        )
        // Alice (id=1) and Charlie (id=3) should be selected
        expect(screen.getByRole('checkbox', { name: 'Select row 1' })).toBeChecked()
        expect(screen.getByRole('checkbox', { name: 'Select row 3' })).toBeChecked()
        expect(screen.getByRole('checkbox', { name: 'Select row 2' })).not.toBeChecked()
    })

    it('filter action hides actions only for matching rows in combined table', async () => {
        const user = userEvent.setup()
        render(
            <Table<FullRow>
                ariaLabel="test"
                data={fullData.slice(0, 2)}
                columns={[
                    { header: 'Name', accessor: 'name' },
                    { header: 'Status', accessor: 'status' },
                ]}
                actions={[
                    {
                        id: 'activate',
                        label: 'Activate',
                        filter: ({ row }) => row.status !== 'active',
                    },
                    { id: 'edit', label: 'Edit', onClick: jest.fn() },
                ]}
            />,
        )
        // Alice is active — Activate should be filtered out
        const btns = screen.getAllByRole('button', { name: 'Row actions' })
        await user.click(btns[0])
        expect(screen.queryByRole('menuitem', { name: 'Activate' })).not.toBeInTheDocument()
        expect(screen.getByRole('menuitem', { name: 'Edit' })).toBeInTheDocument()
    })

    it('isActionDisabled disables entire menu when column condition is met', () => {
        render(
            <Table<FullRow>
                ariaLabel="test"
                data={[fullData[2]]} // Charlie, inactive
                columns={[
                    {
                        header: 'Note',
                        accessor: 'note',
                        isActionDisabled: ({ row }) => row.status === 'inactive',
                    },
                ]}
                actions={[{ id: 'edit', label: 'Edit' }]}
            />,
        )
        expect(screen.getByRole('button', { name: 'Row actions' })).toBeDisabled()
    })

    it('expanded row shows hidden column with defaultValue when value is empty', async () => {
        const user = userEvent.setup()
        render(
            <Table<FullRow>
                ariaLabel="test"
                data={[fullData[1]]} // Bob, note is empty
                columns={[
                    { header: 'Name', accessor: 'name' },
                    {
                        header: 'Note',
                        accessor: 'note',
                        defaultValue: 'N/A',
                        breakpoint: 'xxl',
                    },
                ]}
            />,
        )
        await user.click(screen.getByRole('button', { name: 'Expand row' }))
        const expandedRow = screen.getByRole('row', { name: 'Expanded details for row 1' })
        expect(within(expandedRow).getByText('N/A')).toBeInTheDocument()
    })

    it('selection with isRowSelectable and actions work together', async () => {
        const onChange = jest.fn()
        const user = userEvent.setup()
        render(
            <Table<FullRow>
                ariaLabel="test"
                data={fullData}
                columns={[
                    { header: 'Name', accessor: 'name' },
                    { header: 'Status', accessor: 'status' },
                ]}
                selection={{
                    getRowId: (r) => r.id,
                    selectedRowIds: [],
                    onChange,
                    isRowSelectable: ({ row }) => row.status !== 'inactive',
                }}
                actions={[{ id: 'edit', label: 'Edit', onClick: jest.fn() }]}
            />,
        )
        // Charlie (row 3) is inactive — checkbox should be disabled
        expect(screen.getByRole('checkbox', { name: 'Select row 3' })).toBeDisabled()
        // But action menu should still be accessible
        const actionBtns = screen.getAllByRole('button', { name: 'Row actions' })
        await user.click(actionBtns[2])
        expect(screen.getByRole('menuitem', { name: 'Edit' })).toBeInTheDocument()
    })

    it('row variant + column variant + cell variant: column function variant wins', () => {
        const { container } = render(
            <Table<FullRow>
                ariaLabel="test"
                data={[fullData[0]]}
                columns={[
                    {
                        header: 'Status',
                        accessor: 'status',
                        variant: () => 'secondary',
                    },
                    { header: 'Name', accessor: 'name' },
                ]}
                rowVariant={() => 'danger'}
            />,
        )
        const cells = container.querySelectorAll('tbody td')
        // Status cell — function variant wins
        expect(cells[0]).toHaveClass('variant-secondary')
        // Name cell — no column variant, rowVariant fallback
        expect(cells[1]).toHaveClass('variant-danger')
    })

    it('download receives correct data even when pagination is used', async () => {
        const onDownload = jest.fn()
        const user = userEvent.setup()
        const pageData = fullData.slice(0, 3)
        render(
            <Table<FullRow>
                ariaLabel="test"
                data={pageData}
                columns={[
                    { header: 'Name', accessor: 'name' },
                    { header: 'Status', accessor: 'status' },
                ]}
                download={{ onDownload, label: 'Export' }}
                pagination={{
                    page: 1,
                    totalPages: 2,
                    pageSize: 3,
                    totalItems: 5,
                    onPageChange: jest.fn(),
                    onPageSizeChange: jest.fn(),
                }}
            />,
        )
        await user.click(screen.getByRole('button', { name: 'Export' }))
        expect(onDownload).toHaveBeenCalledWith(pageData)
    })

    it('combined: sorting headers + selection header + expand + action column all render correctly', () => {
        render(
            <Table<FullRow>
                ariaLabel="test"
                data={fullData.slice(0, 2)}
                columns={[
                    { header: 'Name', accessor: 'name', isSortable: true },
                    { header: 'Email', accessor: 'email', breakpoint: 'xxl' },
                    { header: 'Status', accessor: 'status' },
                ]}
                selection={{
                    getRowId: (r) => r.id,
                    selectedRowIds: [],
                    onChange: jest.fn(),
                }}
                actions={[{ id: 'edit', label: 'Edit' }]}
                sorting={{
                    column: 'name',
                    direction: 'asc',
                    onSortChange: jest.fn(),
                }}
            />,
        )
        const headers = screen.getAllByRole('columnheader')
        // Expand + Select + Name (sortable) + Email + Status + Actions = 6
        expect(headers).toHaveLength(6)
        expect(headers[0]).toHaveAttribute('aria-label', 'Expand')
        expect(headers[headers.length - 1]).toHaveAttribute('aria-label', 'Actions')
    })

    it('filter panel + pagination + sorting all visible simultaneously', async () => {
        const user = userEvent.setup()
        render(
            <Table<FullRow>
                ariaLabel="test"
                data={fullData}
                columns={[
                    { header: 'Name', accessor: 'name', isSortable: true },
                    { header: 'Status', accessor: 'status' },
                ]}
                sorting={{
                    column: 'name',
                    direction: 'asc',
                    onSortChange: jest.fn(),
                }}
                filtering={{
                    inputs: [{ key: 'name', label: 'Name Filter', type: 'text' }],
                    onFilter: jest.fn(),
                }}
                pagination={{
                    page: 1,
                    totalPages: 2,
                    onPageChange: jest.fn(),
                    onPageSizeChange: jest.fn(),
                }}
            />,
        )
        // Open filters
        await user.click(screen.getByRole('button', { name: 'Toggle filters' }))

        // All three features visible
        expect(screen.getByRole('search', { name: 'Table filters' })).toBeInTheDocument()
        expect(screen.getByRole('button', { name: 'Sort by Name' })).toBeInTheDocument()
        expect(screen.getByRole('navigation', { name: 'Table pagination' })).toBeInTheDocument()
    })

    it('empty data with all features shows empty state and still renders header/pagination', () => {
        render(
            <Table<FullRow>
                title="Empty Combined"
                ariaLabel="test"
                data={[]}
                columns={fullColumns}
                selection={{
                    getRowId: (r) => r.id,
                    selectedRowIds: [],
                    onChange: jest.fn(),
                }}
                actions={[{ id: 'edit', label: 'Edit' }]}
                sorting={{
                    column: 'name',
                    direction: 'asc',
                    onSortChange: jest.fn(),
                }}
                filtering={{
                    inputs: [{ key: 'name', label: 'Name', type: 'text' }],
                    onFilter: jest.fn(),
                }}
                download={{ onDownload: jest.fn() }}
                pagination={{
                    page: 1,
                    totalPages: 0,
                    onPageChange: jest.fn(),
                    onPageSizeChange: jest.fn(),
                }}
            />,
        )
        expect(screen.getByText('No data')).toBeInTheDocument()
        expect(screen.getByRole('heading', { name: 'Empty Combined' })).toBeInTheDocument()
        expect(screen.getByRole('navigation')).toBeInTheDocument()
    })
})
