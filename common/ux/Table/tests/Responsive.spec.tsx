import { Accessor, Test } from '@common/ux/Test'
import { within } from '@testing-library/react'
import { Row } from './Table.spec.types'
import { basicColumns, rows } from './Table.mocks'

describe('Table — Responsive / Breakpoints', () => {
    const table = () => Test.Table('test')

    describe('Expand button', () => {
        it('renders expand buttons when columns have breakpoints', () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: [
                    { header: 'Name', accessor: 'name' },
                    { header: 'Status', accessor: 'status', breakpoint: '2xl' },
                ],
            })
            expect(table().Get.expandButtons()).toHaveLength(rows.length)
        })

        it('does not render expand buttons when no columns have breakpoints', () => {
            Test.Table.Set.mock<Row>({ ariaLabel: 'test', data: rows, columns: basicColumns })
            expect(table().Has.expandButton()).toBe(false)
        })
    })

    describe('Row expansion', () => {
        it('shows expanded row details after clicking expand', async () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: [
                    { header: 'Name', accessor: 'name' },
                    { header: 'Status', accessor: 'status', breakpoint: '2xl' },
                ],
            })
            await table().Do.expandRow(0)
            expect(table().Get.expandedRow(1)).toBeInTheDocument()
        })

        it('expanded row shows hidden column headers and values', async () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: [{ name: 'Alpha', value: '10', status: 'active', note: '' }],
                columns: [
                    { header: 'Name', accessor: 'name' },
                    { header: 'Status', accessor: 'status', breakpoint: '2xl' },
                ],
            })
            await table().Do.expandRow(0)
            const expandedRow = table().Get.expandedRow(1)
            expect(within(expandedRow).getByText('Status')).toBeInTheDocument()
        })

        it('hides expanded row after clicking collapse', async () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: [
                    { header: 'Name', accessor: 'name' },
                    { header: 'Status', accessor: 'status', breakpoint: '2xl' },
                ],
            })
            await table().Do.expandRow(0)
            await Accessor.user.click(Accessor.screen.getByRole('button', { name: 'Collapse row' }))
            expect(table().Has.expandedRow(1)).toBe(false)
        })

        it('multiple rows can be expanded simultaneously', async () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: [
                    { header: 'Name', accessor: 'name' },
                    { header: 'Status', accessor: 'status', breakpoint: '2xl' },
                ],
            })
            await table().Do.expandRow(0)
            await table().Do.expandRow(0)
            expect(table().Get.expandedRow(1)).toBeInTheDocument()
            expect(table().Get.expandedRow(2)).toBeInTheDocument()
        })
    })

    describe('Breakpoint class on cells', () => {
        it('adds breakpoint class to cells', () => {
            const { container } = Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows.slice(0, 1),
                columns: [
                    { header: 'Name', accessor: 'name' },
                    { header: 'Status', accessor: 'status', breakpoint: 'lg' },
                ],
            })
            const cells = container.querySelectorAll('tbody td')
            // lg (992) is not hidden at 1024px, so no expand col — cells[0]=Name, cells[1]=Status
            const statusCell = cells[1]
            expect(statusCell).toHaveClass('lg')
        })

        it('adds breakpoint class to header', () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows.slice(0, 1),
                columns: [
                    { header: 'Name', accessor: 'name' },
                    { header: 'Status', accessor: 'status', breakpoint: 'lg' },
                ],
            })
            const statusHeader = table()
                .Get.columnHeaders()
                .find((th) => th.textContent === 'Status')
            expect(statusHeader).toHaveClass('lg')
        })
    })
})
