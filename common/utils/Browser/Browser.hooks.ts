import { useCallback, useEffect, useRef, useState } from 'react'
import type { Orientation, VisibilityEntry } from './Browser.types'

const MOBILE_BREAKPOINT = 1024

// Vendor-prefixed Fullscreen API types
interface FullScreenElement {
    requestFullscreen?: () => Promise<void>
    webkitRequestFullscreen?: () => Promise<void>
    msRequestFullscreen?: () => Promise<void>
}

interface FullScreenDocument {
    exitFullscreen?: () => Promise<void>
    webkitExitFullscreen?: () => Promise<void>
    msExitFullscreen?: () => Promise<void>
    fullscreenElement?: Element | null
}

const useFullScreen = <T extends HTMLElement>() => {
    const ref = useRef<T>(null)
    const [isFullscreen, setIsFullscreen] = useState(false)

    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement)
        }

        document.addEventListener('fullscreenchange', handleFullscreenChange)
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
    }, [])

    const enterFullScreen = useCallback(() => {
        const el = ref.current
        if (!el) return

        const fullEl = el as FullScreenElement
        if (fullEl.requestFullscreen) void fullEl.requestFullscreen()
        else if (fullEl.webkitRequestFullscreen) void fullEl.webkitRequestFullscreen()
        else if (fullEl.msRequestFullscreen) void fullEl.msRequestFullscreen()
    }, [])

    const exitFullScreen = useCallback(() => {
        const fullDoc = document as FullScreenDocument
        if (fullDoc.exitFullscreen) void fullDoc.exitFullscreen()
        else if (fullDoc.webkitExitFullscreen) void fullDoc.webkitExitFullscreen()
        else if (fullDoc.msExitFullscreen) void fullDoc.msExitFullscreen()
    }, [])

    return { ref, enterFullScreen, exitFullScreen, isFullscreen }
}

/**
 * Returns a referentially stable array that only updates when the
 * contents change (shallow element-by-element comparison).
 * Prevents infinite re-render loops when callers pass a new array reference every render.
 */
const useStableElements = <T extends Element>(elements: T[]): T[] => {
    const ref = useRef(elements)

    if (elements.length !== ref.current.length || elements.some((el, i) => el !== ref.current[i])) {
        ref.current = elements
    }

    return ref.current
}

/**
 * Tracks viewport visibility of the given DOM elements via `IntersectionObserver`.
 *
 * @param elements - DOM elements to observe.
 * @returns An array of {@link VisibilityEntry} objects, one per element, in the same order.
 *
 * @example
 * ```tsx
 * const visibility = BrowserHooks.useIsVisible(elements)
 * visibility.forEach(({ element, isVisible }) => {
 *     console.log(element.id, isVisible)
 * })
 * ```
 */
const useIsVisible = <T extends Element>(elements: T[]): VisibilityEntry<T>[] => {
    const stableElements = useStableElements(elements)
    const [visibility, setVisibility] = useState<VisibilityEntry<T>[]>(() =>
        stableElements.map((element) => ({ element, isVisible: false })),
    )

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            setVisibility((prev) => {
                const next = prev.map((v) => ({ ...v }))

                entries.forEach((entry) => {
                    const index = stableElements.indexOf(entry.target as T)
                    if (index !== -1) {
                        next[index] = {
                            element: stableElements[index],
                            isVisible: entry.isIntersecting,
                        }
                    }
                })

                return next
            })
        })

        setVisibility(stableElements.map((element) => ({ element, isVisible: false })))
        stableElements.forEach((el) => observer.observe(el))

        return () => observer.disconnect()
    }, [stableElements])

    return visibility
}

const useOrientation = () => {
    const [orientation, setOrientation] = useState<Orientation>(
        window.innerHeight > window.innerWidth ? 'portrait' : 'landscape',
    )
    const [isMobile, setIsMobile] = useState(window.innerWidth <= MOBILE_BREAKPOINT)

    useEffect(() => {
        const handleResize = () => {
            setOrientation(window.innerHeight > window.innerWidth ? 'portrait' : 'landscape')
            setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT)
        }

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return { orientation, isMobile }
}

export const BrowserHooks = { useFullScreen, useIsVisible, useOrientation }
