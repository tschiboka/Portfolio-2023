export type LevelWord = {
    word: string
    frequency: number
}

export type Level = {
    name: string
    targetWords: string[]
    difficulty: number
}

export type LevelName = {
    name: string,
    difficulty: number
}

export type LevelNameResponse = {
    levels: LevelName[]
}