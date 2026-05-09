import { screen } from '@testing-library/react'
import { getNextSortDirection } from '../TableHead/TableHead.utils'
import { Test } from '@common/ux/Test'
import { Row } from './Table.spec.types'
import { rows } from './Table.mocks'

describe('Table — Sorting', () => {
    describe('Sortable headers', () => {
        it('renders sort button for sortable columns', () => {
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
            expect(Test.Table('test').Get.sortButton('Name')).toBeInTheDocument()
        })

        it('does not render sort button for non-sortable columns', () => {
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
            expect(Test.Table('test').Has.sortButton('Value')).toBe(false)
        })

        it('renders non-sortable column header as plain text', () => {
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
            const valueHeader = screen
                .getAllByRole('columnheader')
                .find((th) => th.textContent === 'Value')
            expect(valueHeader).toBeTruthy()
            expect(valueHeader?.querySelector('button')).toBeNull()
        })
    })

    describe('Sort interactions', () => {
        it('calls onSortChange when a sortable header is clicked', async () => {
            const onSortChange = vi.fn()
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
                    onSortChange,
                },
            })
            await Test.Table('test').Do.sortBy('Name')
            expect(onSortChange).toHaveBeenCalledTimes(1)
        })

        it('toggles to desc when clicking the currently asc-sorted column', async () => {
            const onSortChange = vi.fn()
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: [{ header: 'Name', accessor: 'name', isSortable: true }],
                sorting: {
                    column: 'name',
                    direction: 'asc',
                    onSortChange,
                },
            })
            await Test.Table('test').Do.sortBy('Name')
            expect(onSortChange).toHaveBeenCalledWith('name', 'desc')
        })

        it('sorts asc when clicking a different column', async () => {
            const onSortChange = vi.fn()
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
                    onSortChange,
                },
            })
            await Test.Table('test').Do.sortBy('Value')
            expect(onSortChange).toHaveBeenCalledWith('value', 'asc')
        })

        it('sorts asc when clicking current column that is desc', async () => {
            const onSortChange = vi.fn()
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: [{ header: 'Name', accessor: 'name', isSortable: true }],
                sorting: {
                    column: 'name',
                    direction: 'desc',
                    onSortChange,
                },
            })
            await Test.Table('test').Do.sortBy('Name')
            expect(onSortChange).toHaveBeenCalledWith('name', 'asc')
        })
    })

    describe('Sort header styling classes', () => {
        it('adds sorted and sorted-asc class to the active ascending column', () => {
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
            const th = screen.getByRole('columnheader', { name: /Name/ })
            expect(th).toHaveClass('sorted')
            expect(th).toHaveClass('sorted-asc')
        })

        it('adds sorted and sorted-desc class for descending', () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: [{ header: 'Name', accessor: 'name', isSortable: true }],
                sorting: {
                    column: 'name',
                    direction: 'desc',
                    onSortChange: vi.fn(),
                },
            })
            const th = screen.getByRole('columnheader', { name: /Name/ })
            expect(th).toHaveClass('sorted')
            expect(th).toHaveClass('sorted-desc')
        })

        it('does not add sorted class to inactive sortable column', () => {
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
