import { MovePayload } from '@common/types'
import { SessionState } from '../../types'
import { GIVE_HINTS_AFTER_FAILED_ATTEMPTS } from '../../config/constants/game'

export const getIsHintDue = (draft: SessionState, payload: MovePayload) => {
    if (!draft.currentMatch) return false

    const lastCorrectIndex = draft.currentMatch.moves.findLastIndex(
        (move) => move.isTarget || move.isExtra,
    )

    const previouslyFailedWords = new Set(
        draft.currentMatch.moves
            .slice(0, lastCorrectIndex + 1)
            .filter((move) => !move.isTarget && !move.isExtra)
            .map((move) => move.word),
    )
    const movesSinceLastHit = draft.currentMatch.moves.slice(lastCorrectIndex + 1)
    const uniqueNewFailedWords = new Set(
        movesSinceLastHit
            .filter((move) => !previouslyFailedWords.has(move.word))
            .map((move) => move.word),
    )
    if (!previouslyFailedWords.has(payload.attempt)) {
        uniqueNewFailedWords.add(payload.attempt) // include current attempt (not yet pushed)
    }
    const failedAttemptsSinceLastHint = uniqueNewFailedWords.size

    return (
        failedAttemptsSinceLastHint > 0 &&
        failedAttemptsSinceLastHint % GIVE_HINTS_AFTER_FAILED_ATTEMPTS === 0
    )
}

export const getRandomUnsolvedWordIndex = (draft: SessionState): number | undefined => {
    if (!draft.level) return undefined
    const unsolvedIndices = draft.level.targetWords
        .map((word, index) => (word.status === 'UNSOLVED' ? index : null))
        .filter((index): index is number => index !== null)
    if (unsolvedIndices.length === 0) return undefined

    return unsolvedIndices[Math.floor(Math.random() * unsolvedIndices.length)]
}
