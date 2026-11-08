import { Arrays } from '@common-utils'
import { WordConstants } from './Word.constants'
import type { AnagramMapType, LevelWord } from '../Types'

const getAnagramKey = (word: string) => word.split('').sort().join('').toUpperCase()

const getWordGroups = (words: LevelWord[] = []) =>
    getWordLengthGroups()
        .map((length) => words.filter((word) => word.word.length === length))
        .map((words) => words.sort())

const getWordLengthGroups = () =>
    Arrays.times(WordConstants.maxLength - 2, (i) => WordConstants.maxLength - i)

const transformAnagramMap = (input: string, anagramMap: AnagramMapType): string[] => {
    const anagrams = getPossibleAnagrams(input)
    const dictionary = anagrams.flatMap((a) => anagramMap[a] ?? [])
    return Arrays.unique(dictionary)
}

function getPossibleAnagrams(letters: string) {
    const results = new Set<string>()

    function helper(path: string, remaining: string[]) {
        if (path.length >= 3) results.add(path.split('').sort().join(''))

        remaining.forEach((word, i) => helper(path + word, remaining.slice(i + 1)))
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
