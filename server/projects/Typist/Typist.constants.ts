// WARNING: Temporarily use a hard-coded user settings
export const TypistUserSettings = {
    practiceMode: 'error', // "target" for letters and error for calculating the combinations
    difficulty: 80, // Cut off frequency percentile below for word selection
    avgWordLength: 5, // Average word length to target for selection
    textLength: 20, // Target total text length in words for a round
    targetLetter: 'A', // Only one letter to use in the words, empty for no restriction
    errorCombinations: ['TA'], // Only words containing this combination, empty for no restriction
    allowCapitalLetters: 0, // Percentage of words allowed to have capital letters
} as const
