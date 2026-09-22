import type { BreakdownRow, SectionData } from './BreakdownPreview.types'

/**
 * Zips today's paths with their all-time totals into one row per path.
 *
 * @example
 * toRows({ today: [{ path: '/', count: 2 }], total: [{ path: '/', count: 7 }] })
 * // [{ path: '/', today: 2, total: 7 }]
 */
const toRows = ({ today, total }: SectionData): BreakdownRow[] =>
    today.map(({ path, count }) => ({
        path,
        today: count,
        total: total.find((candidate) => candidate.path === path)?.count ?? 0,
    }))

export const BreakdownTransformers = { toRows }
