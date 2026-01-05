const { WebSocketServer } = require('ws');
const url = require('url');
const { getSession, cleanupSessionIfEmpty, initialiseSession, markAlive } = require('./sessions');
const { commitSessionState } = require('./broadcast');
const routeMessage = require('./handlers');
const { startPresenceLoop } = require('./presenceLoop');
const { getLevel } = require('./level');

module.exports = function initWebSocket(server) {
  const wss = new WebSocketServer({ server });
  startPresenceLoop();

  wss.on('connection', (ws, req) => {
    const { sessionId, deviceId } = url.parse(req.url, true).query
    if (!sessionId || !deviceId) {
        ws.close(1008, 'Missing sessionId or deviceId')
        return
    }

    const session = getSession(sessionId)

    const { player1, player2 } = session.state.players

    const isKnownDevice =
        player1?.deviceId === deviceId ||
        player2?.deviceId === deviceId

    const hasFreeSeat = !player1 || !player2

    if (!isKnownDevice && !hasFreeSeat) {
        ws.send(JSON.stringify({
          type: 'error',
          message: 'This session is full.'
        }));

        setTimeout(() => ws.close(4001, 'SESSION_FULL'), 0);
        return
    }

    ws.sessionId = sessionId
    ws.deviceId = deviceId
    session.connections.add(ws)

    commitSessionState(session, initialiseSession(session, deviceId))

    ws.on('message', (raw) => {
        let msg;
        try {
            msg = JSON.parse(raw.toString());
        } catch {
            console.warn('Invalid message', raw.toString());
            return;
        }

        const didStateChange = routeMessage(session, ws, msg);

        if (didStateChange) {
            commitSessionState(session, session.state);
        }
    });

    ws.on('close', () => {
      session.connections.delete(ws);
      cleanupSessionIfEmpty(sessionId);
    });
  });
};
