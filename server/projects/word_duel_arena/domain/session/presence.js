function applyPresenceRules(sessionState, now, inactiveTimeout) {
  let changed = false;

  ['player1', 'player2'].forEach(seatKey => {
    const player = sessionState.players[seatKey];
    if (!player || !player.connected) return;

    if (now - player.lastActive > inactiveTimeout) {
      player.connected = false;
      changed = true;
    }
  });

  return changed;
}

module.exports = { applyPresenceRules };
