import { TableUtils } from '../Table.utils'

const { getTotalCols } = TableUtils

// ═════════════════════════════════════════════════════════════════════════════
//  UTILITY FUNCTIONS
// ═════════════════════════════════════════════════════════════════════════════

describe('Table — Utility Functions', () => {
    describe('getTotalCols', () => {
        it('should return column count with no extras', () => {
            expect(getTotalCols(3, false, false, false)).toBe(3)
        })

        it('should add 1 for breakpoints', () => {
            expect(getTotalCols(3, true, false, false)).toBe(4)
        })

        it('should add 1 for actions', () => {
            expect(getTotalCols(3, false, true, false)).toBe(4)
        })

        it('should add 1 for selection', () => {
            expect(getTotalCols(3, false, false, true)).toBe(4)
        })

        it('should add all extras', () => {
            expect(getTotalCols(3, true, true, true)).toBe(6)
        })

        it('should handle zero columns', () => {
            expect(getTotalCols(0, false, false, false)).toBe(0)
        })
    })
})
