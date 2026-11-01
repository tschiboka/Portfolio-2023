import { within } from '@testing-library/react'
import { Accessor, Test } from '@common-ux/Test'
import { Row } from './Table.spec.types'
import { TableMocks } from './Table.mocks'

const { rows, basicColumns } = TableMocks

describe('Table — Responsive / Breakpoints', () => {
    describe('Expand button', () => {
        it('should render expand buttons when columns have breakpoints', () => {
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

        it('should not render expand buttons when no columns have breakpoints', () => {
            Test.Table.Set.mock<Row>({ ariaLabel: 'test', data: rows, columns: basicColumns })
            expect(Test.Table('test').Has.expandButton()).toBe(false)
        })
    })

    describe('Row expansion', () => {
        it('should show expanded row details after clicking expand', async () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: [
                    { header: 'Name', accessor: 'name' },
                    { header: 'Status', accessor: 'status', breakpoint: '2xl' },
                ],
            })
            await Test.Table('test').Do.expandRow(0)
            expect(Test.Table('test').Get.expandedRow(1)).toBeInTheDocument()
        })

        it('should show the hidden column headers and values in the expanded row', async () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: [{ name: 'Alpha', value: '10', status: 'active', note: '' }],
                columns: [
                    { header: 'Name', accessor: 'name' },
                    { header: 'Status', accessor: 'status', breakpoint: '2xl' },
                ],
            })
            await Test.Table('test').Do.expandRow(0)
            const expandedRow = Test.Table('test').Get.expandedRow(1)
            expect(within(expandedRow).getByText('Status')).toBeInTheDocument()
        })

        it('should hide expanded row after clicking collapse', async () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: [
                    { header: 'Name', accessor: 'name' },
                    { header: 'Status', accessor: 'status', breakpoint: '2xl' },
                ],
            })
            await Test.Table('test').Do.expandRow(0)
            await Accessor.user.click(Accessor.screen.getByRole('button', { name: 'Collapse row' }))
            expect(Test.Table('test').Has.expandedRow(1)).toBe(false)
        })

        it('should expand multiple rows simultaneously', async () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: [
                    { header: 'Name', accessor: 'name' },
                    { header: 'Status', accessor: 'status', breakpoint: '2xl' },
                ],
            })
            await Test.Table('test').Do.expandRow(0)
            await Test.Table('test').Do.expandRow(0)
            expect(Test.Table('test').Get.expandedRow(1)).toBeInTheDocument()
            expect(Test.Table('test').Get.expandedRow(2)).toBeInTheDocument()
        })
    })

    describe('Breakpoint class on cells', () => {
        it('should add breakpoint class to cells', () => {
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

        it('should add breakpoint class to header', () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows.slice(0, 1),
                columns: [
                    { header: 'Name', accessor: 'name' },
                    { header: 'Status', accessor: 'status', breakpoint: 'lg' },
                ],
            })
            const statusHeader = Test.Table('test')
                .Get.columnHeaders()
                .find((th) => th.textContent === 'Status')
            expect(statusHeader).toHaveClass('lg')
        })
    })
})
