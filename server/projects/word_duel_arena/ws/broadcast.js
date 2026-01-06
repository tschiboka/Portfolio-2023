const { validateSessionState } = require('./validation/validateSessionState');

function broadcastSessionState(session) {
    for (const ws of session.connections) {
        if (ws.readyState !== ws.OPEN) continue;
        const payload = {
            type: 'state_update',
            payload: transformSessionForClient(session.state, ws.deviceId),
        };

        ws.send(JSON.stringify(payload));
    }
}

function commitSessionState(session, nextState) {
    if (nextState !== session.state) validateSessionState(nextState);

    session.state = nextState;
    broadcastSessionState(session);
}

function toPublicPlayer(player) {
    return player
        ? { connected: player.connected, lastActive: player.lastActive }
        : null;
}

function transformSessionForClient(state, requestingDeviceId) {
    const role = Object.entries(state.players).find(
        ([_, player]) => player && player.deviceId === requestingDeviceId
    )?.[0];

    return {
        id: state.id,
        status: state.status,
        players: {
            player1: toPublicPlayer(state.players.player1),
            player2: toPublicPlayer(state.players.player2),
        },
        role
    };
}

module.exports = {
    commitSessionState,
}