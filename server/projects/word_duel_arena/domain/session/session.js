const { produce } = require('immer');
const { SessionStatuses } = require('../../config/constants/session');

const initialiseSession = (state, deviceId) => produce(state, draft => {
    const lastActive = Date.now();
    const isDeviceAlreadySeated = draft.players.player1?.deviceId === deviceId ||
        draft.players.player2?.deviceId === deviceId
    
    if (isDeviceAlreadySeated) markAliveByDevice(draft, deviceId)
    else if (!draft.players.player1) {
        draft.players.player1 = { deviceId, lastActive, connected: true };
    } else if (!draft.players.player2) {
        draft.players.player2 = { deviceId, lastActive, connected: true };
    }

    const hasTwoPlayers = draft.players.player1 && draft.players.player2;
    if (hasTwoPlayers && draft.status) draft.status = SessionStatuses.ACTIVE;
});


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
