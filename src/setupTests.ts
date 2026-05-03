import '@testing-library/jest-dom'

// detectincognitojs does not work in jsdom — stub it globally
jest.mock('detectincognitojs', () => ({
    detectIncognito: () => Promise.resolve({ isPrivate: false }),
}))

// jsdom does not implement window.scrollTo
window.scrollTo = jest.fn() as unknown as typeof window.scrollTo

// jsdom does not implement window.matchMedia — provide a minimal stub
// so any component that uses matchMedia (e.g. responsive hooks) won't crash.
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
    })),
})
