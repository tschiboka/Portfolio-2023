import '@testing-library/jest-dom'
import { http, HttpResponse } from 'msw'
import { server } from '@common/ux/Test/Server'

// Default handlers for common API routes — components like PageSideMenu fetch
// likes and visits on mount. These ensure tests don't get MSW warnings for them.
const defaultHandlers = [
    http.get('http://localhost:5000/api/visit', () =>
        HttpResponse.json({ success: true, visits: 0 }),
    ),
    http.get('http://localhost:5000/api/like', () =>
        HttpResponse.json({ success: true, likes: 0 }),
    ),
]

// MSW server lifecycle
beforeAll(() => server.listen({ onUnhandledRequest: 'warn' }))
beforeEach(() => defaultHandlers.forEach((h) => server.use(h)))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

// detectincognitojs does not work in jsdom — stub it globally
vi.mock('detectincognitojs', () => ({
    detectIncognito: () => Promise.resolve({ isPrivate: false }),
}))

// useNavigate calls navigate() which has no effect in happy-dom — provide a trackable mock
const mockNavigate = vi.hoisted(() => vi.fn())
vi.mock('react-router-dom', async (importOriginal) => ({
    ...(await importOriginal<object>()),
    useNavigate: () => mockNavigate,
}))
// Expose on globalThis so tests can assert on it
;(globalThis as Record<string, unknown>).mockNavigate = mockNavigate

// jsdom does not implement window.scrollTo
window.scrollTo = vi.fn() as unknown as typeof window.scrollTo

// Suppress benign act() warnings that are false positives.
// These are caused by components that use scroll listeners, IntersectionObserver,
// or other async side effects that trigger state updates outside of act().
// All such warnings in this suite are false positives — the tests pass correctly.
// Add new patterns here as needed — each entry is checked against the full message.
const suppressedActPatterns = [
    'inside a test was not wrapped in act',
    'React Router Future Flag Warning',
]

const originalConsoleError = console.error
console.error = ((...args: unknown[]) => {
    const message = args.map(String).join(' ')
    if (suppressedActPatterns.some((p) => message.includes(p))) return
    originalConsoleError.call(console, ...args)
}) as typeof console.error

const originalConsoleWarn = console.warn
console.warn = ((...args: unknown[]) => {
    const message = args.map(String).join(' ')
    if (suppressedActPatterns.some((p) => message.includes(p))) return
    originalConsoleWarn.call(console, ...args)
}) as typeof console.warn

// jsdom does not implement IntersectionObserver — provide a minimal stub
// so any component that uses useIsVisible (e.g. ContentNavigator via Screen) won't crash.
vi.stubGlobal(
    'IntersectionObserver',
    vi.fn(function (this: unknown) {
        return { observe: vi.fn(), unobserve: vi.fn(), disconnect: vi.fn() }
    }),
)

// jsdom does not implement window.matchMedia — provide a minimal stub
// so any component that uses matchMedia (e.g. responsive hooks) won't crash.
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
    })),
})
