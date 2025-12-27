const { moveHandler } = require('./move');

function routeMessage(session, ws, msg) {
  switch (msg.type) {
    case 'attempt_move':
      moveHandler(session, ws, msg.payload);
      break;
    default:
      console.warn('Unknown message type:', msg.type);
  }
}

module.exports = routeMessage;
