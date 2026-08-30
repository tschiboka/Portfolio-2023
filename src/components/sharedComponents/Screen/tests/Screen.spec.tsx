import '@testing-library/jest-dom'
import { waitFor } from '@testing-library/react'
import { Accessor } from '@ux/Test'
import * as visitsQueries from '../../../../common/queries'
import { Browser } from '@utils'
import type { PostVisitResponse } from '@types'
import { Screen } from '../Screen'
import { TestScreen } from './Screen.spec.utils'

// detectincognitojs is async and browser-detection dependent; stub it as "not private" so
// visit recording is deterministic in tests.
vi.mock('detectincognitojs', () => ({
    detectIncognito: vi.fn().mockResolvedValue({ isPrivate: false }),
}))

const visitResponse: PostVisitResponse = {
    visit: { path: '/home', visitDate: new Date() },
}

beforeEach(() => {
    vi.clearAllMocks()
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    vi.spyOn(visitsQueries, 'postVisit').mockResolvedValue(visitResponse)
    // Screen skips visit recording on localhost; force a non-localhost environment.
    vi.spyOn(Browser, 'isLocalhost').mockReturnValue(false)
})

describe('Screen', () => {
    describe('Document title', () => {
        it('sets the document title on mount', () => {
            TestScreen.Do.render({
                path: '/test',
                children: (
                    <Screen title="My Page" path="/test">
                        <div />
                    </Screen>
                ),
            })

            expect(document.title).toBe('My Page')
        })
    })

    describe('Content', () => {
        it('renders children', () => {
            TestScreen.Do.render({
                path: '/test',
                children: (
                    <Screen title="Test" path="/test">
                        <h1>Hello World</h1>
                    </Screen>
                ),
            })

            expect(Accessor.screen.getByText('Hello World')).toBeInTheDocument()
        })
    })

    describe('CSS class', () => {
        it('has the base Screen class', () => {
            const { container } = TestScreen.Do.render({
                path: '/test',
                children: (
                    <Screen title="Test" path="/test">
                        <div />
                    </Screen>
                ),
            })

            expect(container.querySelector('.Screen')).toBeInTheDocument()
        })

        it('applies custom className', () => {
            const { container } = TestScreen.Do.render({
                path: '/test',
                children: (
                    <Screen title="Test" path="/test" className="CustomScreen">
                        <div />
                    </Screen>
                ),
            })

            expect(container.querySelector('.Screen')).toHaveClass('CustomScreen')
        })

        it('adds submenu-open class when subMenuVisible is true', () => {
            const { container } = TestScreen.Do.render({
                path: '/test',
                children: (
                    <Screen title="Test" path="/test">
                        <div />
                    </Screen>
                ),
                appContext: { subMenuVisible: true },
            })

            expect(container.querySelector('.Screen--submenu-open')).toBeInTheDocument()
        })
    })

    describe('Visit recording', () => {
        it('records a visit by default', async () => {
            TestScreen.Do.render({
                path: '/home',
                children: (
                    <Screen title="Test" path="/home">
                        <div />
                    </Screen>
                ),
            })

            await waitFor(() => expect(visitsQueries.postVisit).toHaveBeenCalledWith('/home'))
        })

        it('skips visit recording when recordVisit is false', async () => {
            TestScreen.Do.render({
                path: '/home',
                children: (
                    <Screen title="Test" path="/home" recordVisit={false}>
                        <div />
                    </Screen>
                ),
            })

            await waitFor(() => expect(visitsQueries.postVisit).not.toHaveBeenCalled())
        })
    })

    describe('Login redirect', () => {
        it('redirects to /api/login when loginRequired and not authenticated', () => {
            TestScreen.Do.render({
                path: '/admin',
                children: (
                    <Screen title="Test" path="/admin" loginRequired>
                        <div>Protected</div>
                    </Screen>
                ),
                session: { isAuthenticated: false, isAuthLoading: false },
            })

            expect(TestScreen.Get.navigatedTo()).toBe('/api/login')
        })

        it('does not redirect when loginRequired and authenticated', () => {
            TestScreen.Do.render({
                path: '/admin',
                children: (
                    <Screen title="Test" path="/admin" loginRequired>
                        <div>Protected</div>
                    </Screen>
                ),
                session: { isAuthenticated: true, isAuthLoading: false },
            })

            expect(TestScreen.Has.navigated()).toBe(false)
            expect(Accessor.screen.getByText('Protected')).toBeInTheDocument()
        })

        it('does not redirect when loginRequired is false (default)', () => {
            TestScreen.Do.render({
                path: '/public',
                children: (
                    <Screen title="Test" path="/public">
                        <div>Public</div>
                    </Screen>
                ),
                session: { isAuthenticated: false, isAuthLoading: false },
            })

            expect(TestScreen.Has.navigated()).toBe(false)
            expect(Accessor.screen.getByText('Public')).toBeInTheDocument()
        })
    })

    describe('Scroll', () => {
        it('scrolls to top on mount', () => {
            TestScreen.Do.render({
                path: '/test',
                children: (
                    <Screen title="Test" path="/test">
                        <div />
                    </Screen>
                ),
            })

            expect(window.scrollTo).toHaveBeenCalledWith(0, 0)
        })
    })
})
