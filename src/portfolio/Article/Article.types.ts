export interface BlogArticle {
    title: string
    image: string
    imageAlt: string
    abstract: string
    badges: string[]
    to: string
    readingTime?: string
    codeTime?: string
    suggestedArticles?: string[]
    created?: string
    updated?: string
    upcoming?: boolean
    upcomingDate?: string
}
