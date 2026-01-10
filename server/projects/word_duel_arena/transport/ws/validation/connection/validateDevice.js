function validateDeviceConnection(session, deviceId) {
    const { player1, player2 } = session.state?.players ?? {};
    
    const isKnownDevice =
        player1?.deviceId === deviceId ||
        player2?.deviceId === deviceId
    
    const hasFreeSeat = !player1 || !player2

    if (!isKnownDevice && !hasFreeSeat) {
        return {
            allowed: false,
            reason: 'SESSION_FULL',
            message: 'This session has reached the maximum number of players and cannot accept new connections.'
        }
    }
    
    return { allowed: true }
}

module.exports = { validateDeviceConnection }