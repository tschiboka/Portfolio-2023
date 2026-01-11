const { initialiseSession } = require('../../../domain/session/session');
const { initialiseLevel } = require('../../../domain/session/level');
const { commitSessionState } = require('../broadcast');

async function joinHandler({ session, deviceId }) {
  const nextStateSessionInit = initialiseSession(session.state, deviceId);
  const nextStateLevelInit = await initialiseLevel(nextStateSessionInit, deviceId);
  commitSessionState(session, nextStateLevelInit, deviceId);
}

module.exports = { joinHandler };
