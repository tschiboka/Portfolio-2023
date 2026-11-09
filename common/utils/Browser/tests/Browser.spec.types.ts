import type { Nullable } from '@common-utils'

/** Vendor-prefixed Fullscreen API types — mirrors the hook's interfaces. */
export interface FullScreenElement {
    requestFullscreen?: () => Promise<void>
    webkitRequestFullscreen?: () => Promise<void>
    msRequestFullscreen?: () => Promise<void>
}

export interface FullScreenDocument {
    exitFullscreen?: () => Promise<void>
    webkitExitFullscreen?: () => Promise<void>
    msExitFullscreen?: () => Promise<void>
    fullscreenElement?: Nullable<Element>
}

export interface MockObserver {
    observe: ReturnType<typeof vi.fn>
    unobserve: ReturnType<typeof vi.fn>
    disconnect: ReturnType<typeof vi.fn>
    trigger: (entries: Partial<IntersectionObserverEntry>[]) => void
}

export type Viewport = { innerWidth: number; innerHeight: number }
