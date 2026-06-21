import { DateTime } from '@common/utils/DateTime'
import { blogArticles, BlogArticle } from '../../../articles/articles'
import { isEmpty } from '@common/utils/Predicate/Predicate'
import { BlogSortBy } from './Blog.type'

export const getPublishedArticles = () => blogArticles.filter((article) => !!article.created)

export const getSortedArticles = () => {
    const published = getPublishedArticles()
    return [...published].sort(
        (a, b) => DateTime.Format.ms(b.created) - DateTime.Format.ms(a.created),
    )
}

export const getNewestArticle = () => getSortedArticles()[0]

export const getPublishedBlogArticles = () => blogArticles.filter((article) => !article.upcoming)

export const getFilteredArticles = (selectedLanguages: Set<string>) => {
    const published = getPublishedBlogArticles()
    return isEmpty(selectedLanguages)
        ? published
        : published.filter((article) =>
              article.badges.some((badge) => selectedLanguages.has(badge)),
          )
}

export const getComingSoonArticles = (
    visits: Record<string, number> | null,
    likes: Record<string, number> | null,
) =>
    blogArticles
        .filter((article) => article.upcoming)
        .map((article) => ({
            article,
            visits: visits ? visits[article.to] : 0,
            likes: likes ? likes[article.to] : 0,
        }))

export const getSortedArticlesBy = (
    articles: BlogArticle[],
    sortedBy: BlogSortBy,
    likes: Record<string, number> | null,
    visits: Record<string, number> | null,
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
                return (likes ? likes[b.to] : 0) - (likes ? likes[a.to] : 0)
            case 'mostVisited':
                return (visits ? visits[b.to] : 0) - (visits ? visits[a.to] : 0)
        }
    })
