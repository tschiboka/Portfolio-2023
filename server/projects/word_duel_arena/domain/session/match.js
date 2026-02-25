const { nanoid } = require('nanoid')
const { MatchStatuses } = require('../../config/constants/game')

const defaultPlayer = {
    derivedStatus: 'ACTIVE',
    resigned: false,
    paused: false,
    points: 0,
}
const getInitialMatchState = () => ({
    id: nanoid(),
    status: MatchStatuses.ACTIVE,
    perPlayerStatus: {
        player1: { ...defaultPlayer },
        player2: { ...defaultPlayer },
    },
    moves: [],
    winner: null,
})

module.exports = {
    getInitialMatchState,
}
