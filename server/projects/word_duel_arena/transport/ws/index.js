const { WebSocketServer } = require('ws');
const url = require('url');
const { startPresenceLoop } = require('../../infrastructure/presence/loop');
const { validateDeviceConnection } = require('./validation/connection/validateDevice');
const routeMessage = require('./handlers');
const { getSession, cleanupSessionIfEmpty } = require('../../infrastructure/persistence/server/session');
const { loadWordResources } = require('../../infrastructure/resources/word');

module.exports = async function initWebSocket(server) {
  const wss = new WebSocketServer({ server });
  await loadWordResources();

  startPresenceLoop();

  wss.on('connection', async (ws, req) => {
    const { sessionId, deviceId } = url.parse(req.url, true).query;

    if (!sessionId || !deviceId) {
      ws.close(1008, 'Missing sessionId or deviceId');
      return;
    }

    const session = getSession(sessionId);
    const { allowed, reason, message } = validateDeviceConnection(session, deviceId);

    if (!allowed) {
      ws.send(JSON.stringify({ type: 'error', message }));
      setTimeout(() => ws.close(4001, reason), 0);
      return;
    }

    ws.sessionId = sessionId;
    ws.deviceId = deviceId;
    session.connections.add(ws);

    await routeMessage('join', { session, deviceId });

    ws.on('message', async (msg) => {
      const message = JSON.parse(msg);
      await routeMessage(message.type, {
        session,
        deviceId: ws.deviceId,
        payload: message.payload,
      });
    });

    ws.on('close', () => {
      session.connections.delete(ws);
      cleanupSessionIfEmpty(sessionId);
    });
  });
};
