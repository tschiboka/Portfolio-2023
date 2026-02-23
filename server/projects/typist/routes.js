const express = require('express')
const router = express.Router()
const {
    loadWordResources,
} = require('../word_duel_arena/infrastructure/resources/word')

// WARNING: Temporarily use a hard-coded user settings
const userSettings = {
    practiceMode: 'error', // "target" for letters and error for calculating the combinations
    difficulty: 80, // Cut off frequency percentile below for word selection
    avgWordLength: 5, // Average word length to target for selection
    textLength: 5, // Target total text length in words for a round
    targetLetter: 'A', // Only one letter to use in the words, empty for no restriction
    errorCombinations: ['TA'], // Only words containing this combination, empty for no restriction
    allowCapitalLetters: 0, // Percentage of words allowed to have capital letters
}

router.post('/round', [], async (req, res) => {
    const { keystrokes } = req.body ?? {}

    // TODO: Extract the whole logic into designated service functions and clean up the route handler to just call those functions and return the response Calculate the error combination if practice mode is set to error
    let errorCombinations = []
    if (userSettings.practiceMode === 'error') {
        const seenErrorAtIndex = new Set()
        errorCombinations = keystrokes
            .map((keystroke) => {
                if (
                    !keystroke.correct &&
                    !seenErrorAtIndex.has(keystroke.charIndex)
                ) {
                    seenErrorAtIndex.add(keystroke.charIndex)
                    // Look up the expected char at the previous text position,
                    // not the previous keystroke in the array (which may be
                    // another failed attempt at the same charIndex).
                    const previousChar =
                        keystrokes.find(
                            (k) => k.charIndex === keystroke.charIndex - 1,
                        )?.expected ?? ''

                    // Trim in case previousChar is empty (for errors at the start of the text)
                    return (previousChar + keystroke.expected).trim()
                }
            })
            .filter(Boolean)
    }

    const uniqueErrorCombinations = [...new Set(errorCombinations)]
    console.log('error combination', uniqueErrorCombinations)

    const { frequency } = await loadWordResources()
    const words = Object.keys(frequency)
    const hasTargetFilteringCriteria =
        userSettings.targetLetter || uniqueErrorCombinations.length > 0

    // Pre-compute the frequency cutoff value at the difficulty percentile
    const sortedFrequencies = Object.values(frequency).sort((a, b) => a - b)
    const cutoffIndex = Math.floor(
        (userSettings.difficulty / 100) * sortedFrequencies.length,
    )
    const cutoffValue = sortedFrequencies[cutoffIndex] ?? 0

    const filteredByDifficulty = words.filter(
        (word) => frequency[word] >= cutoffValue,
    )

    // Handle target letter/combination filtering
    const filteredWords = hasTargetFilteringCriteria
        ? filteredByDifficulty.filter((word) => {
              // NOTE: Address them separately in case we want to allow users to set one of them without the other in the future, even though currently they are both tied to practiceMode
              //   const meetsLetterCriteria = userSettings.targetLetter
              //       ? word.includes(userSettings.targetLetter)
              //       : true
              const meetsCombinationCriteria =
                  uniqueErrorCombinations.length > 0
                      ? uniqueErrorCombinations.some((combination) =>
                            word
                                .toLowerCase()
                                .includes(combination.toLowerCase()),
                        )
                      : true
              return meetsCombinationCriteria
          })
        : filteredByDifficulty

    // Fall back to difficulty-filtered words if combination filter yields nothing
    const wordPool =
        filteredWords.length > 0 ? filteredWords : filteredByDifficulty

    // Get random words from the filtered list until we reach the target text length
    let responseWords = Array.from({ length: userSettings.textLength }, () => {
        const randomIndex = Math.floor(Math.random() * wordPool.length)
        return wordPool[randomIndex]
    })

    // Capitalisation
    if (!userSettings.allowCapitalLetters) {
        responseWords = responseWords.map((word) => word.toLowerCase())
    }

    res.status(200).json({
        text: responseWords.join(' '),
        stats: {
            practiceMode: userSettings.practiceMode,
            errorCombinations: uniqueErrorCombinations,
        },
    })
})

module.exports = router
