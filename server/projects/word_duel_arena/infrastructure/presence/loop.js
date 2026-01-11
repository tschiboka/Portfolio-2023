const { sessions } = require('../persistence/server/session');
const { commitSessionState } = require('../../transport/ws/broadcast');
const { CHECK_INTERVAL, INACTIVE_TIMEOUT, SessionStatuses } = require('../../config/constants/session');
const { applyPresenceRules } = require('../../domain/session/presence');
const { produce } = require('immer');

function startPresenceLoop() {
  setInterval(() => {
    const now = Date.now();

    Object.values(sessions).forEach(session => {
      let changed = false;

      const updatedState = produce(session.state, draft => {
        if (draft.status !== SessionStatuses.ACTIVE) return
        if (applyPresenceRules(draft, now, INACTIVE_TIMEOUT)) changed = true;
      });

      if (changed) commitSessionState(session, updatedState);
    });
  }, CHECK_INTERVAL);
}

module.exports = { startPresenceLoop };
