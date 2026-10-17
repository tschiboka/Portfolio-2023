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
