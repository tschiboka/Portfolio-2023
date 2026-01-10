const { produce } = require('immer');
const { SessionStatuses } = require('../../config/constants');

function initialiseSession(state, deviceId) {
  return produce(state, draft => {
    if (
      draft.players.player1?.deviceId === deviceId ||
      draft.players.player2?.deviceId === deviceId
    ) {
      markAliveByDevice(draft, deviceId);
    } else if (!draft.players.player1) {
      draft.players.player1 = { deviceId, lastActive: Date.now(), connected: true };
    } else if (!draft.players.player2) {
      draft.players.player2 = { deviceId, lastActive: Date.now(), connected: true };
    }

    draft.status =
      draft.players.player1 && draft.players.player2
        ? SessionStatuses.ACTIVE
        : SessionStatuses.LOBBY;
  });
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

module.exports = {
  initialiseSession,
  markAliveByDevice,
};
