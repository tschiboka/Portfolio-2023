import type { SortDirection } from '../Table.types'

export const getNextSortDirection = (
    currentColumn: unknown,
    currentDirection: SortDirection,
    targetColumn: unknown,
): SortDirection => (currentColumn === targetColumn && currentDirection === 'asc' ? 'desc' : 'asc')
