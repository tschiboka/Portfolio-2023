const { produce } = require('immer');
const { SessionStatuses } = require('./constants');
const sessions = {};

const getDefaultSessionState = (id) => ({ 
    id,
    players: {
        player1: undefined,
        player2: undefined,
    },
    status: SessionStatuses.LOBBY,
});

/**
 * Get existing session or create a new one.
 * Returns the existing or a new session object.
 */
function getSession(sessionId) {
    if (!sessions[sessionId]) {
        sessions[sessionId] = {
            id: sessionId,
            state: { ...getDefaultSessionState(sessionId) },
            connections: new Set(),
        };
    }

    return sessions[sessionId];
}

/**
 * Update or assign a seat to the deviceId
 * Returns the session object with seating arrangement.
 */
const initialiseSession = (session, deviceId) => {
    const defaultPlayer = {
        deviceId,
        lastActive: Date.now(),
        connected: true,
    };

    return produce(session.state, draft => {
        if (!draft.players?.player1) draft.players.player1 = defaultPlayer;
        else if (!draft.players?.player2 && draft.players.player1.deviceId !== deviceId) draft.players.player2 = defaultPlayer;
        draft.status = draft.players?.player1 && draft.players?.player2
            ? SessionStatuses.ACTIVE
            : SessionStatuses.LOBBY;

        if (draft.players.player1?.deviceId === deviceId) {
            draft.players.player1.lastActive = Date.now();
            draft.players.player1.connected = true;
        } else if (draft.players.player2?.deviceId === deviceId) {
            draft.players.player2.lastActive = Date.now();
            draft.players.player2.connected = true;
        }
    });
};

/**
 * Cleanup session if no connections remain
 */
function cleanupSessionIfEmpty(sessionId) {
    const session = sessions[sessionId];
    if (session && session.connections.size === 0) {
        delete sessions[sessionId];
    }
}

function markAlive(draft, ws) {
  const now = Date.now();

  if (draft.player1?.deviceId === ws.deviceId) {
    draft.player1.lastActive = now;
    draft.player1.connected = true;
  } else if (draft.player2?.deviceId === ws.deviceId) {
    draft.player2.lastActive = now;
    draft.player2.connected = true;
  }
}

/**
 * Update session state immutably.
 * Returns the new state for broadcasting
 */
function handleMove(draft, payload) {
  if (draft.status !== 'ACTIVE') return;

  // TODO: Apply the actual move logic here
  // Example: draft.wordWheel = payload.move;
}
/**
 * Example: generic state updater for arbitrary actions
 */
function updateState(sessionId, updater) {
    const session = sessions[sessionId];
    if (!session) throw new Error('Session not found');

    session.state = produce(session.state, updater);
    return session.state;
}

module.exports = {
    getSession,
    cleanupSessionIfEmpty,
    handleMove,
    markAlive,
    initialiseSession,
    updateState,
    sessions,
};