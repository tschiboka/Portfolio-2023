const { SessionStatuses } = require("../../config/constants");

const sessions = {};


function getDefaultSessionState(id) {
  return {
    id,
    players: {
      player1: null,
      player2: null,
    },
    status: SessionStatuses.LOBBY,
  };
}

function getSession(sessionId) {
  if (!sessions[sessionId]) {
    sessions[sessionId] = {
      id: sessionId,
      state: getDefaultSessionState(sessionId),
      connections: new Set(),
    };
  }
  return sessions[sessionId];
}

function cleanupSessionIfEmpty(sessionId) {
  const session = sessions[sessionId];
  if (session && session.connections.size === 0) {
    delete sessions[sessionId];
  }
}

module.exports = {
  sessions,
  getSession,
  cleanupSessionIfEmpty,
};
