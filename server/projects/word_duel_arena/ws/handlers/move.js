const { produce } = require('immer');
const { commitSessionState } = require('../broadcast');
const { markAlive } = require('../sessions');

const moveHandler = (session, ws, payload) => {
    newState = produce(session.state, (draft) => {
        markAlive(draft, ws);
        handleMove(draft, ws, payload);
    });
    commitSessionState(session, newState);
};

/**
 * Update session state immutably.
 * Returns the new state for broadcasting
 */
function handleMove(draft, ws, payload) {
    if (draft.status !== 'ACTIVE') return;
    console.log(`Handling move for device: ${ws.deviceId} with move: ${payload.attempt}`);
}


module.exports = { moveHandler };
