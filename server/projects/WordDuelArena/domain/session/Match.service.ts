import { nanoid } from 'nanoid'
import { GameConstants } from '../../config/constants/Game.constants'
import type { Match, MatchPlayerStatus } from '../../WordDuelArena.types'

const defaultPlayer: MatchPlayerStatus = {
    derivedStatus: 'ACTIVE',
    resigned: false,
    paused: false,
    points: 0,
}
const getInitialMatchState = (): Match => ({
    id: nanoid(),
    status: GameConstants.matchStatuses.ACTIVE,
    perPlayerStatus: {
        player1: { ...defaultPlayer },
        player2: { ...defaultPlayer },
    },
    moves: [],
    winner: null,
    reason: null,
})

export const MatchService = { getInitialState: getInitialMatchState }
