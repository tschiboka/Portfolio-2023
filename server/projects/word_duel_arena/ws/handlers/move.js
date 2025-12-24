const { produce } = require('immer');
const { commitSessionState } = require('../broadcast');
const { handleMove, markAlive } = require('../sessions');

module.exports = (session, ws, payload) => {
    newState = produce(session.state, (draft) => {
        markAlive(draft, ws);
        handleMove(draft, payload);
    });
    commitSessionState(session, newState);
};
