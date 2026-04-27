import { Test } from '@common/ux'
import { screen, within } from '@testing-library/react'
import { Row } from './Table.spec.types'
import { basicColumns, rows } from './Table.mocks'

describe('Table — Responsive / Breakpoints', () => {
    describe('Expand button', () => {
        it('renders expand buttons when columns have breakpoints', () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: [
                    { header: 'Name', accessor: 'name' },
                    { header: 'Status', accessor: 'status', breakpoint: 'xxl' },
                ],
            })
            expect(Test.Table.Get.expandButtons()).toHaveLength(rows.length)
        })

        it('does not render expand buttons when no columns have breakpoints', () => {
            Test.Table.Set.mock<Row>({ ariaLabel: 'test', data: rows, columns: basicColumns })
            expect(Test.Table.Query.expandButton()).not.toBeInTheDocument()
        })
    })

    describe('Row expansion', () => {
        it('shows expanded row details after clicking expand', async () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: [
                    { header: 'Name', accessor: 'name' },
                    { header: 'Status', accessor: 'status', breakpoint: 'xxl' },
                ],
            })
            await Test.Table.Click.expandButton(0)
            expect(Test.Table.Get.expandedRow(1)).toBeInTheDocument()
        })

        it('expanded row shows hidden column headers and values', async () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: [{ name: 'Alpha', value: '10', status: 'active', note: '' }],
                columns: [
                    { header: 'Name', accessor: 'name' },
                    { header: 'Status', accessor: 'status', breakpoint: 'xxl' },
                ],
            })
            await Test.Table.Click.expandButton(0)
            const expandedRow = Test.Table.Get.expandedRow(1)
            expect(within(expandedRow).getByText('Status')).toBeInTheDocument()
        })

        it('hides expanded row after clicking collapse', async () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: [
                    { header: 'Name', accessor: 'name' },
                    { header: 'Status', accessor: 'status', breakpoint: 'xxl' },
                ],
            })
            const user = await Test.Table.Click.expandButton(0)
            await user.click(screen.getByRole('button', { name: 'Collapse row' }))
            expect(
                screen.queryByRole('row', { name: 'Expanded details for row 1' }),
            ).not.toBeInTheDocument()
        })

        it('multiple rows can be expanded simultaneously', async () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: [
                    { header: 'Name', accessor: 'name' },
                    { header: 'Status', accessor: 'status', breakpoint: 'xxl' },
                ],
            })
            const user = await Test.Table.Click.expandButton(0)
            await user.click(Test.Table.Get.expandButton(0))
            expect(Test.Table.Get.expandedRow(1)).toBeInTheDocument()
            expect(Test.Table.Get.expandedRow(2)).toBeInTheDocument()
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
            const statusHeader = screen
                .getAllByRole('columnheader')
                .find((th) => th.textContent === 'Status')
            expect(statusHeader).toHaveClass('lg')
        })
    })
})
