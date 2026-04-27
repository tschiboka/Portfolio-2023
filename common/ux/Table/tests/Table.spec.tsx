import { getTotalCols } from '../Table.utils'

// ═════════════════════════════════════════════════════════════════════════════
//  UTILITY FUNCTIONS
// ═════════════════════════════════════════════════════════════════════════════

describe('Table — Utility Functions', () => {
    describe('getTotalCols', () => {
        it('returns column count with no extras', () => {
            expect(getTotalCols(3, false, false, false)).toBe(3)
        })

        it('adds 1 for breakpoints', () => {
            expect(getTotalCols(3, true, false, false)).toBe(4)
        })

        it('adds 1 for actions', () => {
            expect(getTotalCols(3, false, true, false)).toBe(4)
        })

        it('adds 1 for selection', () => {
            expect(getTotalCols(3, false, false, true)).toBe(4)
        })

        it('adds all extras', () => {
            expect(getTotalCols(3, true, true, true)).toBe(6)
        })

        it('handles zero columns', () => {
            expect(getTotalCols(0, false, false, false)).toBe(0)
        })
    })
})
