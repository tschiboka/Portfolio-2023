// Shared types for the Typist project

export type Keystroke = {
    charIndex: number
    expected: string
    actual?: string // FE tracks the actual key pressed; BE does not need it
    correct: boolean
    timestamp: number
}

export type TypingStats = {
    errorCombinations?: string[]
    practiceMode: 'error' | 'target'
    speed?: {
        wpm: number
        cpm: number
    }
    accuracy?: number
    score?: number
}

export type RoundResponse = {
    text: string
    stats?: TypingStats
}

// ── POST /round ──────────────────────────────────────────────
export type PostTypistRoundRequest = { body: { keystrokes: Keystroke[] } }
export type PostTypistRoundResponse = RoundResponse
