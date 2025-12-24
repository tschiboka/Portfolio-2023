const SessionStatuses = {
  LOBBY: "LOBBY",
  ACTIVE: "ACTIVE",
  ENDED: "ENDED",
};

const PlayerDerivedStatus = {
  ACTIVE: "ACTIVE",
  IDLE: "IDLE",
  OFFLINE: "OFFLINE",
  RESIGNED: "RESIGNED",
  PAUSED: "PAUSED",
};

const CHECK_INTERVAL = 5_000;
const INACTIVE_TIMEOUT = 30_000;

module.exports = {
  SessionStatuses,
  PlayerDerivedStatus,
  CHECK_INTERVAL,
  INACTIVE_TIMEOUT,
};
