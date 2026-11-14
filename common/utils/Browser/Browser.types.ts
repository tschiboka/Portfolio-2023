import type { Nullable } from '../Generics/index.js'

/** Pairs a DOM element with its current intersection-observer visibility state. */
export type VisibilityEntry<T extends Element> = {
    element: T
    isVisible: boolean
}

export type Orientation = 'portrait' | 'landscape'

/** The vendor-prefixed half of the Fullscreen API that the DOM library leaves out. */
export type FullScreenElement = {
    requestFullscreen?: () => Promise<void>
    webkitRequestFullscreen?: () => Promise<void>
    msRequestFullscreen?: () => Promise<void>
}

/** The same vendor-prefixed half, read from `document`. */
export type FullScreenDocument = {
    exitFullscreen?: () => Promise<void>
    webkitExitFullscreen?: () => Promise<void>
    msExitFullscreen?: () => Promise<void>
    fullscreenElement?: Nullable<Element>
}
