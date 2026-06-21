import BlogCard from '../../sharedComponents/BlogCard/BlogCard'
import { PageSideMenu } from '../../sharedComponents/PageSideMenu/PageSideMenu'
import { Screen } from '../../sharedComponents/Screen/Screen'
import { blogArticles } from '../../../articles/articles'
import { Heading, Paragraph, Stack } from '@common/ux'
import { useGetLikeSummary, useGetVisitSummary } from '@common/queries'

import './Blog.scss'
import { hasLength } from '@common/utils/Predicate/Predicate'

interface Props {
    pageName: string
    path: string
}

const Blogs = ({ pageName, path }: Props) => {
    const { data: visitsData } = useGetVisitSummary()
    const { data: likesData } = useGetLikeSummary()
    const visits = visitsData?.visits ?? null
    const likes = likesData?.likes ?? null

    // Get Newest Article
    const publishedArticles = blogArticles.filter((article) => !!article.created)
    const sortedArticles = publishedArticles.sort((a, b) => {
        const dateA = a.created ? new Date(a.created) : new Date(0)
        const dateB = b.created ? new Date(b.created) : new Date(0)
        return dateB.getDate() - dateA.getDate()
    })

    const newArticle = sortedArticles[sortedArticles.length - 1]

    const comingSoonArticles = blogArticles
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
        ))

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
                {hasLength(comingSoonArticles) && (
                    <>
                        <hr className="BlogList__hr" />
                        <Heading as="h3" size="lg" className="BlogList__header">
                            Coming Soon...
                        </Heading>
                        <Stack className="BlogList" align="center">
                            {comingSoonArticles}
                        </Stack>
                    </>
                )}
            </main>
        </Screen>
    )
}

export default Blogs
