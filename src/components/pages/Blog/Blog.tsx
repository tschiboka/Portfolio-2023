import { useEffect, useState } from 'react'
import BlogCard from '../../sharedComponents/BlogCard/BlogCard'
import { PageSideMenu } from '../../sharedComponents/PageSideMenu/PageSideMenu'
import { Screen } from '../../sharedComponents/Screen/Screen'
import { blogArticles } from '../../../articles/articles'
import { getLikeSummary } from '../../../serverAPI/likes'
import { LikeSummary, VisitSummary } from '@common/types'
import { Heading, Paragraph, Stack } from '@common/ux'
import './Blog.scss'
import { getVisitSummary } from '../../../serverAPI/visits'

interface Props {
    pageName: string
    path: string
}

const Blogs = ({ pageName, path }: Props) => {
    const [visits, setVisits] = useState<VisitSummary | null>(null)
    const [visitsLoaded, setVisitsLoaded] = useState(false)
    const [likes, setLikes] = useState<LikeSummary | null>(null)
    const [likesLoaded, setLikesLoaded] = useState(false)

    // Get Newest Article
    const publishedArticles = blogArticles.filter((article) => !!article.created)
    const sortedArticles = publishedArticles.sort((a, b) => {
        const dateA = a.created ? new Date(a.created) : new Date(0)
        const dateB = b.created ? new Date(b.created) : new Date(0)
        return dateB.getDate() - dateA.getDate()
    })

    const newArticle = sortedArticles[sortedArticles.length - 1]

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

    return (
        <Screen
            title="Tivadar Debnar | Blog"
            path={path}
            variant="portfolio"
            pageName={pageName}
            sideMenu={<PageSideMenu />}
        >
            <main>
                <Heading as="h1" className="Blog__title">
                    Blog
                </Heading>
                <Paragraph>
                    This blog is a way of documenting things I've learned, problems I've solved, and
                    ideas I've explored throughout my work and personal projects.
                </Paragraph>

                <Paragraph>
                    A large part of learning software engineering comes from people openly sharing
                    their knowledge, so I try to contribute back whenever I come across something
                    that might help others.
                </Paragraph>

                <Paragraph>
                    The articles mainly focus on frontend engineering, TypeScript, React, testing,
                    architecture, and project walkthroughs.
                </Paragraph>
                <Stack className="BlogList" align="center">
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
                </Stack>
                <hr className="BlogList__hr" />
                <Heading as="h3" size="lg" className="BlogList__header">
                    Coming Soon...
                </Heading>
                <Stack className="BlogList" align="center">
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
                </Stack>
            </main>
        </Screen>
    )
}

export default Blogs
