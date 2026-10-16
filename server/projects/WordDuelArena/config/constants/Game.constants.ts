import {
    WdaLevelWordStatuses,
    WdaMatchStatuses,
    WdaPlayerDerivedStatuses,
} from '../../../../../common/types/projects/wda'

/** The match, level-word and derived-status enums, plus the hint threshold. */
export const GameConstants = {
    matchStatuses: WdaMatchStatuses,
    levelWordStatuses: WdaLevelWordStatuses,
    playerDerivedStatuses: WdaPlayerDerivedStatuses,
    hintsAfterFailedAttempts: 5,
}
