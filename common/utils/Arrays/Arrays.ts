export const shuffleArray = <T>(array: T[]): T[] => {
    const shuffled = [...array]

    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }

    return shuffled
}

/** Build a `count`-length array by calling `build` once per index, 0-based.
 * @example
 * times(3, (i) => i + 1) // [1, 2, 3]
 */
export const times = <T>(count: number, build: (index: number) => T): T[] =>
    Array.from({ length: count }, (_, index) => build(index))

export const Arrays = {
    shuffleArray,
    times,
}
