const CHECK_INTERVAL = 5_000;
const INACTIVE_TIMEOUT = 30_000;

const SessionStatuses = {
    LOBBY: "LOBBY",
    ACTIVE: "ACTIVE",
    ENDED: "ENDED",
};

module.exports = {
    SessionStatuses,
    CHECK_INTERVAL,
    INACTIVE_TIMEOUT,
};