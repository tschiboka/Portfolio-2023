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

export type LevelName = {
    name: string,
    difficulty: number
}

export type LevelNameResponse = {
    levels: LevelName[]
}