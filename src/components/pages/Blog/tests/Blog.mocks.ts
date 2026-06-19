import type { GetLikeSummaryResponse, GetVisitSummaryResponse } from '@common/types'

export const mockBlogVisits: GetVisitSummaryResponse = {
    success: true,
    visits: {
        '/blog/riffmaster': 120,
        '/blog/sounds-with-howler': 85,
        '/blog/js-date-validation': 200,
        '/blog/js-sorting': 310,
        '/blog/green-rooftop': 95,
        '/blog/cyclic-email-scheduling': 150,
        '/blog/brief-react-anatomy': 180,
        '/blog/git-cheatsheet': 420,
        '/blog/maybe': 60,
        '/blog/hook-pattern': 140,
        '/blog/stopping-test-entropy': 75,
    },
}

export const mockBlogLikes: GetLikeSummaryResponse = {
    success: true,
    likes: {
        '/blog/riffmaster': 12,
        '/blog/sounds-with-howler': 8,
        '/blog/js-date-validation': 15,
        '/blog/js-sorting': 22,
        '/blog/green-rooftop': 10,
        '/blog/cyclic-email-scheduling': 18,
        '/blog/brief-react-anatomy': 14,
        '/blog/git-cheatsheet': 35,
        '/blog/maybe': 5,
        '/blog/hook-pattern': 11,
        '/blog/stopping-test-entropy': 9,
    },
}
