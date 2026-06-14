export interface PathBreakdownItem {
    path: string
    count: number
}

export interface Breakdown {
    visits: {
        today: PathBreakdownItem[]
        total: PathBreakdownItem[]
        todayCount: number
        totalCount: number
    }
    likes: {
        today: PathBreakdownItem[]
        total: PathBreakdownItem[]
        todayCount: number
        totalCount: number
    }
}

export interface SectionData {
    today: PathBreakdownItem[]
    total: PathBreakdownItem[]
    todayCount: number
    totalCount: number
}
