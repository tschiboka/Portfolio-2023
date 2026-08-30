import type { PageMeta } from '@types'
import { TablePagingDefaults } from '../Table/Table.constants'
import { isDefined, isDigits } from '../Predicate'

/** Bounds for parsing page/pageSize query params. */
export type PagingBounds = {
    pageNumberMin?: number
    pageSizeMin?: number
    pageSizeMax?: number
    defaultPageNumber?: number
    defaultPageSize?: number
}

/** A parsed and clamped page — `skip` is the offset to use with `.skip(skip)`. */
export type Paged = {
    pageNumber: number
    limit: number
    skip: number
}

/** Safe-integer parse: ignores non-digit strings / NaN via {@link isDigits}. */
const parseSafeInt = (value: string | undefined, fallback: number): number =>
    isDefined(value) && isDigits(value) ? parseInt(value, 10) : fallback

/**
 * Server-side paging math: parses `page`/`pageSize` query params, clamps them to the supplied
 * bounds and derives the skip offset. Defaults come from the shared table paging defaults.
 *
 * @example
 * Paging.parse('2', '25', { pageSizeMin: 1, pageSizeMax: 100 })
 *   // { pageNumber: 2, limit: 25, skip: 25 }
 */
export const Paging = {
    parse: (page?: string, pageSize?: string, bounds: PagingBounds = {}): Paged => {
        const pageNumberMin = bounds.pageNumberMin ?? TablePagingDefaults.pageNumber
        const pageSizeMin = bounds.pageSizeMin ?? TablePagingDefaults.pageSize
        const pageSizeMax = bounds.pageSizeMax ?? Number.POSITIVE_INFINITY
        const defaultPageNumber = bounds.defaultPageNumber ?? TablePagingDefaults.pageNumber
        const defaultPageSize = bounds.defaultPageSize ?? TablePagingDefaults.pageSize
        const pageNumber = Math.max(parseSafeInt(page, defaultPageNumber), pageNumberMin)
        const limit = Math.min(
            Math.max(parseSafeInt(pageSize, defaultPageSize), pageSizeMin),
            pageSizeMax,
        )
        const skip = (pageNumber - 1) * limit

        return { pageNumber, limit, skip }
    },

    /** Builds the {@link PageMeta} for a paginated response. */
    toMeta: (totalItems: number, limit: number, pageNumber: number): PageMeta => ({
        totalItems,
        totalPages: Math.ceil(totalItems / limit),
        pageNumber,
    }),
}
