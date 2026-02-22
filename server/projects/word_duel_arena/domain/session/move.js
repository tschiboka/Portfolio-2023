const { calculatePoints } = require('./points')

function getSolutionState(draft, deviceId, payload) {
    const playerKey =
        draft.players.player1.deviceId === deviceId
            ? 'player1'
            : draft.players.player2.deviceId === deviceId
              ? 'player2'
              : undefined

    // TODO: Handle case where deviceId is not associated with any player
    if (!playerKey) {
        console.log('Device not associated with any player.')
        return
    }

    // Find the target word and mark it as solved if found
    const targetWords = draft.level.targetWords
    const targetWord = targetWords.find((w) => w.word === payload.attempt)
    if (targetWord && targetWord.status === 'UNSOLVED') {
        targetWord.status = 'SOLVED'
        targetWord.solvedBy = playerKey

        const player = draft.currentMatch.perPlayerStatus[playerKey]
        player.points += calculatePoints(payload.attempt, true)
        player.lastWordAttempt = {
            word: payload.attempt,
            isTarget: true,
            isExtra: false,
        }
        return
    }

    // Check if the attempt is an extra word
    const extraWords = draft.level.extraWords
    const extraWord = extraWords.find((w) => w.word === payload.attempt)
    if (extraWord && extraWord.status === 'UNSOLVED') {
        extraWord.status = 'SOLVED'
        extraWord.solvedBy = playerKey

        const player = draft.currentMatch.perPlayerStatus[playerKey]
        player.points += calculatePoints(payload.attempt, false)
        player.lastWordAttempt = {
            word: payload.attempt,
            isTarget: false,
            isExtra: true,
        }
        return
    }

    // If the word is neither a target nor an extra word, still track the attempt
    const player = draft.currentMatch.perPlayerStatus[playerKey]
    player.lastWordAttempt = {
        word: payload.attempt,
        isTarget: false,
        isExtra: false,
    }
}

module.exports = { getSolutionState }
