import { waitFor } from '@testing-library/react'
import { Accessor } from '@common-ux/Test'
import { VisitQueries } from '@shared-queries'
import { Browser, Paths } from '@common-utils'
import { Heading } from '@common-ux'
import { Test } from './index'
import { Screen } from '../Screen'
import '@testing-library/jest-dom'

// Mock the shared-queries barrel so visit recording is a typed vi.fn we can drive directly;
// stub the remaining hooks to avoid undefined-method crashes in any subcomponent.
vi.mock(
    '@shared-queries',
    () =>
        ({
            VisitQueries: {
                usePost: vi.fn(),
                useGet: vi.fn().mockReturnValue({ data: undefined }),
                Summary: { useGet: vi.fn().mockReturnValue({ data: undefined }) },
            },
            LikeQueries: {
                usePost: vi.fn(),
                useGet: vi.fn().mockReturnValue({ data: undefined }),
                Summary: { useGet: vi.fn() },
            },
        }) satisfies typeof import('@shared-queries'),
)

const useRecordMock = vi.mocked(VisitQueries.usePost)

beforeEach(() => {
    vi.clearAllMocks()
    useRecordMock.mockReturnValue(undefined)
    // Screen skips visit recording on localhost; force a non-localhost environment.
    vi.spyOn(Browser, 'isLocalhost').mockReturnValue(false)
})

describe('Screen', () => {
    describe('Document title', () => {
        it('sets the document title on mount', () => {
            Test.Screen.Do.render({
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
            Test.Screen.Do.render({
                path: '/test',
                children: (
                    <Screen title="Test" path="/test">
                        <Heading as="h1">Hello World</Heading>
                    </Screen>
                ),
            })

            expect(Accessor.screen.getByText('Hello World')).toBeInTheDocument()
        })
    })

    describe('CSS class', () => {
        it('has the base Screen class', () => {
            const { container } = Test.Screen.Do.render({
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
            const { container } = Test.Screen.Do.render({
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
            const { container } = Test.Screen.Do.render({
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
        it('records a visit for the screen path', async () => {
            Test.Screen.Do.render({
                path: '/home',
                children: (
                    <Screen title="Test" path="/home">
                        <div />
                    </Screen>
                ),
            })

            await waitFor(() => expect(useRecordMock).toHaveBeenCalledWith('/home'))
        })
    })

    describe('Login redirect', () => {
        it('redirects to /api/login when loginRequired and not authenticated', () => {
            Test.Screen.Do.render({
                path: '/admin',
                children: (
                    <Screen title="Test" path="/admin" loginRequired>
                        <div>Protected</div>
                    </Screen>
                ),
                session: { isAuthenticated: false, isAuthLoading: false },
            })

            expect(Test.Screen.Get.navigatedTo()).toBe(Paths.Client.Login)
        })

        it('does not redirect when loginRequired and authenticated', () => {
            Test.Screen.Do.render({
                path: '/admin',
                children: (
                    <Screen title="Test" path="/admin" loginRequired>
                        <div>Protected</div>
                    </Screen>
                ),
                session: { isAuthenticated: true, isAuthLoading: false },
            })

            expect(Test.Screen.Has.navigated()).toBe(false)
            expect(Accessor.screen.getByText('Protected')).toBeInTheDocument()
        })

        it('does not redirect when loginRequired is false (default)', () => {
            Test.Screen.Do.render({
                path: '/public',
                children: (
                    <Screen title="Test" path="/public">
                        <div>Public</div>
                    </Screen>
                ),
                session: { isAuthenticated: false, isAuthLoading: false },
            })

            expect(Test.Screen.Has.navigated()).toBe(false)
            expect(Accessor.screen.getByText('Public')).toBeInTheDocument()
        })
    })

    describe('Scroll', () => {
        it('scrolls to top on mount', () => {
            Test.Screen.Do.render({
                path: '/test',
                children: (
                    <Screen title="Test" path="/test">
                        <div />
                    </Screen>
                ),
            })

            // eslint-disable-next-line @typescript-eslint/unbound-method -- window.scrollTo is a vi.fn() spy set in setupTests.ts, so no receiver can be lost
            expect(window.scrollTo).toHaveBeenCalledWith(0, 0)
        })
    })
})
