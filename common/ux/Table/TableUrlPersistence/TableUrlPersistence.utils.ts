import type { TableState } from '../useTableController/useTableController.types'
import type { Dictionary } from '@common/utils/Generics'
import { Objects } from '@common/utils'

/** Structural equality for a `TableState`. Filter values are primitives, so a shallow compare
 * plus the sorting/paging fields is sufficient. Used to tell a URL-derived state from the state
 * this table last persisted (i.e. to recognise our own persist echo). */
export const statesEqual = <TFilters extends Dictionary>(
    a: TableState<TFilters>,
    b: TableState<TFilters>,
): boolean =>
    Objects.shallowEqual(a.pagination, b.pagination) &&
    Objects.shallowEqual(a.sorting, b.sorting) &&
    Objects.shallowEqual(a.filters, b.filters)
