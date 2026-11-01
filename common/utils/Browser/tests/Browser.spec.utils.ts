import type { MockObserver, Viewport } from './Browser.spec.types'

let instances: MockObserver[] = []

/** Clears the observers created by previous tests. */
const reset = (): void => {
    instances = []
}

/** The observer created most recently, which the test drives. */
const latest = (): MockObserver => instances[0]

class IntersectionObserverMock {
    observe = vi.fn()
    unobserve = vi.fn()
    disconnect = vi.fn()

    constructor(private readonly callback: IntersectionObserverCallback) {
        instances.push(this)
    }

    trigger(entries: Partial<IntersectionObserverEntry>[]): void {
        this.callback(entries as IntersectionObserverEntry[], this as unknown as IntersectionObserver)
    }
}

vi.stubGlobal('IntersectionObserver', IntersectionObserverMock)

const createElement = () => document.createElement('div')

const writeText = vi.fn()

const execCommand = vi.fn()

/** Installs a fresh clipboard whose `writeText` is the shared mock. */
const mockClipboard = (): void => {
    writeText.mockReset().mockResolvedValue(undefined)
    Object.assign(navigator, { clipboard: { writeText } })
}

/** Removes the clipboard and installs a fresh `document.execCommand` returning `true`. */
const mockExecCommand = (): void => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
    delete (navigator as any).clipboard
    execCommand.mockReset().mockReturnValue(true)
    document.execCommand = execCommand
}

const viewports: Record<'portrait' | 'landscape' | 'mobile' | 'desktop', Viewport> = {
    portrait: { innerWidth: 400, innerHeight: 800 },
    landscape: { innerWidth: 1200, innerHeight: 800 },
    mobile: { innerWidth: 600, innerHeight: 900 },
    desktop: { innerWidth: 1440, innerHeight: 900 },
}

export const BrowserTestUtils = {
    reset,
    latest,
    createElement,
    writeText,
    execCommand,
    mockClipboard,
    mockExecCommand,
    viewports,
}
