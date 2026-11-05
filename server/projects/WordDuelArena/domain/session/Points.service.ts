const calculatePoints = (word: string, isTargetWord: boolean): number =>
    isTargetWord ? word.length * 3 : word.length

export const PointsService = { calculate: calculatePoints }
