import { DateTime } from '@common-utils'
import { blogArticles, BlogArticle } from '@portfolio/Article'
import { isEmpty } from '@common-utils'
import type { Nullable, Dictionary } from '@common-utils'
import { BlogSortBy } from './Blog.types'

const getPublishedArticles = () => blogArticles.filter((article) => !!article.created)

const getSortedArticles = () => {
    const published = getPublishedArticles()
    return [...published].sort(
        (a, b) => DateTime.Format.ms(b.created) - DateTime.Format.ms(a.created),
    )
}

const getNewestArticle = () => getSortedArticles()[0]

const getPublishedBlogArticles = () => blogArticles.filter((article) => !article.upcoming)

const getFilteredArticles = (selectedLanguages: Set<string>) => {
    const published = getPublishedBlogArticles()
    return isEmpty(selectedLanguages)
        ? published
        : published.filter((article) =>
              article.badges.some((badge) => selectedLanguages.has(badge)),
          )
}

const getComingSoonArticles = (
    visits: Nullable<Dictionary<number>>,
    likes: Nullable<Dictionary<number>>,
) =>
    blogArticles
        .filter((article) => article.upcoming)
        .map((article) => ({
            article,
            visits: visits ? visits[article.to] : 0,
            likes: likes ? likes[article.to] : 0,
        }))

const getSortedArticlesBy = (
    articles: BlogArticle[],
    sortedBy: BlogSortBy,
    likes: Nullable<Dictionary<number>>,
    visits: Nullable<Dictionary<number>>,
) =>
    [...articles].sort((a, b) => {
        switch (sortedBy) {
            case 'newest':
                return DateTime.Format.ms(b.created) - DateTime.Format.ms(a.created)
            case 'oldest':
                return DateTime.Format.ms(a.created) - DateTime.Format.ms(b.created)
            case 'mostRelevant':
                return 0
            case 'mostLiked':
                return (likes?.[b.to] ?? 0) - (likes?.[a.to] ?? 0)
            case 'mostVisited':
                return (visits?.[b.to] ?? 0) - (visits?.[a.to] ?? 0)
        }
    })

export const BlogUtils = {
    getNewestArticle,
    getPublishedBlogArticles,
    getFilteredArticles,
    getComingSoonArticles,
    getSortedArticlesBy,
}
