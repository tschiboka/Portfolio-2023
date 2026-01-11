const { moveHandler } = require('./move');
const { joinHandler } = require('./join');

async function routeMessage(type, ctx) {
  switch (type) {
    case 'join':
      return await joinHandler(ctx);

    case 'attempt_move':
      return moveHandler(ctx);

    default:
      console.warn('Unknown message type:', type);
      return false;
  }
}

module.exports = routeMessage;