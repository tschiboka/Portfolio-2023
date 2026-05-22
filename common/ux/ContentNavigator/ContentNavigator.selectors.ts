import { Browser, hasLength } from '@common/utils'
import { VisibilityEntry } from '@common/utils/Browser/useIsVisible'

export const getVisibleHeaderEntries = (entries: VisibilityEntry<Element>[]) =>
    entries
        .map(({ element, isVisible }) => ({
            id: element.id,
            text: element.textContent || '',
            level: parseInt(element.tagName.substring(1)),
            isVisible,
        }))
        .filter(({ text }) => hasLength(text.trim()))

export const getHeadingNodes = (
    contentRef: React.RefObject<HTMLDivElement>,
    depth: number,
): Element[] => {
    if (!contentRef.current) return []

    const selectors = Array.from({ length: depth }, (_, i) => `h${i + 1}[data-toc]`).join(', ')

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

export const getActiveHeaders = (elems: Element[]) => {
    if (!hasLength(elems)) return new Set<number>()

    const active = new Set<number>()
    const vh = window.innerHeight

    // Current section: last heading scrolled past the top
    let sectionIdx = 0
    for (let i = 0; i < elems.length; i++) {
        if (elems[i].getBoundingClientRect().top <= 100) sectionIdx = i
    }
    active.add(sectionIdx)

    // Also add all headings physically in the viewport
    for (let i = 0; i < elems.length; i++) {
        const top = elems[i].getBoundingClientRect().top
        if (top >= 0 && top <= vh) active.add(i)
    }

    return active
}

