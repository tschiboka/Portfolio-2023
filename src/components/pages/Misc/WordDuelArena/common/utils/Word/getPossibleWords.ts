import AnagramMapJson from './anagramMap.json'

type AnagramMapType = {
  [key: string]: string[]
}

const AnagramMap: AnagramMapType = AnagramMapJson as AnagramMapType

export const getPossibleWords = (input: string) => {
    const anagrams = getPossibleAnagrams(input)
    const dictionary = anagrams.map((anagram) => {
        const anagramMap = AnagramMap[anagram]
        return anagramMap ? anagramMap : []
    }).flat()

    return Array.from(new Set(dictionary))
}

function getPossibleAnagrams(letters: string) {
  const results = new Set<string>();

  function helper(path: string, remaining: string[]) {
    if (path.length >= 3) {
      results.add(path.split("").sort().join(""));
    }

    for (let i = 0; i < remaining.length; i++) {
      helper(path + remaining[i], remaining.slice(i + 1));
    }
  }

  helper("", letters.split(""));
  return Array.from(results).map(anagram => anagram.toUpperCase());
}
