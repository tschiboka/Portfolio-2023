import type { Breakdown } from './BreakdownPreview.types'

/** Mock data for visual testing in the Admin panel. */
export const MOCK_BREAKDOWN: Breakdown = {
    visits: {
        today: [
            { path: '/', count: 42 },
            { path: '/projects/riffmaster', count: 15 },
            { path: '/articles/react-anatomy', count: 8 },
        ],
        total: [
            { path: '/', count: 1240 },
            { path: '/projects/riffmaster', count: 387 },
            { path: '/articles/react-anatomy', count: 203 },
            { path: '/contact', count: 95 },
        ],
        todayCount: 65,
        totalCount: 1925,
    },
    likes: {
        today: [
            { path: '/', count: 5 },
            { path: '/projects/riffmaster', count: 2 },
        ],
        total: [
            { path: '/', count: 142 },
            { path: '/projects/riffmaster', count: 56 },
            { path: '/articles/react-anatomy', count: 31 },
        ],
        todayCount: 7,
        totalCount: 229,
    },
}
