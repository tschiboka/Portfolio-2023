import { Arrays } from '@utils'
import { AnagramMapType } from '../Types'

export const transformAnagramMap = (input: string, anagramMap: AnagramMapType): string[] => {
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
