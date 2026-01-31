const { nanoid } = require('nanoid');
const { SessionStatuses } = require('../../config/constants/session');

const defaultPlayer = {
    derivedStatus: 'ACTIVE',
    resigned: false,
    paused: false,
    points: 0
}
const getInitialMatchState = () => ({
    id: nanoid(),
    status: SessionStatuses.ACTIVE,
    perPlayerStatus: {
        player1: { ...defaultPlayer },
        player2: { ...defaultPlayer }
    },
    moves: [],
    winner: null
})

module.exports = {
  getInitialMatchState,
};
