const { calculatePoints } = require('./points');

function getSolutionState(draft, deviceId, payload) {
    console.log('Getting solution state...');
    console.log("Payload:", payload);
    
    const playerKey = draft.players.player1.deviceId === deviceId 
    ? 'player1' : draft.players.player2.deviceId === deviceId 
    ? 'player2' : undefined;        

    // TODO: Handle case where deviceId is not associated with any player
    if (!playerKey) {
        console.log("Device not associated with any player.");
        return;
    }
    
    // Find the target word and mark it as solved if found
    const targetWords = draft.level.targetWords;
    const targetWord = targetWords.find(w => w.word === payload.attempt);
    if (targetWord && targetWord.status === 'UNSOLVED') {
        targetWord.status = 'SOLVED';
        targetWord.solvedBy = playerKey;
        
        const player = draft.currentMatch.perPlayerStatus[playerKey];
        player.points += calculatePoints(payload.attempt, true);
        return;
    }

    // Check if the attempt is an extra word
    const extraWords = draft.level.extraWords;
    const extraWord = extraWords.find(w => w.word === payload.attempt);
    if (extraWord && extraWord.status === 'UNSOLVED') {
        extraWord.status = 'SOLVED';
        extraWord.solvedBy = playerKey;
        
        const player = draft.currentMatch.perPlayerStatus[playerKey];
        player.points += calculatePoints(payload.attempt, false);

    }
}

module.exports = { getSolutionState };