import { screen } from '@testing-library/react'
import {
    getPageWindow,
    isFirstPage,
    isLastPage,
    DEFAULT_PAGE_SIZE,
    DEFAULT_PAGE_SIZE_OPTIONS,
} from '../TablePagination/TablePagination.utils'
import { Test } from '@common/ux/Test'
import { Row } from './Table.spec.types'
import { basicColumns, rows } from './Table.mocks'

describe('Table — Pagination', () => {
    describe('Basic rendering', () => {
        it('renders pagination navigation', () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                pagination: {
                    page: 1,
                    totalPages: 3,
                    onPageChange: vi.fn(),
                    onPageSizeChange: vi.fn(),
                },
            })
            expect(Test.Table('test').Get.pagination()).toBeInTheDocument()
        })

        it('does not render pagination when prop is omitted', () => {
            Test.Table.Set.mock<Row>({ ariaLabel: 'test', data: rows, columns: basicColumns })
            expect(Test.Table('test').Has.pagination()).toBe(false)
        })

        it('renders page buttons for the window', () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                pagination: {
                    page: 1,
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
        it('calls onPageChange with page number when page button is clicked', async () => {
            const onPageChange = vi.fn()
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                pagination: {
                    page: 1,
                    totalPages: 3,
                    onPageChange,
                    onPageSizeChange: vi.fn(),
                },
            })
            await Test.Table('test').Do.goToPage(2)
            expect(onPageChange).toHaveBeenCalledWith(2)
        })

        it('calls onPageChange(1) when First page is clicked', async () => {
            const onPageChange = vi.fn()
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                pagination: {
                    page: 3,
                    totalPages: 5,
                    onPageChange,
                    onPageSizeChange: vi.fn(),
                },
            })
            await Test.Table('test').Do.goToFirstPage()
            expect(onPageChange).toHaveBeenCalledWith(1)
        })

        it('calls onPageChange(page-1) when Previous page is clicked', async () => {
            const onPageChange = vi.fn()
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                pagination: {
                    page: 3,
                    totalPages: 5,
                    onPageChange,
                    onPageSizeChange: vi.fn(),
                },
            })
            await Test.Table('test').Do.goToPrevPage()
            expect(onPageChange).toHaveBeenCalledWith(2)
        })

        it('calls onPageChange(page+1) when Next page is clicked', async () => {
            const onPageChange = vi.fn()
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                pagination: {
                    page: 3,
                    totalPages: 5,
                    onPageChange,
                    onPageSizeChange: vi.fn(),
                },
            })
            await Test.Table('test').Do.goToNextPage()
            expect(onPageChange).toHaveBeenCalledWith(4)
        })

        it('calls onPageChange(totalPages) when Last page is clicked', async () => {
            const onPageChange = vi.fn()
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                pagination: {
                    page: 3,
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
        it('disables First and Previous on page 1', () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                pagination: {
                    page: 1,
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

        it('disables Next and Last on last page', () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                pagination: {
                    page: 5,
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

        it('all nav buttons disabled when there is only one page', () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                pagination: {
                    page: 1,
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
        it('active page button has "active" class', () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                pagination: {
                    page: 2,
                    totalPages: 3,
                    onPageChange: vi.fn(),
                    onPageSizeChange: vi.fn(),
                },
            })
            expect(Test.Table('test').Get.pageButton(2)).toHaveClass('active')
        })

        it('non-active page buttons do not have "active" class', () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                pagination: {
                    page: 2,
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
        it('shows item range and total when totalItems is provided', () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                pagination: {
                    page: 1,
                    totalPages: 9,
                    pageSize: 10,
                    totalItems: 87,
                    onPageChange: vi.fn(),
                    onPageSizeChange: vi.fn(),
                },
            })
            expect(screen.getByText('87')).toBeInTheDocument()
        })

        it('does not show item info when totalItems is not provided', () => {
            const { container } = Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                pagination: {
                    page: 1,
                    totalPages: 3,
                    onPageChange: vi.fn(),
                    onPageSizeChange: vi.fn(),
                },
            })
            const info = container.querySelector('.table-pagination__info')
            expect(info?.textContent).toBe('')
        })

        it('caps the end at totalItems on the last page', () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                pagination: {
                    page: 9,
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

    describe('Pagination utilities', () => {
        it('DEFAULT_PAGE_SIZE is 10', () => {
            expect(DEFAULT_PAGE_SIZE).toBe(10)
        })

        it('DEFAULT_PAGE_SIZE_OPTIONS is [5, 10, 25, 50, 100]', () => {
            expect(DEFAULT_PAGE_SIZE_OPTIONS).toEqual([5, 10, 25, 50, 100])
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
