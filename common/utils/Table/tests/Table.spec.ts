import { describe, it, expect } from 'vitest'
import { Table, TableUtils } from '..'

const { getPageWindow, isFirstPage, isLastPage } = TableUtils

describe('Table.Paging.defaults', () => {
    it('should be first page with 10 rows', () => {
        expect(Table.Paging.defaults).toEqual({ pageNumber: 1, pageSize: 10 })
    })
})

describe('Table.Paging.pageSizeOptions', () => {
    it('should list the selectable page sizes', () => {
        expect(Table.Paging.pageSizeOptions).toEqual([5, 10, 25, 50, 100])
    })
})

describe('Table.Sorting.defaults', () => {
    it('should have no column and ascending direction', () => {
        expect(Table.Sorting.defaults).toEqual({ column: '', direction: 'asc' })
    })
})

describe('getPageWindow', () => {
    it('should list all pages when totalPages fits in the window', () => {
        expect(getPageWindow(1, 1)).toEqual([1])
        expect(getPageWindow(1, 2)).toEqual([1, 2])
        expect(getPageWindow(1, 3)).toEqual([1, 2, 3])
    })

    it('should list the first window when on an early page', () => {
        expect(getPageWindow(1, 10)).toEqual([1, 2, 3])
        expect(getPageWindow(2, 10)).toEqual([1, 2, 3])
    })

    it('should list the last window when on a late page', () => {
        expect(getPageWindow(10, 10)).toEqual([8, 9, 10])
        expect(getPageWindow(9, 10)).toEqual([8, 9, 10])
    })

    it('should list a middle window otherwise', () => {
        expect(getPageWindow(5, 10)).toEqual([4, 5, 6])
    })
})

describe('isFirstPage', () => {
    it('should be true for page 1 and below', () => {
        expect(isFirstPage(1)).toBe(true)
        expect(isFirstPage(0)).toBe(true)
    })

    it('should be false past page 1', () => {
        expect(isFirstPage(2)).toBe(false)
    })
})

describe('isLastPage', () => {
    it('should be true at or beyond the last page', () => {
        expect(isLastPage(5, 5)).toBe(true)
        expect(isLastPage(6, 5)).toBe(true)
    })

    it('should be false before the last page', () => {
        expect(isLastPage(3, 5)).toBe(false)
    })
})
