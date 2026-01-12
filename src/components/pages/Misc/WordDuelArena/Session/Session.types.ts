export type PlayerRole = 'player1' | 'player2' | null

export type SessionContextType = {
    sessionId: string
    deviceId: string
    allowKeyboardInput: boolean
    sessionState?: WebSocketSessionState
    setSessionState: (state: WebSocketSessionState) => void
}

export enum WebSocketRequestType {
    PING = "ping",
    ATTEMPT_MOVE = "attempt_move"
}

export enum WebSocketResponseType {
    STATE_UPDATE = "state_update",
    ERROR = "error"
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
  winner: 'player1' | 'player2' | null;
  reason: 'RESIGN' | 'TIMEOUT' | 'DRAW' | null;
};

export type WebSocketSessionState = {
  id: string;
  role?: PlayerRole;
  status: SessionStatuses;
  players?: {
    player1?: Player;
    player2?: Player;
  };
  level?: Level;
  currentMatch?: Match;
  previousMatches?: Match[];
}

export type WebSocketResponse = { type: WebSocketResponseType; payload?: WebSocketSessionState; message: string }
export type WebSocketRequest =
  | { type: WebSocketRequestType.PING }
  | {
      type: WebSocketRequestType.ATTEMPT_MOVE
      payload: {
        attempt: string
      }
    }


export type WebSocketContextType = {
  lastState?: WebSocketResponse
  readyState: number
  errorMessage: string | null
  connect: () => void
  send: (msg: WebSocketRequest) => void
}

export type UnsolvedLevelWord = {
  status: "UNSOLVED";
  mask: string;
  solvedBy: PlayerRole | null;
}

export type SolvedLevelWord = {
  status: "SOLVED";
  word: string;
  solvedBy: PlayerRole | null;
}

export type PlayableLevelWord = SolvedLevelWord | UnsolvedLevelWord;

export type Level = {
  id: string;
  name: string;
  difficulty: number;
  targetWords: PlayableLevelWord[];
  extraWords: PlayableLevelWord[];
}

export type LevelWordStatus = PlayableLevelWord['status']
