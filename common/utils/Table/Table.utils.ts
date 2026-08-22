import { Arrays } from '../Arrays'

const PAGE_WINDOW_SIZE = 3
const PAGE_WINDOW_HALF = Math.floor(PAGE_WINDOW_SIZE / 2)
const pageWindow = (): number[] => Arrays.times(PAGE_WINDOW_SIZE, (i) => i + 1)

/** Page numbers to show in the pager given the current page and total pages. */
export const getPageWindow = (pageNumber: number, totalPages: number): number[] => {
    if (totalPages <= PAGE_WINDOW_SIZE) return Arrays.times(totalPages, (i) => i + 1)
    if (pageNumber <= PAGE_WINDOW_HALF + 1) return pageWindow()
    if (pageNumber >= totalPages - PAGE_WINDOW_HALF) {
        return Arrays.times(PAGE_WINDOW_SIZE, (i) => totalPages - PAGE_WINDOW_SIZE + 1 + i)
    }
    return Arrays.times(PAGE_WINDOW_SIZE, (i) => pageNumber - PAGE_WINDOW_HALF + i)
}

export const isFirstPage = (pageNumber: number): boolean => pageNumber <= 1
export const isLastPage = (pageNumber: number, totalPages: number): boolean =>
    pageNumber >= totalPages
