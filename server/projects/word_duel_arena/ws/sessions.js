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
const initialiseSession = (session, deviceId) => 
    produce(session.state, draft => {
        const { player1, player2 } = draft.players ?? {};
        
        if (player1?.deviceId === deviceId || player2?.deviceId === deviceId) 
            markAliveByDevice(draft, deviceId)
        else if (!player1) 
            draft.players.player1 = { deviceId, lastActive: Date.now(), connected: true }
        else if (!player2) 
            draft.players.player2 = { deviceId, lastActive: Date.now(), connected: true }

        draft.status = player1 && player2
            ? SessionStatuses.ACTIVE
            : SessionStatuses.LOBBY
    }
)

function markAlive(draft, ws) {
  markAliveByDevice(draft, ws.deviceId);
}

/**
 * Cleanup session if no connections remain
 */
function cleanupSessionIfEmpty(sessionId) {
    const session = sessions[sessionId];
    if (session && session.connections.size === 0) {
        delete sessions[sessionId];
    }
}

function markAliveByDevice(draft, deviceId) {
  const now = Date.now();

  if (draft.players.player1?.deviceId === deviceId) {
    draft.players.player1.lastActive = now;
    draft.players.player1.connected = true;
  } else if (draft.players.player2?.deviceId === deviceId) {
    draft.players.player2.lastActive = now;
    draft.players.player2.connected = true;
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
    markAliveByDevice,
    initialiseSession,
    updateState,
    sessions,
};