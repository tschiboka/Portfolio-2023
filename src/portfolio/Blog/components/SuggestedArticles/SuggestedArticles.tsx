import { Heading } from '@common-ux'
import { blogArticles } from '@portfolio/Article'
import { LikeQueries, VisitQueries } from '@shared-queries'
import { BlogCard } from '../BlogCard/BlogCard'
import './SuggestedArticles.scss'

interface Props {
    articles?: string[]
}

export const SuggestedArticles = ({ articles }: Props) => {
    const { data: visitsData } = VisitQueries.Summary.useGet()
    const { data: likesData } = LikeQueries.Summary.useGet()
    const visits = visitsData?.visits ?? null
    const likes = likesData?.likes ?? null

    const getBlogArticle = (path: string) => {
        const article = blogArticles.find((article) => article.to === path)
        if (article?.title)
            return (
                <BlogCard
                    key={article.title}
                    blogArticle={article}
                    visits={visits ? visits[article.to] : 0}
                    readingTime={article?.readingTime}
                    codeTime={article?.codeTime}
                    likes={likes ? likes[article.to] : 0}
                    path={article.to}
                    newest={false}
                />
            )
    }

    if (articles)
        return (
            <div className="SuggestedArticles">
                <Heading as="h3">Suggested Articles</Heading>
                {articles.map((article) => getBlogArticle(article))}
            </div>
        )
}
