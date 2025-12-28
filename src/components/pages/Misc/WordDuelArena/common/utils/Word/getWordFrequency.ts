import rawFrequencies from './frequency.json'

type FrequencyType = Record<string, number>

// if your bundler wraps default export
const Frequencies: FrequencyType = (rawFrequencies as any).default ?? rawFrequencies

export const getWordFrequency = (word: string) => {
  return Frequencies[word.toUpperCase()] ?? 0
}
