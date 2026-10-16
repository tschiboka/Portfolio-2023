import type { SortDirection } from '../Table.types'

const getNextSortDirection = (
    currentColumn: unknown,
    currentDirection: SortDirection,
    targetColumn: unknown,
): SortDirection => (currentColumn === targetColumn && currentDirection === 'asc' ? 'desc' : 'asc')

export const TableHeadUtils = { getNextSortDirection }
