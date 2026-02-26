import express, { Request, Response } from 'express'
import { loadWordResources } from '../word_duel_arena/infrastructure/resources/word'
const router = express.Router()

interface Keystroke {
    charIndex: number
    expected: string
    correct: boolean
    timestamp: number
}

// WARNING: Temporarily use a hard-coded user settings
const userSettings = {
    practiceMode: 'error', // "target" for letters and error for calculating the combinations
    difficulty: 80, // Cut off frequency percentile below for word selection
    avgWordLength: 5, // Average word length to target for selection
    textLength: 20, // Target total text length in words for a round
    targetLetter: 'A', // Only one letter to use in the words, empty for no restriction
    errorCombinations: ['TA'], // Only words containing this combination, empty for no restriction
    allowCapitalLetters: 0, // Percentage of words allowed to have capital letters
}

router.post('/round', [], async (req: Request, res: Response) => {
    const { keystrokes }: { keystrokes: Keystroke[] } = req.body ?? {}

    // TODO: Extract the whole logic into designated service functions and clean up the route handler to just call those functions and return the response Calculate the error combination if practice mode is set to error
    let errorCombinations: string[] = []
    if (userSettings.practiceMode === 'error') {
        const seenErrorAtIndex = new Set<number>()
        errorCombinations = keystrokes
            .map((keystroke: Keystroke) => {
                if (!keystroke.correct && !seenErrorAtIndex.has(keystroke.charIndex)) {
                    seenErrorAtIndex.add(keystroke.charIndex)
                    // Look up the expected char at the previous text position,
                    // not the previous keystroke in the array (which may be
                    // another failed attempt at the same charIndex).
                    const previousChar =
                        keystrokes.find((k: Keystroke) => k.charIndex === keystroke.charIndex - 1)
                            ?.expected ?? ''

                    // Trim in case previousChar is empty (for errors at the start of the text)
                    return (previousChar + keystroke.expected).trim()
                }
            })
            .filter(Boolean) as string[]
    }

    const uniqueErrorCombinations = [...new Set(errorCombinations)]
    console.log('error combination', uniqueErrorCombinations)

    const { frequency } = await loadWordResources()
    const words = Object.keys(frequency)
    const hasTargetFilteringCriteria =
        userSettings.targetLetter || uniqueErrorCombinations.length > 0

    // Pre-compute the frequency cutoff value at the difficulty percentile
    const sortedFrequencies = Object.values(frequency).sort((a: number, b: number) => a - b)
    const cutoffIndex = Math.floor((userSettings.difficulty / 100) * sortedFrequencies.length)
    const cutoffValue = sortedFrequencies[cutoffIndex] ?? 0

    const filteredByDifficulty = words.filter((word: string) => frequency[word] >= cutoffValue)

    // Handle target letter/combination filtering
    const filteredWords = hasTargetFilteringCriteria
        ? filteredByDifficulty.filter((word: string) => {
              // NOTE: Address them separately in case we want to allow users to set one of them without the other in the future, even though currently they are both tied to practiceMode
              //   const meetsLetterCriteria = userSettings.targetLetter
              //       ? word.includes(userSettings.targetLetter)
              //       : true
              const meetsCombinationCriteria =
                  uniqueErrorCombinations.length > 0
                      ? uniqueErrorCombinations.some((combination: string) =>
                            word.toLowerCase().includes(combination.toLowerCase()),
                        )
                      : true
              return meetsCombinationCriteria
          })
        : filteredByDifficulty

    // Fall back to difficulty-filtered words if combination filter yields nothing
    const wordPool = filteredWords.length > 0 ? filteredWords : filteredByDifficulty

    // Get random words from the filtered list until we reach the target text length
    let responseWords = Array.from({ length: userSettings.textLength }, () => {
        const randomIndex = Math.floor(Math.random() * wordPool.length)
        return wordPool[randomIndex]
    })

    // Capitalisation
    if (!userSettings.allowCapitalLetters) {
        responseWords = responseWords.map((word: string) => word.toLowerCase())
    }

    const calculateSpeed = () => {
        const firstTime = keystrokes[0]?.timestamp
        const lastTime = keystrokes[keystrokes.length - 1]?.timestamp
        if (!firstTime || !lastTime) return { wpm: 0, cpm: 0 }

        const totalMins = (lastTime - firstTime) / 60000
        const totalCharsTyped = keystrokes.filter((k: Keystroke) => k.correct).length

        return {
            wpm: Math.round((totalCharsTyped / 5 / totalMins) * 10) / 10,
            cpm: Math.round((totalCharsTyped / totalMins) * 10) / 10,
        }
    }

    const calculateAccuracy = () => {
        const totalTyped = keystrokes.length
        const totalErrors = keystrokes.filter((k: Keystroke) => !k.correct).length
        return totalTyped > 0
            ? Math.round(((totalTyped - totalErrors) / totalTyped) * 1000) / 10
            : 0
    }

    const calculateScore = () => {
        const accuracy = calculateAccuracy()
        const { wpm } = calculateSpeed()

        const accuracyScore = accuracy / 100 // 0–1
        const uniqueChars = new Set(keystrokes.map((k: Keystroke) => k.expected))

        // WARNING: this value must be always in sync with FE
        // 26 lowercase + 26 uppercase + 10 digits + 12 punctuation (.!?,;:-'"@&()) + space
        const MAX_EXPECTED_UNIQUE = 75
        const varietyScore = Math.min(uniqueChars.size / MAX_EXPECTED_UNIQUE, 1)

        // Factor 3: Derived from settings: words × (avg word length + 1 for space separator)
        const MAX_TEXT_LENGTH = 100 * 5
        const textLength = keystrokes.filter((k: Keystroke) => k.correct).length
        const lengthScore = Math.min(textLength / MAX_TEXT_LENGTH, 1)

        // Factor 4: Speed in WPM (weight 0.15)
        const MAX_WPM = 150 // WPM ceiling for score normalisation (professional typist benchmark)
        const speedScore = Math.min(wpm / MAX_WPM, 1)

        const WEIGHT = {
            Accuracy: 0.35,
            Variety: 0.2,
            Length: 0.15,
            Speed: 0.3,
        }

        const weighted =
            WEIGHT.Accuracy * accuracyScore +
            WEIGHT.Variety * varietyScore +
            WEIGHT.Length * lengthScore +
            WEIGHT.Speed * speedScore

        return Math.round(weighted * 1000)
    }

    res.status(200).json({
        text: responseWords.join(' '),
        stats: {
            practiceMode: userSettings.practiceMode,
            errorCombinations: uniqueErrorCombinations,
            speed: calculateSpeed(),
            accuracy: calculateAccuracy(),
            score: calculateScore(),
        },
    })
})

export default router
