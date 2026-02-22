import { EditorWord } from './Editor/Character/Character.types'

export const textToWords = (
    text: string,
    cursorPosition: number = 0,
): EditorWord[] =>
    text.split(' ').reduce<{ words: EditorWord[]; offset: number }>(
        (acc, word, index, arr) => {
            const wordWithSpace = index !== arr.length - 1 ? word + ' ' : word
            const chars = wordWithSpace.split('').map((ch, i) => {
                const charIndex = acc.offset + i
                return {
                    char: ch,
                    index: charIndex,
                    status:
                        charIndex === cursorPosition
                            ? ('pending' as const)
                            : undefined,
                }
            })
            acc.words.push({ chars, index: acc.offset })
            acc.offset += wordWithSpace.length
            return acc
        },
        { words: [], offset: 0 },
    ).words
