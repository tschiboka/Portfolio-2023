import { useEffect, useRef, useState } from 'react'

/** Pairs a DOM element with its current intersection-observer visibility state. */
export type VisibilityEntry<T extends Element> = {
    element: T
    isVisible: boolean
}

/**
 * Returns a referentially stable array that only updates when the
 * contents change (shallow element-by-element comparison).
 * Prevents infinite re-render loops when callers pass a new array reference every render.
 */
function useStableElements<T extends Element>(elements: T[]): T[] {
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
 * const visibility = useIsVisible(elements)
 * visibility.forEach(({ element, isVisible }) => {
 *     console.log(element.id, isVisible)
 * })
 * ```
 */
export function useIsVisible<T extends Element>(elements: T[]): VisibilityEntry<T>[] {
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
