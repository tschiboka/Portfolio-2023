import BlogCard from '../BlogCard/BlogCard'
import { blogArticles } from '../../articles/articles'
import './SuggestedArticle.scss'
import { useEffect, useState } from 'react'
import { getVisitSummary } from '../../../serverAPI/visits'
import { getLikeSummary } from '../../../serverAPI/likes'
import { LikeSummary, VisitSummary } from '@common/types'

interface Props {
    articles?: string[]
}

const SuggestedArticles = ({ articles }: Props) => {
    const [visits, setVisits] = useState<VisitSummary | null>(null)
    const [visitsLoaded, setVisitsLoaded] = useState(false)
    const [likes, setLikes] = useState<LikeSummary | null>(null)
    const [likesLoaded, setLikesLoaded] = useState(false)

    useEffect(() => {
        if (!visitsLoaded)
            void getVisitSummary((visits: VisitSummary | null) => {
                setVisitsLoaded(true)
                setVisits(visits)
            })
        if (!likesLoaded) {
            void getLikeSummary((likes: LikeSummary | null) => {
                setLikesLoaded(true)
                setLikes(likes)
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [visits, likes])

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
