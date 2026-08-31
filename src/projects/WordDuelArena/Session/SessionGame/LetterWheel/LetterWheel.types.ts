export type LetterPosition = {
    letter: string
    transform: string
    cx: number
    cy: number
}

export type TouchState = {
    touchedIds: number[]
    touchedLetters: string
}