import { GameConstants } from '../../config/constants'

const calculatePoints = (word: string, isTargetWord: boolean): number =>
    isTargetWord ? word.length * GameConstants.targetWordMultiplier : word.length

export const PointsService = { calculate: calculatePoints }
