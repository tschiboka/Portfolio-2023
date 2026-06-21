import { useState } from 'react'
import BlogCard from '../../sharedComponents/BlogCard/BlogCard'
import { BlogFilter } from './BlogFilter/BlogFilter'
import { PageSideMenu } from '../../sharedComponents/PageSideMenu/PageSideMenu'
import { Screen } from '../../sharedComponents/Screen/Screen'
import { Heading, Paragraph, Stack, Section } from '@common/ux'
import { useGetLikeSummary, useGetVisitSummary } from '@common/queries'
import { hasLength } from '@common/utils/Predicate/Predicate'
import { BsSliders2 } from 'react-icons/bs'
import {
    getNewestArticle,
    getFilteredArticles,
    getPublishedBlogArticles,
    getComingSoonArticles,
    getSortedArticlesBy,
} from './Blog.utils'

import './Blog.scss'
import { BlogSortBy } from './Blog.type'

interface Props {
    pageName: string
    path: string
}

const Blogs = ({ pageName, path }: Props) => {
    const [selectedLanguages, setSelectedLanguages] = useState<Set<string>>(new Set())
    const [sortedBy, setSortedBy] = useState<BlogSortBy>('mostRelevant')

    const { data: visitsData } = useGetVisitSummary()
    const { data: likesData } = useGetLikeSummary()
    const visits = visitsData?.visits ?? null
    const likes = likesData?.likes ?? null

    const newArticle = getNewestArticle()
    const publishedBlogArticles = getPublishedBlogArticles()
    const filteredArticles = getFilteredArticles(selectedLanguages)
    const blogArticlesSorted = getSortedArticlesBy(filteredArticles, sortedBy, likes, visits)

    const comingSoonArticles = getComingSoonArticles(visits, likes).map(
        ({ article, visits: v, likes: l }) => (
            <BlogCard
                key={article.title}
                blogArticle={article}
                visits={v}
                readingTime={article?.readingTime}
                codeTime={article?.codeTime}
                likes={l}
                path={article.to}
                upcoming={article.upcoming}
                newest={false}
            />
        ),
    )

    const handleToggle = (language: string) => {
        setSelectedLanguages((prev) => {
            const next = new Set(prev)
            if (next.has(language)) next.delete(language)
            else next.add(language)
            return next
        })
    }

    const handleClearFilters = () => {
        setSelectedLanguages(new Set())
        setSortedBy('mostRelevant')
    }

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
                    ideas I've explored throughout my work and personal projects. A large part of
                    learning software engineering comes from people openly sharing their knowledge,
                    so I try to contribute back whenever I come across something that might help
                    others. The articles mainly focus on frontend engineering, TypeScript, React,
                    testing, architecture, and project walkthroughs.
                </Paragraph>
                <Section
                    title={`Filter and Sort Articles | ${filteredArticles.length} of ${publishedBlogArticles.length}`}
                    expandable
                    defaultOpen={false}
                    icon={<BsSliders2 />}
                >
                    <BlogFilter
                        selectedLanguages={selectedLanguages}
                        sortedBy={sortedBy}
                        onSortBy={(sortBy) => setSortedBy(sortBy)}
                        onToggle={handleToggle}
                        onClear={handleClearFilters}
                        totalCount={publishedBlogArticles.length}
                        filteredCount={filteredArticles.length}
                    />
                </Section>
                <Stack className="BlogList" align="center">
                    {blogArticlesSorted.map((article) => (
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
