import type { SplitRatio } from './Split.types'

const RatioMap: Record<SplitRatio, string> = {
    '1/1': '1fr 1fr',
    '1/2': '1fr 2fr',
    '2/1': '2fr 1fr',
    '1/3': '1fr 3fr',
    '3/1': '3fr 1fr',
    '1/4': '1fr 4fr',
    '4/1': '4fr 1fr',
}

export const selectRatio = (ratio?: SplitRatio) => (ratio ? RatioMap[ratio] : RatioMap['1/1'])
