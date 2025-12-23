export type SessionContextType = {
    sessionId: string
    deviceId: string
}

// Client can send a variety of request types
export enum WebSocketRequestType {
    PING = "ping",
    MOVE = "move"
}

// Server will only respond with state updates
export enum WebSocketResponseType {
    STATE_UPDATE = "state_update"  
}

export type WebSocketResponsePayload = {
    counter: number
}

export type WebSocketResponse = { type: WebSocketResponseType; payload?: WebSocketResponsePayload }
export type WebSocketRequest =
  | { type: WebSocketRequestType.PING }
  | {
      type: WebSocketRequestType.MOVE
      payload: {
        move: string
      }
    }


export type WebSocketContextType = {
    send: (msg: WebSocketRequest) => void
    lastMessage?: WebSocketResponse
    readyState: number
}

