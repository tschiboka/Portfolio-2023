import { Arrays } from '@common-utils'
import type { AnagramMapType, LevelWord } from '../Types'
import { MAX_WORD_LENGTH } from './Word.constants'

const getAnagramKey = (word: string) => {
    return word.split('').sort().join('').toUpperCase()
}

const getWordGroups = (words: LevelWord[] = []) =>
    getWordLengthGroups()
        .map((length) => words.filter((word) => word.word.length === length))
        .map((words) => words.sort())

const getWordLengthGroups = () =>
    Array.from({ length: MAX_WORD_LENGTH - 2 }, (_, i) => MAX_WORD_LENGTH - i)

const transformAnagramMap = (input: string, anagramMap: AnagramMapType): string[] => {
    const anagrams = getPossibleAnagrams(input)
    const dictionary = anagrams.flatMap((a) => anagramMap[a] ?? [])
    return Arrays.unique(dictionary)
}

function getPossibleAnagrams(letters: string) {
    const results = new Set<string>()

    function helper(path: string, remaining: string[]) {
        if (path.length >= 3) {
            results.add(path.split('').sort().join(''))
        }

        for (let i = 0; i < remaining.length; i++) {
            helper(path + remaining[i], remaining.slice(i + 1))
        }
    }

    helper('', letters.split(''))
    return Array.from(results).map((anagram) => anagram.toUpperCase())
}

export const WordUtils = {
    getAnagramKey,
    getWordGroups,
    getWordLengthGroups,
    transformAnagramMap,
}
