import { Arrays, isDefined, isEmpty } from '@common-utils'
import { SessionState } from '../../WordDuelArena.types'
import { GameConstants } from '../../config/constants/Game.constants'
import { MovePayload } from '../../../../../common/types'
import type { Optional } from '@common-utils'

const getIsHintDue = (draft: SessionState, payload: MovePayload) => {
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
        failedAttemptsSinceLastHint % GameConstants.hintsAfterFailedAttempts === 0
    )
}

const getRandomUnsolvedWordIndex = (draft: SessionState): Optional<number> => {
    if (!draft.level) return undefined
    const unsolvedIndices = draft.level.targetWords
        .map((word, index) => (word.status === 'UNSOLVED' ? index : null))
        .filter(isDefined)
    if (isEmpty(unsolvedIndices)) return undefined

    return Arrays.random(unsolvedIndices)
}

export const HintService = {
    GetIsHintDue: getIsHintDue,
    GetRandomUnsolvedWordIndex: getRandomUnsolvedWordIndex,
}
