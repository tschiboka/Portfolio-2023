import { Arrays, Browser, hasLength } from '@common-utils'
import type { RefObject } from 'react'
import type { Nullable } from '@common-utils'
import type { VisibilityEntry } from '@common-utils/Browser'

/** How far down the page a heading counts as scrolled past, so it opens its section. */
const HEADER_OFFSET = 100

const getVisibleHeaderEntries = (entries: VisibilityEntry<Element>[]) =>
    entries
        .map(({ element, isVisible }) => ({
            id: element.id,
            text: element.textContent || '',
            level: parseInt(element.tagName.substring(1)),
            isVisible,
        }))
        .filter(({ text }) => hasLength(text.trim()))

const getHeadingNodes = (
    contentRef: RefObject<Nullable<HTMLDivElement>>,
    depth: number,
): Element[] => {
    if (!contentRef.current) return []

    const selectors = Arrays.times(depth, (i) => `h${i + 1}[data-toc]`).join(', ')

    const nodes = Array.from(contentRef.current.querySelectorAll(selectors))
    const usedSlugs = new Map<string, number>()
    nodes.forEach((node) => {
        if (!node.id) {
            const base = Browser.slugify(node.textContent || '') || 'heading'
            const count = usedSlugs.get(base) ?? 0
            node.id = count === 0 ? base : `${base}-${count}`
            usedSlugs.set(base, count + 1)
        }
    })

    return nodes
}

const getActiveHeaders = (elems: Element[]) => {
    if (!hasLength(elems)) return new Set<number>()

    const vh = window.innerHeight
    const tops = elems.map((element) => element.getBoundingClientRect().top)

    // Current section: last heading scrolled past the top
    const sectionIndex = tops.reduce((last, top, i) => (top <= HEADER_OFFSET ? i : last), 0)

    // Also add all headings physically in the viewport
    const visibleIndices = tops.flatMap((top, i) => (top >= 0 && top <= vh ? [i] : []))

    return new Set([sectionIndex, ...visibleIndices])
}

export const ContentNavigatorSelectors = {
    getVisibleHeaderEntries,
    getHeadingNodes,
    getActiveHeaders,
}
