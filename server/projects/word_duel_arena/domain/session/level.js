const { produce } = require('immer');
const { levelPersistance } = require('../../infrastructure/persistence/db/level');
const { LevelWordStatuses } = require('../../config/constants/game');
const { getWordResources } = require('../../infrastructure/resources/word');

async function initialiseLevel(state, deviceId) {
    const hasTwoPlayers = Boolean(state.players.player1) && Boolean(state.players.player2);
    const hasLevelAssigned = state.level !== null && state.level !== undefined;
    const shouldInitialiseLevel = hasTwoPlayers && !hasLevelAssigned;

    if (!shouldInitialiseLevel) return state;
    
    const levelFromDb = await levelPersistance.findLevelForSession(state);
    const level = transformLevelFromDb(levelFromDb);
    return produce(state, draft => { draft.level = level });
}

const transformLevelWord = (word) => ({
    status: LevelWordStatuses.UNSOLVED,
    mask: '*'.repeat(word.length),
    word: word,
})

function getPossibleAnagrams(letters) {
    const results = new Set();

    function helper(path, remaining) {
        if (path.length >= 3) {
            results.add(path.split("").sort().join(""));
        }

        for (let i = 0; i < remaining.length; i++) {
            helper(path + remaining[i], remaining.slice(i + 1));
        }
    }

    helper("", letters.split(""));
    return Array.from(results).map(anagram => anagram.toUpperCase());
}

const getExtraWords = (levelName, targetWords) => {
    const { anagramMap } = getWordResources();
    if (!anagramMap) return [];
    
    const anagrams = getPossibleAnagrams(levelName);
    const allPossibleWords = anagrams.flatMap(a => anagramMap[a] ?? []);
    const uniqueWords = Array.from(new Set(allPossibleWords));
    
    const targetWordSet = new Set(targetWords);
    return uniqueWords.filter(word => !targetWordSet.has(word));
} 

const transformLevelFromDb = (level) => ({
    id: level._id.toString(),
    name: level.name,
    difficulty: level.difficulty,
    targetWords: level.targetWords.map(transformLevelWord),
    extraWords: getExtraWords(level.name, level.targetWords).map(transformLevelWord),
})

module.exports = {
    initialiseLevel
}
