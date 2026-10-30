import { screen } from '@testing-library/react'
import { Test } from '@common-ux/Test'
import { Row } from './Table.spec.types'
import { TableMocks } from './Table.mocks'

const { rows, basicColumns } = TableMocks

describe('Table — Pagination', () => {
    describe('Basic rendering', () => {
        it('should render pagination navigation', () => {
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

        it('should not render pagination when prop is omitted', () => {
            Test.Table.Set.mock<Row>({ ariaLabel: 'test', data: rows, columns: basicColumns })
            expect(Test.Table('test').Has.pagination()).toBe(false)
        })

        it('should render page buttons for the window', () => {
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
    })

    describe('Page navigation', () => {
        it('should call onPageChange with page number when page button is clicked', async () => {
            const onPageChange = vi.fn()
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                pagination: {
                    pageNumber: 1,
                    totalPages: 3,
                    onPageChange,
                    onPageSizeChange: vi.fn(),
                },
            })
            await Test.Table('test').Do.goToPage(2)
            expect(onPageChange).toHaveBeenCalledWith(2)
        })

        it('should call onPageChange(1) when First page is clicked', async () => {
            const onPageChange = vi.fn()
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                pagination: {
                    pageNumber: 3,
                    totalPages: 5,
                    onPageChange,
                    onPageSizeChange: vi.fn(),
                },
            })
            await Test.Table('test').Do.goToFirstPage()
            expect(onPageChange).toHaveBeenCalledWith(1)
        })

        it('should call onPageChange(page-1) when Previous page is clicked', async () => {
            const onPageChange = vi.fn()
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                pagination: {
                    pageNumber: 3,
                    totalPages: 5,
                    onPageChange,
                    onPageSizeChange: vi.fn(),
                },
            })
            await Test.Table('test').Do.goToPrevPage()
            expect(onPageChange).toHaveBeenCalledWith(2)
        })

        it('should call onPageChange(page+1) when Next page is clicked', async () => {
            const onPageChange = vi.fn()
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                pagination: {
                    pageNumber: 3,
                    totalPages: 5,
                    onPageChange,
                    onPageSizeChange: vi.fn(),
                },
            })
            await Test.Table('test').Do.goToNextPage()
            expect(onPageChange).toHaveBeenCalledWith(4)
        })

        it('should call onPageChange(totalPages) when Last page is clicked', async () => {
            const onPageChange = vi.fn()
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                pagination: {
                    pageNumber: 3,
                    totalPages: 5,
                    onPageChange,
                    onPageSizeChange: vi.fn(),
                },
            })
            await Test.Table('test').Do.goToLastPage()
            expect(onPageChange).toHaveBeenCalledWith(5)
        })
    })

    describe('First/Last page disabled states', () => {
        it('should disable First and Previous on page 1', () => {
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
            expect(table.Get.nextPage()).not.toBeDisabled()
            expect(table.Get.lastPage()).not.toBeDisabled()
        })

        it('should disable Next and Last on last page', () => {
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
            expect(table.Get.firstPage()).not.toBeDisabled()
            expect(table.Get.prevPage()).not.toBeDisabled()
            expect(table.Get.nextPage()).toBeDisabled()
            expect(table.Get.lastPage()).toBeDisabled()
        })

        it('should disable every nav button with a single page', () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                pagination: {
                    pageNumber: 1,
                    totalPages: 1,
                    onPageChange: vi.fn(),
                    onPageSizeChange: vi.fn(),
                },
            })
            const table = Test.Table('test')
            expect(table.Get.firstPage()).toBeDisabled()
            expect(table.Get.prevPage()).toBeDisabled()
            expect(table.Get.nextPage()).toBeDisabled()
            expect(table.Get.lastPage()).toBeDisabled()
        })
    })

    describe('Current page highlighting', () => {
        it('should give the active page button the "active" class', () => {
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
            expect(Test.Table('test').Get.pageButton(2)).toHaveClass('active')
        })

        it('should leave non-active page buttons without the "active" class', () => {
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
            const table = Test.Table('test')
            expect(table.Get.pageButton(1)).not.toHaveClass('active')
            expect(table.Get.pageButton(3)).not.toHaveClass('active')
        })
    })

    describe('Total items info', () => {
        it('should show item range and total when totalItems is provided', () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                pagination: {
                    pageNumber: 1,
                    totalPages: 9,
                    pageSize: 10,
                    totalItems: 87,
                    onPageChange: vi.fn(),
                    onPageSizeChange: vi.fn(),
                },
            })
            expect(screen.getByText('87')).toBeInTheDocument()
        })

        it('should not show item info when totalItems is not provided', () => {
            const { container } = Test.Table.Set.mock<Row>({
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
            const info = container.querySelector('.table-pagination__info')
            expect(info?.textContent).toBe('')
        })

        it('should cap the end at totalItems on the last page', () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                pagination: {
                    pageNumber: 9,
                    totalPages: 9,
                    pageSize: 10,
                    totalItems: 87,
                    onPageChange: vi.fn(),
                    onPageSizeChange: vi.fn(),
                },
            })
            // Page 9 of 87 items at size 10 = items 81–87
            expect(screen.getByLabelText('Items 81 to 87')).toBeInTheDocument()
        })
    })
})
