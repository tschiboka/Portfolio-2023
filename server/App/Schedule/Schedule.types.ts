import type { PostDailyBreakdownResponse, TypedRequest, TypedResponse } from '../../../common/types'

export type PostDailyBreakdownReq = TypedRequest
export type PostDailyBreakdownRes = TypedResponse<PostDailyBreakdownResponse>

export type PathBreakdownItem = {
    path: string
    count: number
}

export type SectionData = {
    today: PathBreakdownItem[]
    total: PathBreakdownItem[]
    todayCount: number
    totalCount: number
}

export type Breakdown = {
    visits: SectionData
    likes: SectionData
}

export type BreakdownAggregate = {
    _id: string
    visits: number
    likes: number
}
