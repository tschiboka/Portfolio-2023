const { WebSocketServer } = require("ws")
const url = require("url")

module.exports = function initWebSocket(server) {
  const wss = new WebSocketServer({ server })
  const sessions = {}

  wss.on("connection", (ws, req) => {
    const { sessionId } = url.parse(req.url, true).query

    if (!sessionId) {
      ws.close()
      return
    }

    // Create session if missing
    if (!sessions[sessionId]) {
      sessions[sessionId] = {
        state: { counter: 0 },
        connections: new Set(),
      }
    }

    const session = sessions[sessionId]
    session.connections.add(ws)

    console.log("Connected to session:", sessionId)

    // 1️⃣ Send current state immediately
    ws.send(
      JSON.stringify({
        type: "state_update",
        payload: session.state,
      })
    )

    ws.on("message", (raw) => {
      const msg = JSON.parse(raw.toString())

      if (msg.type === "ping") {
        session.state.counter += 1
      }

      const update = JSON.stringify({
        type: "state_update",
        payload: session.state,
      })

      for (const client of session.connections) {
        if (client.readyState === client.OPEN) {
          client.send(update)
        }
      }
    })

    ws.on("close", () => {
      session.connections.delete(ws)

      if (session.connections.size === 0) {
        delete sessions[sessionId]
      }

      console.log("Disconnected from session:", sessionId)
    })
  })
}
