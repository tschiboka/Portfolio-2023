import '@testing-library/jest-dom'

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
