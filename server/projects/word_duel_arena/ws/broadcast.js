const { validateSessionState } = require('./validate');

function broadcastSessionState(session, payload) {
    const message = JSON.stringify(payload);

    for (const ws of session.connections) {
        if (ws.readyState === ws.OPEN) ws.send(message)
    }
}

function commitSessionState(session, nextState) {
    if (nextState === session.state) return
    validateSessionState(nextState)
    
    session.state = nextState
        broadcastSessionState(session, {
        type: 'state_update',
        payload: session.state,
    })
}

module.exports = {
    commitSessionState,
}