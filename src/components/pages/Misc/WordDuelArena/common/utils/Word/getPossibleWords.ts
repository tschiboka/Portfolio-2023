type AnagramMapType = {
  [key: string]: string[]
}

let anagramMapCache: AnagramMapType | null = null;

export async function loadAnagramMap(): Promise<AnagramMapType> {
  if (anagramMapCache) return anagramMapCache;

  const res = await fetch(`${import.meta.env.BASE_URL}projects/wda/anagramMap.json`)
  const json = await res.json();

  anagramMapCache = json as AnagramMapType;
  return anagramMapCache;
}

export const getPossibleWords = async (input: string): Promise<string[]> => {
  const anagramMap = await loadAnagramMap()
  const anagrams = getPossibleAnagrams(input)

  const dictionary = anagrams.flatMap(
    a => anagramMap[a] ?? []
  )

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
