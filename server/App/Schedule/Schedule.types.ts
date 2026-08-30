import type { PostDailyBreakdownResponse, TypedRequest, TypedResponse } from '../../../common/types'

export type PostDailyBreakdownReq = TypedRequest
export type PostDailyBreakdownRes = TypedResponse<PostDailyBreakdownResponse>

export interface PathBreakdownItem {
    path: string
    count: number
}

export interface SectionData {
    today: PathBreakdownItem[]
    total: PathBreakdownItem[]
    todayCount: number
    totalCount: number
}

export interface Breakdown {
    visits: SectionData
    likes: SectionData
}


