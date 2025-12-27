export type PlayerRole = 'player1' | 'player2' | null
export type DerivedSessionState = {
  me?: PlayerRole
  opponent?: PlayerRole
  meData?: Player
  opponentData?: Player
  completeSessionState?: WebSocketSessionState
}

export type SessionContextType = {
    sessionId: string
    deviceId: string
    allowKeyboardInput?: boolean
    derivedState?: DerivedSessionState
    setSessionState: (state: WebSocketSessionState) => void
}



// Client can send a variety of request types
export enum WebSocketRequestType {
    PING = "ping",
    ATTEMPT_MOVE = "attempt_move"
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

export type WebSocketSessionState = {
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

export type WebSocketResponse = { type: WebSocketResponseType; payload?: WebSocketSessionState }
export type WebSocketRequest =
  | { type: WebSocketRequestType.PING }
  | {
      type: WebSocketRequestType.ATTEMPT_MOVE
      payload: {
        attempt: string
      }
    }


export type WebSocketContextType = {
    send: (msg: WebSocketRequest) => void
    lastState?: WebSocketResponse
    readyState: number
}

