import '@testing-library/jest-dom'
import { waitFor } from '@testing-library/react'
import { Test, Accessor } from '../../Test'
import * as visitsQueries from '@common/queries'
import Page from '../Page'

beforeEach(() => {
    vi.clearAllMocks()
    vi.spyOn(visitsQueries, 'postVisit').mockResolvedValue(undefined)
})

describe('Page', () => {
    describe('Document title', () => {
        it('sets the document title on mount', () => {
            Test.Page.Do.render({
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
            Test.Page.Do.render({
                path: '/test',
                children: (
                    <Page title="Test" path="/test">
                        <h1>Hello World</h1>
                    </Page>
                ),
            })

            expect(Accessor.screen.getByText('Hello World')).toBeInTheDocument()
        })
    })

    describe('CSS class', () => {
        it('has the base Page class', () => {
            const { container } = Test.Page.Do.render({
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
            const { container } = Test.Page.Do.render({
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
            const { container } = Test.Page.Do.render({
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
            Test.Page.Do.render({
                path: '/home',
                children: (
                    <Page title="Test" path="/home">
                        <div />
                    </Page>
                ),
            })

            await waitFor(() => expect(visitsQueries.postVisit).toHaveBeenCalledWith('/home'))
        })

        it('skips visit recording when recordVisit is false', async () => {
            Test.Page.Do.render({
                path: '/home',
                children: (
                    <Page title="Test" path="/home" recordVisit={false}>
                        <div />
                    </Page>
                ),
            })

            await waitFor(() => expect(visitsQueries.postVisit).not.toHaveBeenCalled())
        })
    })

    describe('Login redirect', () => {
        it('redirects to /api/login when loginRequired and not authenticated', () => {
            Test.Page.Do.render({
                path: '/admin',
                children: (
                    <Page title="Test" path="/admin" loginRequired>
                        <div>Protected</div>
                    </Page>
                ),
                session: { isAuthenticated: false, isAuthLoading: false },
            })

            expect(Test.Page.Get.navigatedTo()).toBe('/api/login')
        })

        it('does not redirect when loginRequired and authenticated', () => {
            Test.Page.Do.render({
                path: '/admin',
                children: (
                    <Page title="Test" path="/admin" loginRequired>
                        <div>Protected</div>
                    </Page>
                ),
                session: { isAuthenticated: true, isAuthLoading: false },
            })

            expect(Test.Page.Has.navigated()).toBe(false)
            expect(Accessor.screen.getByText('Protected')).toBeInTheDocument()
        })

        it('does not redirect when loginRequired is false (default)', () => {
            Test.Page.Do.render({
                path: '/public',
                children: (
                    <Page title="Test" path="/public">
                        <div>Public</div>
                    </Page>
                ),
                session: { isAuthenticated: false, isAuthLoading: false },
            })

            expect(Test.Page.Has.navigated()).toBe(false)
            expect(Accessor.screen.getByText('Public')).toBeInTheDocument()
        })
    })

    describe('Scroll', () => {
        it('scrolls to top on mount', () => {
            Test.Page.Do.render({
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
