import { screen } from '@testing-library/react'
import { Test } from '@common/ux/Test'
import { Accessor } from '@common/ux/Test/Accessor/Accessor'
import Blogs from '../Blog'
import { handlers } from './Blog.mockHandles'
import { blogArticles } from '../../../../articles/articles'

const publishedArticles = blogArticles.filter((a) => !a.upcoming)
const upcomingArticles = blogArticles.filter((a) => a.upcoming)

const setupBlogs = () => {
    Test.Page.Do.render({
        path: '/blog',
        children: <Blogs pageName="blog" path="/blog" />,
        handlers,
    })
}

describe('Blogs', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    describe('Layout', () => {
        it('should render the heading', () => {
            setupBlogs()
            expect(Test.Heading('Blog')).toBeDefined()
        })

        it('should render the description paragraphs', () => {
            setupBlogs()
            expect(
                Test.Typography(/This blog is a way of documenting things I've learned/i),
            ).toBeDefined()
            expect(
                Test.Typography(
                    /A large part of learning software engineering comes from people openly sharing/i,
                ),
            ).toBeDefined()
            expect(
                Test.Typography(
                    /The articles mainly focus on frontend engineering, TypeScript, React/i,
                ),
            ).toBeDefined()
        })

        it('should render the page side menu', () => {
            setupBlogs()
            expect(Test.SideMenu('Side menu')).toBeDefined()
        })
    })

    describe('Published articles', () => {
        it('should render all published article cards', () => {
            setupBlogs()
            publishedArticles.forEach((article) => {
                expect(Test.Typography.byLabel(article.title)).toBeDefined()
            })
        })
        // This test is skipped because the "Coming Soon..." heading is not currently rendered in the Blog component. It may be added back in the future when there are planned blog articles.
        it.skip('should render the "Coming Soon..." heading', () => {
            setupBlogs()
            expect(Test.Heading('Coming Soon...', 3)).toBeDefined()
        })
    })

    describe('Upcoming articles', () => {
        it('should render upcoming article cards when present', () => {
            setupBlogs()
            upcomingArticles.forEach((article) => {
                expect(Test.Typography.byLabel(article.title)).toBeDefined()
            })
        })

        it('should show upcoming date on the card', () => {
            setupBlogs()
            upcomingArticles.forEach((article) => {
                if (article.upcomingDate) {
                    expect(Test.Typography.byLabel(article.title)).toBeDefined()
                }
            })
        })
    })

    describe('Article card content', () => {
        it('should render article images with correct alt text', () => {
            setupBlogs()
            blogArticles
                .filter((a) => !a.upcoming)
                .forEach((article) => {
                    expect(
                        new Accessor(
                            screen.getByRole('img', { name: article.imageAlt }),
                            `Article image: ${article.imageAlt}`,
                        ),
                    ).toBeDefined()
                })
        })

        it('should render badges on article cards', () => {
            setupBlogs()
            const allBadges = new Set(
                blogArticles.filter((a) => !a.upcoming).flatMap((a) => a.badges),
            )
            allBadges.forEach((badge) => {
                expect(screen.getAllByText(badge).length).toBeGreaterThan(0)
            })
        })

        it('should render reading time on article cards', () => {
            setupBlogs()
            const articlesWithReadingTime = blogArticles.filter((a) => !a.upcoming && a.readingTime)
            articlesWithReadingTime.forEach((article) => {
                const card = Test.Typography.byLabel(article.title)
                expect(card.Get.textContent()).toMatch(article.readingTime as string)
            })
        })

        it('should navigate to article when a card is clicked', async () => {
            setupBlogs()
            const article = publishedArticles[0]
            const card = Test.Typography.byLabel(article.title)
            await card.Do.click()
            expect(Test.Page.Get.navigatedTo()).toBe(article.to)
        })
    })

    describe('Loading state', () => {
        it('should not show loading indicator', () => {
            setupBlogs()
            expect(Test.LoadingIndicator.Has.isLoading()).toBe(false)
        })
    })
})
