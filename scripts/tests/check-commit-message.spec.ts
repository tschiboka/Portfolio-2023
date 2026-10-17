import { describe, expect, it } from 'vitest'
import { parseCommitMessage } from '../check-commit-message.js'

describe('parseCommitMessage', () => {
    it('should accept a numeric ticket ref', () => {
        expect(parseCommitMessage('[0009] - Add export order lint rule')).toEqual({ valid: true })
    })

    it('should accept a keyed ticket ref', () => {
        expect(parseCommitMessage('[ABC-0009] - Add export order lint rule')).toEqual({
            valid: true,
        })
    })

    it('should accept the shortest ref and the lowest number', () => {
        expect(parseCommitMessage('[1] - X')).toEqual({ valid: true })
    })

    it('should accept the highest number and the longest keyed ref', () => {
        expect(parseCommitMessage('[ABCDE-100000] - Feat: add (thing)')).toEqual({ valid: true })
    })

    it('should accept padding zeros in the number', () => {
        expect(parseCommitMessage('[0001] - X')).toEqual({ valid: true })
    })

    it('should accept ordinary punctuation in the message', () => {
        expect(parseCommitMessage('[0009] - Fix a/b_c: v2 & (beta) 3, done')).toEqual({
            valid: true,
        })
    })

    it('should accept a merge message git wrote itself', () => {
        expect(parseCommitMessage("Merge branch 'main' into feature")).toEqual({ valid: true })
    })

    it('should accept a revert message git wrote itself', () => {
        expect(parseCommitMessage('Revert "[0009] - Bad rule"')).toEqual({ valid: true })
    })

    it('should refuse a message with no ref', () => {
        expect(parseCommitMessage('Add export order lint rule').valid).toBe(false)
    })

    it('should refuse a lowercase keyed ref', () => {
        expect(parseCommitMessage('[abc-0009] - X').valid).toBe(false)
    })

    it('should refuse ticket number zero', () => {
        expect(parseCommitMessage('[0000] - X').valid).toBe(false)
    })

    it('should refuse a number above the ceiling', () => {
        expect(parseCommitMessage('[100001] - X').valid).toBe(false)
    })

    it('should refuse more than six digits', () => {
        expect(parseCommitMessage('[1234567] - X').valid).toBe(false)
    })

    it('should refuse more than five letters in the keyed ref', () => {
        expect(parseCommitMessage('[ABCDEF-1] - X').valid).toBe(false)
    })

    it('should refuse a separator other than a spaced hyphen', () => {
        expect(parseCommitMessage('[0009] Fix it').valid).toBe(false)
    })

    it('should refuse an empty message', () => {
        expect(parseCommitMessage('[0009] - ').valid).toBe(false)
    })

    it('should refuse a message that opens with a space', () => {
        expect(parseCommitMessage('[0009] -  Fix it').valid).toBe(false)
    })

    it('should refuse a trailing space', () => {
        expect(parseCommitMessage('[0009] - Fix it ').valid).toBe(false)
    })

    it('should refuse padding inside the brackets', () => {
        expect(parseCommitMessage('[ 0009 ] - X').valid).toBe(false)
    })

    it('should refuse an en dash in place of the hyphen', () => {
        expect(parseCommitMessage('[0009] – Fix it').valid).toBe(false)
    })
})
