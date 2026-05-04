import { Test } from '@common/ux/Test'
import { screen } from '@testing-library/react'
import { Row } from './Table.spec.types'
import { basicColumns, rows } from './Table.mocks'

// ═════════════════════════════════════════════════════════════════════════════
//  FUNDAMENTALS
// ═════════════════════════════════════════════════════════════════════════════

describe('Table — Fundamentals', () => {
    describe('Title', () => {
        it('renders a heading when title is provided', () => {
            Test.Table.Set.mock<Row>({
                title: 'Users',
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
            })
            expect(Test.Table.Get.heading('Users')).toBeInTheDocument()
        })

        it('does not render a heading when title is omitted', () => {
            Test.Table.Set.mock<Row>({ ariaLabel: 'test', data: rows, columns: basicColumns })
            expect(Test.Table.Query.heading()).not.toBeInTheDocument()
        })

        it('does not render header section when no title, description, onInfo, filtering, or download', () => {
            const { container } = Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
            })
            expect(container.querySelector('.table-header')).not.toBeInTheDocument()
        })
    })

    describe('Description', () => {
        it('renders description text', () => {
            Test.Table.Set.mock<Row>({
                title: 'T',
                description: 'Detailed info',
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
            })
            expect(screen.getByText('Detailed info')).toBeInTheDocument()
        })

        it('renders description as ReactNode', () => {
            Test.Table.Set.mock<Row>({
                title: 'T',
                description: <strong>Bold description</strong>,
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
            })
            expect(screen.getByText('Bold description').tagName).toBe('STRONG')
        })

        it('does not render description when omitted', () => {
            const { container } = Test.Table.Set.mock<Row>({
                title: 'T',
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
            })
            expect(container.querySelector('.table-description')).not.toBeInTheDocument()
        })
    })

    describe('Info button', () => {
        it('renders info button when onInfo is provided', () => {
            Test.Table.Set.mock<Row>({
                title: 'T',
                onInfo: vi.fn(),
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
            })
            expect(Test.Table.Get.infoButton()).toBeInTheDocument()
        })

        it('calls onInfo when clicked', async () => {
            const onInfo = vi.fn()
            Test.Table.Set.mock<Row>({
                title: 'T',
                onInfo: onInfo,
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
            })
            await Test.Table.Click.infoButton()
            expect(onInfo).toHaveBeenCalledTimes(1)
        })
    })

    describe('Legend', () => {
        it('renders legend content below the header', () => {
            Test.Table.Set.mock<Row>({
                title: 'T',
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                legend: <span data-testid="legend">Legend here</span>,
            })
            expect(screen.getByTestId('legend')).toBeInTheDocument()
        })

        it('does not render legend wrapper when omitted', () => {
            const { container } = Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
            })
            expect(container.querySelector('.table-legend')).not.toBeInTheDocument()
        })
    })

    describe('Empty state', () => {
        it('shows "No data" by default when data is empty', () => {
            Test.Table.Set.mock<Row>({ ariaLabel: 'test', data: [], columns: basicColumns })
            expect(screen.getByText('No data')).toBeInTheDocument()
        })

        it('shows custom emptyState content', () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: [],
                columns: basicColumns,
                emptyState: 'Nothing found',
            })
            expect(screen.getByText('Nothing found')).toBeInTheDocument()
        })

        it('shows custom emptyState as ReactNode', () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: [],
                columns: basicColumns,
                emptyState: <em>Try adjusting filters</em>,
            })
            expect(screen.getByText('Try adjusting filters')).toBeInTheDocument()
        })

        it('empty state cell spans all columns', () => {
            Test.Table.Set.mock<Row>({ ariaLabel: 'test', data: [], columns: basicColumns })
            expect(Test.Table.Get.emptyState()).toHaveAttribute(
                'colspan',
                String(basicColumns.length),
            )
        })

        it('empty state cell spans all columns including actions column', () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: [],
                columns: basicColumns,
                actions: [{ id: 'x', label: 'X' }],
            })
            expect(Test.Table.Get.emptyState()).toHaveAttribute(
                'colspan',
                String(basicColumns.length + 1),
            )
        })

        it('empty state cell spans all columns including selection column', () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: [],
                columns: basicColumns,
                selection: {
                    getRowId: (r) => r.name,
                    selectedRowIds: [],
                    onChange: vi.fn(),
                },
            })
            expect(Test.Table.Get.emptyState()).toHaveAttribute(
                'colspan',
                String(basicColumns.length + 1),
            )
        })

        it('does not show empty state when data has rows', () => {
            Test.Table.Set.mock<Row>({ ariaLabel: 'test', data: rows, columns: basicColumns })
            expect(screen.queryByText('No data')).not.toBeInTheDocument()
        })
    })

    describe('Basic data rendering', () => {
        it('renders correct number of body rows', () => {
            Test.Table.Set.mock<Row>({ ariaLabel: 'test', data: rows, columns: basicColumns })
            // 1 header row + N body rows
            const allRows = screen.getAllByRole('row')
            expect(allRows).toHaveLength(rows.length + 1)
        })

        it('renders column headers', () => {
            Test.Table.Set.mock<Row>({ ariaLabel: 'test', data: rows, columns: basicColumns })
            expect(screen.getByText('Name')).toBeInTheDocument()
            expect(screen.getByText('Value')).toBeInTheDocument()
            expect(screen.getByText('Status')).toBeInTheDocument()
        })

        it('renders cell values from data', () => {
            Test.Table.Set.mock<Row>({ ariaLabel: 'test', data: rows, columns: basicColumns })
            expect(screen.getByText('Alpha')).toBeInTheDocument()
            expect(screen.getByText('10')).toBeInTheDocument()
            expect(screen.getAllByText('active').length).toBeGreaterThanOrEqual(1)
        })

        it('renders all data rows', () => {
            Test.Table.Set.mock<Row>({ ariaLabel: 'test', data: rows, columns: basicColumns })
            rows.forEach((row) => {
                expect(screen.getByText(row.name)).toBeInTheDocument()
            })
        })
    })
})
