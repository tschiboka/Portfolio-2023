import { useEffect, useState } from 'react'
import { useAppContext } from '../../../context/AppContext/App.context'
import BlogCard from '../../sharedComponents/BlogCard/BlogCard'
import Footer from '../../sharedComponents/Footer/Footer'
import Menu from '../../sharedComponents/Menu/Menu'
import Nav from '../../sharedComponents/Nav/Nav'
import Page from '../../sharedComponents/Page/Page'
import SubNav from '../../sharedComponents/SubNav/SubNav'
import { blogArticles } from '../../articles/articles'
import { getLikeSummary } from '../../../serverAPI/likes'
import './Blog.scss'
import { getVisitSummary } from '../../../serverAPI/visits'

interface Props {
    pageName: string
    path: string
}

export type VisitCount = { [path: string]: number }
export type LikeCount = { [path: string]: number }

const Blogs = ({ pageName, path }: Props) => {
    const { mobileMenuVisible, subMenuVisible } = useAppContext()
    const [visits, setVisits] = useState<VisitCount | null>(null)
    const [visitsLoaded, setVisitsLoaded] = useState(false)
    const [likes, setLikes] = useState<LikeCount | null>(null)
    const [likesLoaded, setLikesLoaded] = useState(false)

    // Get Newest Article
    const publishedArticles = blogArticles.filter(
        (article) => !!article.created,
    )
    const sortedArticles = publishedArticles.sort((a, b) => {
        const dateA = a.created ? new Date(a.created) : new Date(0)
        const dateB = b.created ? new Date(b.created) : new Date(0)
        return dateB.getDate() - dateA.getDate()
    })

    const newArticle = sortedArticles[sortedArticles.length - 1]

    useEffect(() => {
        if (!visitsLoaded)
            getVisitSummary((visits: VisitCount | null) => {
                setVisitsLoaded(true)
                setVisits(visits)
            })
        if (!likesLoaded) {
            getLikeSummary((likes: LikeCount | null) => {
                setLikesLoaded(true)
                setLikes(likes)
            })
        }
    }, [visits, likes])

    return (
        <Page title="Tivadar Debnar | Blog" path={path}>
            <Nav pageName={pageName} />
            {mobileMenuVisible && <Menu pageName="blog" />}
            {subMenuVisible && <SubNav />}
            <main>
                <h1 className="Blog__title">Blog</h1>
                <p>
                    My blog is a way of giving back - and paying forward - all
                    the help I have been given through my programming learning
                    journey. Feel free to browse my articles that cover some of
                    my findings, solutions and tutorials on exciting and
                    relevant topics, such as programming languages, web
                    development and project walkthroughs. Happy Coding!
                </p>
                <div className="BlogList">
                    {blogArticles
                        .filter((article) => !article.upcoming)
                        .map((article) => (
                            <BlogCard
                                key={article.title}
                                blogArticle={article}
                                visits={visits ? visits[article.to] : 0}
                                readingTime={article?.readingTime}
                                codeTime={article?.codeTime}
                                likes={likes ? likes[article.to] : 0}
                                path={article.to}
                                newest={article.to === newArticle.to}
                            />
                        ))}
                </div>
                <hr className="BlogList__hr" />
                <h3 className="BlogList__header">Coming Soon...</h3>
                <div className="BlogList">
                    {blogArticles
                        .filter((article) => article.upcoming)
                        .map((article) => (
                            <BlogCard
                                key={article.title}
                                blogArticle={article}
                                visits={visits ? visits[article.to] : 0}
                                readingTime={article?.readingTime}
                                codeTime={article?.codeTime}
                                likes={likes ? likes[article.to] : 0}
                                path={article.to}
                                upcoming={article.upcoming}
                                newest={false}
                            />
                        ))}
                </div>
            </main>
            <Footer pageName={pageName} path={path} />
        </Page>
    )
}

export default Blogs
