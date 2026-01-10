const { initialiseSession } = require('../../../domain/session/session');
const { commitSessionState } = require('../broadcast');

function joinHandler({ session, deviceId }) {
  const nextState = initialiseSession(session.state, deviceId);
  commitSessionState(session, nextState, deviceId);
}

module.exports = { joinHandler };
