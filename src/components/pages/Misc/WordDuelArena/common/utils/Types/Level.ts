export type LevelWord = {
    word: string
    frequency: number
}

export type Level = {
    name: string
    words: string[]
    allowedWords: LevelWord[]
    difficulty: number
    tags: string[]
}
