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

export enum SessionStatuses {
    LOBBY = 'LOBBY',
    ACTIVE = 'ACTIVE',
}

export enum MatchStatuses {
    WAITING = 'WAITING',
    ACTIVE = 'ACTIVE',
    FINISHED = 'FINISHED',
}

export enum PlayerDerivedStatus {
    ACTIVE = 'ACTIVE',
    IDLE = 'IDLE',
    OFFLINE = 'OFFLINE',
    RESIGNED = 'RESIGNED',
    PAUSED = 'PAUSED',
}

export type Player = {
    deviceId: string;
    lastActive: number;
    connected: boolean;
};

export type MatchPlayerStatus = {
    derivedStatus: PlayerDerivedStatus;
    resigned: boolean;
    paused: boolean;
}

export type Match = {
  id: string;
  status: MatchStatuses;
  perPlayerStatus: {
    player1: MatchPlayerStatus;
    player2: MatchPlayerStatus;
  };
  moves: any[]; // Replace `any` with your move type
  winner: 'player1' | 'player2' | null;
  reason: 'RESIGN' | 'TIMEOUT' | 'DRAW' | null;
};

export type SessionState = {
  id: string;
  status: SessionStatuses;
  players: {
    player1: Player;
    player2: Player;
  };
  currentMatch: Match;
  previousMatches: Match[];
  connections: Set<WebSocket>;
}

export type WebSocketResponse = { type: WebSocketResponseType; payload?: SessionState }
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

