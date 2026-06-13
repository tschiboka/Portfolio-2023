import BlogCard from '../BlogCard/BlogCard'
import { blogArticles } from '../../../articles/articles'
import './SuggestedArticle.scss'
import { useGetLikeSummary, useGetVisitSummary } from '@common/queries'

interface Props {
    articles?: string[]
}

const SuggestedArticles = ({ articles }: Props) => {
    const { data: visitsData } = useGetVisitSummary()
    const { data: likesData } = useGetLikeSummary()
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
                <h3>Suggested Articles</h3>
                {articles.map((article) => getBlogArticle(article))}
            </div>
        )
}

export default SuggestedArticles
