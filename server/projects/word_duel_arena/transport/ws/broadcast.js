const { validateSession } = require('./validation/session/session');

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

function sendErrorToDevice(session, deviceId, message) {
    for (const ws of session.connections) {
        if (ws.deviceId === deviceId && ws.readyState === ws.OPEN) {
            ws.send(JSON.stringify({
                type: 'error',
                message,
            }));
            return;
        }
    }
}

function commitSessionState(session, nextState, deviceId) {
    if (nextState === session.state) return;
    const { error } = validateSession(nextState)

    if (error) {
        console.log(
          'Session state validation failed:',
          error.details[0].message
        );

        if (deviceId) {
            sendErrorToDevice(
              session,
              deviceId,
              error.details[0].message
            );
        }

        return;
    }

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
        level: { 
            ...state.level,
            targetWords: state.level ? state.level.targetWords.map(word => ({
                ...word,
                word: word.status === 'SOLVED' ? word.word : undefined,
                mask: word.status === 'SOLVED' ? undefined : word.mask,
            })) : [],
            extraWords: state.level ? state.level.extraWords.map(word => ({
                ...word,
                word: word.status === 'SOLVED' ? word.word : undefined,
                mask: word.status === 'SOLVED' ? undefined : word.mask,
            })) : [],
        },
        players: {
            player1: toPublicPlayer(state.players.player1),
            player2: toPublicPlayer(state.players.player2),
        },
        currentMatch: state.currentMatch,
        role
    };
}

module.exports = {
    commitSessionState,
}