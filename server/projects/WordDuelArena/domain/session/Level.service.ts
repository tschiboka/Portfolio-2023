import type { SessionState, Level, LevelWord } from '../../WordDuelArena.types'
import { isDefined } from '@common-utils'
import { Arrays } from '@common-utils'
import { produce } from 'immer'
import { levelPersistance } from '../../infrastructure/persistence/db/Level.repository'
import { LevelWordStatuses } from '../../config/constants/Game.constants'
import { getWordResources } from '../../infrastructure/resources/Word.repository'
import { getInitialMatchState } from './Match.service'

type DbLevel = {
    _id: { toString(): string }
    name: string
    difficulty: number
    targetWords: string[]
}

async function initialiseLevel(state: SessionState): Promise<SessionState> {
    const hasTwoPlayers = Boolean(state.players.player1) && Boolean(state.players.player2)
    const hasLevelAssigned = isDefined(state.level)
    const shouldInitialiseLevel = hasTwoPlayers && !hasLevelAssigned

    if (!shouldInitialiseLevel) return state

    const levelFromDb = await levelPersistance.findLevelForSession()
    if (!levelFromDb) return state
    const level = transformLevelFromDb(levelFromDb)

    return produce(state, (draft: SessionState) => {
        draft.level = level
        draft.currentMatch = getInitialMatchState()
    })
}

const transformLevelWord = (word: string): LevelWord => ({
    status: LevelWordStatuses.UNSOLVED,
    mask: '*'.repeat(word.length),
    word: word,
    hintIndices: [],
    solvedBy: null,
})

function getPossibleAnagrams(letters: string): string[] {
    const results = new Set<string>()

    function helper(path: string, remaining: string) {
        if (path.length >= 3) {
            results.add(path.split('').sort().join(''))
        }

        for (let i = 0; i < remaining.length; i++) {
            helper(path + remaining[i], remaining.slice(i + 1))
        }
    }

    helper('', letters.split('').join(''))
    return Array.from(results).map((anagram) => anagram.toUpperCase())
}

const getExtraWords = (levelName: string, targetWords: string[]): string[] => {
    const resources = getWordResources()
    if (!resources) return []
    const { anagramMap } = resources
    if (!anagramMap) return []

    const anagrams = getPossibleAnagrams(levelName)
    const allPossibleWords = anagrams.flatMap((a: string) => anagramMap[a] ?? [])
    const uniqueWords = Arrays.unique(allPossibleWords)

    const targetWordSet = new Set(targetWords)
    return uniqueWords.filter((word: string) => !targetWordSet.has(word))
}

const transformLevelFromDb = (level: DbLevel): Level => ({
    id: level._id.toString(),
    name: level.name,
    difficulty: level.difficulty,
    targetWords: level.targetWords.map(transformLevelWord),
    extraWords: getExtraWords(level.name, level.targetWords).map(transformLevelWord),
})

export { initialiseLevel }
