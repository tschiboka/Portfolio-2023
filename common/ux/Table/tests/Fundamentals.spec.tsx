import { Test } from '@common/ux/Test'
import { Accessor } from '@common/ux/Test/Accessor/Accessor'
import { screen } from '@testing-library/react'
import { Row } from './Table.spec.types'
import { basicColumns, rows } from './Table.mocks'
import { Table } from '..'

// ═════════════════════════════════════════════════════════════════════════════
//  FUNDAMENTALS
// ═════════════════════════════════════════════════════════════════════════════

describe('Table — Fundamentals', () => {
    describe('Title', () => {
        it('renders a heading when title is provided', () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                title: 'Users',
            })
            expect(Test.Table('Users').Get.heading('Users')).toBeInTheDocument()
        })

        it('does not render a heading when title is omitted', () => {
            Test.Table.Set.mock<Row>({ ariaLabel: 'test', data: rows, columns: basicColumns })
            expect(screen.queryByRole('heading')).not.toBeInTheDocument()
        })

        it('does not render header section when no title, description, infoText, filtering, or download', () => {
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
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                title: 'T',
                children: <Table.Header>Detailed info</Table.Header>,
            })
            expect(screen.getByText('Detailed info')).toBeInTheDocument()
        })

        it('renders description as ReactNode', () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                title: 'T',
                children: (
                    <Table.Header>
                        <strong>Bold description</strong>
                    </Table.Header>
                ),
            })
            expect(screen.getByText('Bold description').tagName).toBe('STRONG')
        })

        it('does not render description when omitted', () => {
            const { container } = Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                title: 'T',
            })
            expect(container.querySelector('.table-description')).not.toBeInTheDocument()
        })
    })

    describe('Info button', () => {
        it('renders info button when infoText is provided', () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                title: 'T',
                children: <Table.Info text="Some info" />,
            })
            expect(Test.Table('T').Get.infoButton()).toBeInTheDocument()
        })

        it('opens a modal with info text when clicked', async () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                title: 'T',
                children: <Table.Info text="Detailed information about this table" />,
            })
            await Test.Table('T').Do.clickInfoButton()
            expect(screen.getByText('Detailed information about this table')).toBeInTheDocument()
        })

        it('modal closes when close button is clicked', async () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                title: 'T',
                children: <Table.Info text="Dismiss me" />,
            })
            await Test.Table('T').Do.clickInfoButton()
            expect(screen.getByText('Dismiss me')).toBeInTheDocument()
            await Accessor.user.click(screen.getByRole('button', { name: 'Close' }))
            expect(screen.queryByText('Dismiss me')).not.toBeInTheDocument()
        })

        it('does not render info button when infoText is omitted', () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                title: 'T',
            })
            expect(
                Accessor.screen.queryByRole('button', { name: 'More information' }),
            ).not.toBeInTheDocument()
        })
    })

    describe('Legend', () => {
        it('renders legend content below the header', () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                children: (
                    <>
                        <Table.Legend>
                            <span data-testid="legend">Legend here</span>
                        </Table.Legend>
                    </>
                ),
                title: 'T',
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
            expect(Test.Table('test').Get.emptyState()).toHaveAttribute(
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
            expect(Test.Table('test').Get.emptyState()).toHaveAttribute(
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
            expect(Test.Table('test').Get.emptyState()).toHaveAttribute(
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
