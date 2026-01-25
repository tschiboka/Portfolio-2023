const { produce } = require('immer');
const { commitSessionState } = require('../broadcast');
const { markAliveByDevice } = require('../../../domain/session/session');
const { SessionStatuses } = require('../../../config/constants/session');
const { getSolutionState } = require('../../../domain/session/move');

const moveHandler = ({ session, deviceId, payload }) => {
  const nextState = produce(session.state, (draft) => {
    markAliveByDevice(draft, deviceId);
    handleMove(draft, deviceId, payload);
  });

  commitSessionState(session, nextState);
};

function handleMove(draft, deviceId, payload) {
  if (draft.status !== SessionStatuses.ACTIVE) return;
  console.log(
    `Handling move for device: ${deviceId} with move: ${payload.attempt}`
  );
    getSolutionState(draft, deviceId, payload)
}

module.exports = { moveHandler };
