import '@testing-library/jest-dom'
import { screen, act } from '@testing-library/react'
import { Page as TestPage } from '../../Test/Page/Page'
import { mockNavigate } from '../../Test/Page/Page.mocks'
import { postVisit } from '../../../../src/serverAPI/visits'
import Page from '../Page'

beforeEach(() => {
    vi.clearAllMocks()
})

describe('Page', () => {
    describe('Document title', () => {
        it('sets the document title on mount', () => {
            TestPage.render({
                path: '/test',
                children: (
                    <Page title="My Page" path="/test">
                        <div />
                    </Page>
                ),
            })

            expect(document.title).toBe('My Page')
        })
    })

    describe('Content', () => {
        it('renders children', () => {
            TestPage.render({
                path: '/test',
                children: (
                    <Page title="Test" path="/test">
                        <h1>Hello World</h1>
                    </Page>
                ),
            })

            expect(screen.getByText('Hello World')).toBeInTheDocument()
        })
    })

    describe('CSS class', () => {
        it('has the base Page class', () => {
            const { container } = TestPage.render({
                path: '/test',
                children: (
                    <Page title="Test" path="/test">
                        <div />
                    </Page>
                ),
            })

            expect(container.querySelector('.Page')).toBeInTheDocument()
        })

        it('applies custom className', () => {
            const { container } = TestPage.render({
                path: '/test',
                children: (
                    <Page title="Test" path="/test" className="CustomPage">
                        <div />
                    </Page>
                ),
            })

            expect(container.querySelector('.Page')).toHaveClass('CustomPage')
        })

        it('adds submenu-open class when subMenuVisible is true', () => {
            const { container } = TestPage.render({
                path: '/test',
                children: (
                    <Page title="Test" path="/test">
                        <div />
                    </Page>
                ),
                appContext: { subMenuVisible: true },
            })

            expect(container.querySelector('.Page--submenu-open')).toBeInTheDocument()
        })
    })

    describe('Visit recording', () => {
        it('records a visit by default', async () => {
            TestPage.render({
                path: '/home',
                children: (
                    <Page title="Test" path="/home">
                        <div />
                    </Page>
                ),
            })

            await act(async () => {
                await Promise.resolve()
            })

            expect(vi.mocked(postVisit)).toHaveBeenCalledWith('/home')
        })

        it('skips visit recording when recordVisit is false', async () => {
            TestPage.render({
                path: '/home',
                children: (
                    <Page title="Test" path="/home" recordVisit={false}>
                        <div />
                    </Page>
                ),
            })

            await act(async () => {
                await Promise.resolve()
            })

            expect(vi.mocked(postVisit)).not.toHaveBeenCalled()
        })
    })

    describe('Login redirect', () => {
        it('redirects to /api/login when loginRequired and not authenticated', () => {
            TestPage.render({
                path: '/admin',
                children: (
                    <Page title="Test" path="/admin" loginRequired>
                        <div>Protected</div>
                    </Page>
                ),
                session: { isAuthenticated: false, isAuthLoading: false },
            })

            expect(mockNavigate).toHaveBeenCalledWith('/api/login')
        })

        it('does not redirect when loginRequired and authenticated', () => {
            TestPage.render({
                path: '/admin',
                children: (
                    <Page title="Test" path="/admin" loginRequired>
                        <div>Protected</div>
                    </Page>
                ),
                session: { isAuthenticated: true, isAuthLoading: false },
            })

            expect(mockNavigate).not.toHaveBeenCalled()
            expect(screen.getByText('Protected')).toBeInTheDocument()
        })

        it('does not redirect when loginRequired is false (default)', () => {
            TestPage.render({
                path: '/public',
                children: (
                    <Page title="Test" path="/public">
                        <div>Public</div>
                    </Page>
                ),
                session: { isAuthenticated: false, isAuthLoading: false },
            })

            expect(mockNavigate).not.toHaveBeenCalled()
            expect(screen.getByText('Public')).toBeInTheDocument()
        })
    })

    describe('Scroll', () => {
        it('scrolls to top on mount', () => {
            TestPage.render({
                path: '/test',
                children: (
                    <Page title="Test" path="/test">
                        <div />
                    </Page>
                ),
            })

            expect(window.scrollTo).toHaveBeenCalledWith(0, 0)
        })
    })
})
