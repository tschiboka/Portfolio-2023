const calculatePoints = (word: string, isTargetWord: boolean): number => {
    return isTargetWord ? word.length * 3 : word.length
}

export { calculatePoints }
