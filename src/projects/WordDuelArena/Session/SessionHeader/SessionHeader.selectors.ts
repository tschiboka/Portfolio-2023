import {
    LastWordAttempt,
    PlayableLevelWord,
    PlayerRole,
    WebSocketSessionState,
} from '../Session.types'

type GetCharClassProps = {
    attempt?: LastWordAttempt
    sessionState: WebSocketSessionState
}

export const getCharClass = ({ attempt, sessionState }: GetCharClassProps) => {
    if (!attempt) return 'last-attempt-char'
    if (attempt.isTarget) return 'last-attempt-char target'
    if (attempt.isExtra) return 'last-attempt-char extra'

    // Check if the word was already found by someone
    const { level } = sessionState
    const targetWords = level?.targetWords || []
    const extraWords = level?.extraWords || []
    const isFound = (word: PlayableLevelWord) =>
        word.status === 'SOLVED' && word.word === attempt.word

    const foundInTarget = targetWords.find(isFound)
    const foundInExtra = extraWords.find(isFound)

    if (foundInTarget || foundInExtra) return 'last-attempt-char found'

    return 'last-attempt-char invalid'
}

type GetWordCountsProps = {
    sessionState: WebSocketSessionState
}
export const getHeaderInfo = ({ sessionState }: GetWordCountsProps) => {
    if (!sessionState?.players || !sessionState.role) return null

    const { role } = sessionState
    const opponentRole = role === 'player1' ? 'player2' : 'player1'

    const getPoints = (playerRole: PlayerRole) =>
        sessionState.currentMatch?.perPlayerStatus[playerRole]?.points || 0
    const playerPoints = getPoints(role)
    const opponentPoints = getPoints(opponentRole)

    const { level } = sessionState || {}
    const targetWords = level?.targetWords || []
    const extraWords = level?.extraWords || []

    const totalPoints = playerPoints + opponentPoints
    const playerPercentage =
        totalPoints > 0 ? (playerPoints / totalPoints) * 100 : 50
    const opponentPercentage =
        totalPoints > 0 ? (opponentPoints / totalPoints) * 100 : 50

    const getWords = (words: PlayableLevelWord[], playerRole: PlayerRole) =>
        words.filter(
            (word) => word.status === 'SOLVED' && word.solvedBy === playerRole,
        ).length

    const playerTargetWords = getWords(targetWords, role)
    const playerExtraWords = getWords(extraWords, role)
    const opponentTargetWords = getWords(targetWords, opponentRole)
    const opponentExtraWords = getWords(extraWords, opponentRole)

    return {
        player: {
            points: playerPoints,
            targetWords: playerTargetWords,
            extraWords: playerExtraWords,
            percentage: playerPercentage,
        },
        opponent: {
            points: opponentPoints,
            targetWords: opponentTargetWords,
            extraWords: opponentExtraWords,
            percentage: opponentPercentage,
        },
    }
}

export const getLastAttempt = (sessionState: WebSocketSessionState) => {
    const { role } = sessionState
    if (!role) return { player: undefined, opponent: undefined }

    const opponentRole = role === 'player1' ? 'player2' : 'player1'
    const getLastword = (playerRole: PlayerRole) =>
        sessionState.currentMatch?.perPlayerStatus[playerRole]?.lastWordAttempt

    const player = getLastword(role)
    const opponent = getLastword(opponentRole)

    return { player, opponent }
}
