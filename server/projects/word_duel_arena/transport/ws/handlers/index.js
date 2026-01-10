const { moveHandler } = require('./move');
const { joinHandler } = require('./join');

function routeMessage(type, ctx) {
  switch (type) {
    case 'join':
      return joinHandler(ctx);

    case 'attempt_move':
      return moveHandler(ctx);

    default:
      console.warn('Unknown message type:', type);
      return false;
  }
}

module.exports = routeMessage;