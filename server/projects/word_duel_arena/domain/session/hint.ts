import { MovePayload } from '@common/types'
import { SessionState } from '../../types'
import type { Optional } from '@common/utils'
import { isDefined, isEmpty } from '@common/utils/Predicate'
import { Arrays } from '@common/utils/Arrays'
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

export const getRandomUnsolvedWordIndex = (draft: SessionState): Optional<number> => {
    if (!draft.level) return undefined
    const unsolvedIndices = draft.level.targetWords
        .map((word, index) => (word.status === 'UNSOLVED' ? index : null))
        .filter(isDefined)
    if (isEmpty(unsolvedIndices)) return undefined

    return Arrays.random(unsolvedIndices)
}
