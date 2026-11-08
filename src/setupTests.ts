import { http, HttpResponse } from 'msw'
import { Server } from '@common-ux/Test/Server'
import type { Dictionary } from '@common-utils'
import '@testing-library/jest-dom/vitest'

// Default handlers for common API routes — components like PageSideMenu fetch
// likes and visits on mount. These ensure tests don't get MSW warnings for them.
// jsdom enforces CORS on XHR, so every mocked response has to allow the test origin.
const cors = { headers: { 'Access-Control-Allow-Origin': '*' } }

const defaultHandlers = [
    // msw 3 intercepts preflight too; without this the browser-level request aborts.
    http.options(
        /.*/,
        () =>
            new HttpResponse(null, {
                status: 204,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': '*',
                    'Access-Control-Allow-Methods': '*',
                },
            }),
    ),
    http.get('http://localhost:5000/api/visit', () =>
        HttpResponse.json({ success: true, visits: 0 }, cors),
    ),
    http.get('http://localhost:5000/api/like', () =>
        HttpResponse.json({ success: true, likes: 0 }, cors),
    ),
    http.get('/version.json', () =>
        HttpResponse.json(
            { version: '0.0.0', sha: '0'.repeat(40), message: 'test', date: '2026-01-01' },
            cors,
        ),
    ),
]

// MSW server lifecycle
beforeAll(() => Server.listen({ onUnhandledFrame: 'warn' }))
beforeEach(() => defaultHandlers.forEach((h) => Server.use(h)))
afterEach(() => Server.resetHandlers())
afterAll(() => Server.close())

// detectincognitojs does not work in jsdom — stub it globally
vi.mock('detectincognitojs', () => ({
    detectIncognito: () => Promise.resolve({ isPrivate: false }),
}))

// jsdom does not implement the Fullscreen API — stub fullscreenElement to null
Object.defineProperty(document, 'fullscreenElement', {
    configurable: true,
    get: () => null,
})

// useNavigate is mocked so navigation can be asserted through globalThis.mockNavigate
const mockNavigate = vi.hoisted(() => vi.fn())
vi.mock('react-router-dom', async (importOriginal) => ({
    ...(await importOriginal<object>()),
    useNavigate: () => mockNavigate,
}))
// Expose on globalThis so tests can assert on it
;(globalThis as Dictionary).mockNavigate = mockNavigate

// jsdom does not implement window.scrollTo
window.scrollTo = vi.fn()

// Suppress benign act() warnings that are false positives.
// These are caused by components that use scroll listeners, IntersectionObserver,
// or other async side effects that trigger state updates outside of act().
// All such warnings in this suite are false positives — the tests pass correctly.
// Add new patterns here as needed — each entry is checked against the full message.
const suppressedActPatterns = [
    'inside a test was not wrapped in act',
    'React Router Future Flag Warning',
]

// The version check narrates every poll; filter just those lines so spec output stays readable.
const suppressedVersionPatterns = [
    'App is up to date.',
    'New version available!',
    'Please refresh the page to update.',
    'Last version check ran at:',
    '📌 Version:',
    '📝 Message:',
    '📅 Date:',
    '❌ Current version:',
]

const isSuppressed = (patterns: string[], args: unknown[]) => {
    const message = args.map(String).join(' ')

    return patterns.some((pattern) => message.includes(pattern))
}

const originalConsoleError = console.error
console.error = ((...args: unknown[]) => {
    if (isSuppressed(suppressedActPatterns, args)) return
    originalConsoleError.call(console, ...args)
}) as typeof console.error

const originalConsoleWarn = console.warn
console.warn = ((...args: unknown[]) => {
    if (isSuppressed(suppressedActPatterns, args)) return
    if (isSuppressed(suppressedVersionPatterns, args)) return
    originalConsoleWarn.call(console, ...args)
}) as typeof console.warn

const originalConsoleLog = console.log
console.log = ((...args: unknown[]) => {
    if (isSuppressed(suppressedVersionPatterns, args)) return
    originalConsoleLog.call(console, ...args)
}) as typeof console.log

const originalConsoleInfo = console.info
console.info = ((...args: unknown[]) => {
    if (isSuppressed(suppressedVersionPatterns, args)) return
    originalConsoleInfo.call(console, ...args)
}) as typeof console.info

// jsdom does not implement IntersectionObserver — provide a minimal stub
// so any component that uses useIsVisible (e.g. ContentNavigator via Screen) won't crash.
vi.stubGlobal(
    'IntersectionObserver',
    vi.fn(function (this: unknown) {
        return { observe: vi.fn(), unobserve: vi.fn(), disconnect: vi.fn() }
    }),
)

// jsdom does not implement HTMLCanvasElement.getContext — provide a minimal stub
// so any component that uses <canvas> (e.g. XmasFormCanvas) won't crash.
Object.assign(HTMLCanvasElement.prototype, { getContext: vi.fn() })

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
