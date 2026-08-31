export const getAnagramKey = (word: string) => {
    return word.split('').sort().join('').toUpperCase()
}