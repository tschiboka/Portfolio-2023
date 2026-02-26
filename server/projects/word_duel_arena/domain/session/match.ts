import type { Match, MatchPlayerStatus } from '../../types'

import { nanoid } from 'nanoid'
import { MatchStatuses } from '../../config/constants/game'

const defaultPlayer: MatchPlayerStatus = {
    derivedStatus: 'ACTIVE',
    resigned: false,
    paused: false,
    points: 0,
}
const getInitialMatchState = (): Match => ({
    id: nanoid(),
    status: MatchStatuses.ACTIVE,
    perPlayerStatus: {
        player1: { ...defaultPlayer },
        player2: { ...defaultPlayer },
    },
    moves: [],
    winner: null,
})

export { getInitialMatchState }
