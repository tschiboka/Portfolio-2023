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

export interface BreakdownPreviewProps {
    breakdown: Breakdown
}
