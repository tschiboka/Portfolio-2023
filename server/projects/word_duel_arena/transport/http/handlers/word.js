const { getWordResources } = require('../../../infrastructure/resources/word');
async function handleGetWordList(_, res) {
    const { wordList }  = getWordResources();
    if (!wordList) return res.status(503).json({ message: "Could not load resource: wordList" });
  
    res.json(wordList);
}

async function handleGetAnagramMap(_, res) {
    const { anagramMap } = getWordResources();
    if (!anagramMap) return res.status(503).json({ message: "Could not load resource: anagramMap" });
  
    res.json(anagramMap);
}

async function handleGetFrequencies(_, res) {
    const { frequency } = getWordResources();
    if (!frequency) return res.status(503).json({ message: "Could not load resource: frequency" });
  
    res.json(frequency);
}

module.exports = { handleGetWordList, handleGetAnagramMap, handleGetFrequencies };