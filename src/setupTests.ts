import '@testing-library/jest-dom'
import { server } from '@common/ux/Test/Server'

// MSW server lifecycle
beforeAll(() => server.listen({ onUnhandledRequest: 'warn' }))
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
