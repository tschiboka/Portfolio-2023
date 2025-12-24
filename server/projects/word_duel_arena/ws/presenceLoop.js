const { sessions } = require('./sessions');
const { commitSessionState } = require('./broadcast');
const { CHECK_INTERVAL, INACTIVE_TIMEOUT } = require('./constants');
const { produce } = require('immer');


function startPresenceLoop() {
  setInterval(() => {
    const now = Date.now();

    Object.values(sessions).forEach(session => {
      let changed = false;

      const updatedState = produce(session.state, draft => {
        ['player1', 'player2'].forEach(seatKey => {
          const player = draft.players[seatKey];
          if (!player || !player.connected) return;

          if (now - player.lastActive > INACTIVE_TIMEOUT) {
            player.connected = false;
            changed = true;
          }
        });
      });


      if (changed) commitSessionState(session, updatedState)
    });
  }, CHECK_INTERVAL);
}

module.exports = { startPresenceLoop };
