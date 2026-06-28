import { screen } from '@testing-library/react'
import { Test } from '@common/ux/Test'
import { Row } from './Table.spec.types'
import { basicColumns, rows } from './Table.mocks'

describe('Table — Refresh & Loading', () => {
    describe('Refresh button', () => {
        it('renders refresh button when onRefresh is provided', () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                onRefresh: vi.fn(),
                title: 'T',
            })
            expect(Test.Table('T').Get.refreshButton()).toBeInTheDocument()
        })

        it('does not render refresh button when onRefresh is omitted', () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
            })
            expect(screen.queryByRole('button', { name: 'Refresh data' })).not.toBeInTheDocument()
        })

        it('calls onRefresh when clicked', async () => {
            const onRefresh = vi.fn()
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                onRefresh,
                title: 'T',
            })
            await Test.Table('T').Do.refresh()
            expect(onRefresh).toHaveBeenCalledTimes(1)
        })

        it('refresh button contributes to header visibility', () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                onRefresh: vi.fn(),
            })
            // Header should render when only onRefresh is provided
            expect(screen.getByRole('button', { name: 'Refresh data' })).toBeInTheDocument()
        })
    })

    describe('Loading skeleton', () => {
        it('renders skeleton rows when isLoading is true', () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: [],
                columns: basicColumns,
                pagination: {
                    page: 1,
                    totalPages: 1,
                    pageSize: 5,
                    onPageChange: vi.fn(),
                    onPageSizeChange: vi.fn(),
                },
                isLoading: true,
            })
            const table = Test.Table('test')
            expect(table.Has.skeleton()).toBe(true)
        })

        it('renders correct number of skeleton rows based on pageSize', () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: [],
                columns: basicColumns,
                pagination: {
                    page: 1,
                    totalPages: 1,
                    pageSize: 3,
                    onPageChange: vi.fn(),
                    onPageSizeChange: vi.fn(),
                },
                isLoading: true,
            })
            const skeletonRows = document.querySelectorAll('.table-skeleton-row')
            expect(skeletonRows).toHaveLength(3)
        })

        it('renders correct number of skeleton columns', () => {
            const cols = 4
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: [],
                columns: [
                    { header: 'A', accessor: 'name' },
                    { header: 'B', accessor: 'value' },
                    { header: 'C', accessor: 'status' },
                    { header: 'D', accessor: 'note' },
                ],
                pagination: {
                    page: 1,
                    totalPages: 1,
                    pageSize: 1,
                    onPageChange: vi.fn(),
                    onPageSizeChange: vi.fn(),
                },
                isLoading: true,
            })
            const skeletonRow = document.querySelector('.table-skeleton-row')
            expect(skeletonRow?.children).toHaveLength(cols)
        })

        it('does not render skeleton when isLoading is false', () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                isLoading: false,
            })
            expect(document.querySelector('.table-skeleton-row')).not.toBeInTheDocument()
        })

        it('does not render skeleton when isLoading is undefined', () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
            })
            expect(document.querySelector('.table-skeleton-row')).not.toBeInTheDocument()
        })

        it('hides data rows while loading', () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                isLoading: true,
            })
            // Data text should not appear while loading
            expect(screen.queryByText('Alpha')).not.toBeInTheDocument()
            expect(screen.queryByText('Beta')).not.toBeInTheDocument()
        })

        it('defaults skeleton rows to 5 when no pagination provided', () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: [],
                columns: basicColumns,
                isLoading: true,
            })
            const skeletonRows = document.querySelectorAll('.table-skeleton-row')
            expect(skeletonRows).toHaveLength(5)
        })

        it('skeleton rows are aria-hidden', () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: [],
                columns: basicColumns,
                isLoading: true,
            })
            const skeletonRow = document.querySelector('.table-skeleton-row')
            expect(skeletonRow).toHaveAttribute('aria-hidden', 'true')
        })
    })

    describe('Refresh + Loading interaction', () => {
        it('can refresh while loading', async () => {
            const onRefresh = vi.fn()
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: [],
                columns: basicColumns,
                isLoading: true,
                onRefresh,
                title: 'T',
            })
            const table = Test.Table('T')
            // Skeleton visible
            expect(table.Has.skeleton()).toBe(true)
            // Refresh still works while skeleton is shown
            await table.Do.refresh()
            expect(onRefresh).toHaveBeenCalledTimes(1)
        })
    })
})
