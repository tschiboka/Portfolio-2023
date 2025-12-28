import { MAX_WORD_LENGTH } from "./constants"

export const getWordGroups = (words: string[] = []) => 
    getWordLengthGroups()
        .map((length) => words.filter((word) => word.length === length))
        .map((words) => words.sort())

export const getWordLengthGroups = () =>  Array.from(
        { length: MAX_WORD_LENGTH - 2 },
        (_, i) => MAX_WORD_LENGTH - i,
    )
