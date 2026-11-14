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

export type BreakdownRow = {
    path: string
    today: number
    total: number
}

export type Breakdown = {
    visits: SectionData
    likes: SectionData
}

export type BreakdownPreviewProps = {
    breakdown: Breakdown
}
