/** Pairs a DOM element with its current intersection-observer visibility state. */
export type VisibilityEntry<T extends Element> = {
    element: T
    isVisible: boolean
}

export type Orientation = 'portrait' | 'landscape'
