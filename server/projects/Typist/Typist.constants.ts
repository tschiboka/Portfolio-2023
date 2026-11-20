/** Temporarily hard-coded user settings. */
export const TypistConstants = {
    userSettings: {
        practiceMode: 'error', // "target" for letters and error for calculating the combinations
        difficulty: 80, // Cut off frequency percentile below for word selection
        avgWordLength: 5, // Average word length to target for selection
        textLength: 20, // Target total text length in words for a round
        targetLetter: 'A', // Only one letter to use in the words, empty for no restriction
        errorCombinations: ['TA'], // Only words containing this combination, empty for no restriction
        allowCapitalLetters: 0, // Percentage of words allowed to have capital letters
    },
    /** Score normalisation — a word is five characters, a minute 60,000 ms. */
    scoring: {
        charsPerWord: 5,
        msPerMinute: 60000,
        /** One decimal place, as ×10 then ÷10. */
        oneDecimal: 10,
        /** A ratio as a percent carrying one decimal place, as ×1000 then ÷10. */
        percentWithOneDecimal: 1000,
        /** The final score is reported on a 1000 scale. */
        scoreScale: 1000,
    },
} as const
