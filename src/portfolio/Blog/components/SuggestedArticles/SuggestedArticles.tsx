import BlogCard from '../BlogCard/BlogCard'
import { Heading } from '@common-ux'
import { blogArticles } from '@portfolio/Article'
import { LikesQueries, VisitsQueries } from '@shared-queries'
import './SuggestedArticles.scss'

interface Props {
    articles?: string[]
}

const SuggestedArticles = ({ articles }: Props) => {
    const { data: visitsData } = VisitsQueries.Summary.useGet()
    const { data: likesData } = LikesQueries.Summary.useGet()
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

export default SuggestedArticles
