export const DEFAULT_PAGE_SIZE_OPTIONS = [10, 25, 50, 100]
export const DEFAULT_PAGE_SIZE = 10

const PAGE_WINDOW_SIZE = 3
const PAGE_WINDOW_HALF = Math.floor(PAGE_WINDOW_SIZE / 2)

export const getPageWindow = (page: number, totalPages: number): number[] => {
    if (totalPages <= PAGE_WINDOW_SIZE) return Array.from({ length: totalPages }, (_, i) => i + 1)
    if (page <= PAGE_WINDOW_HALF + 1)
        return Array.from({ length: PAGE_WINDOW_SIZE }, (_, i) => i + 1)
    if (page >= totalPages - PAGE_WINDOW_HALF) {
        return Array.from(
            { length: PAGE_WINDOW_SIZE },
            (_, i) => totalPages - PAGE_WINDOW_SIZE + 1 + i,
        )
    }
    return Array.from({ length: PAGE_WINDOW_SIZE }, (_, i) => page - PAGE_WINDOW_HALF + i)
}

export const isFirstPage = (page: number): boolean => page <= 1
export const isLastPage = (page: number, totalPages: number): boolean => page >= totalPages
