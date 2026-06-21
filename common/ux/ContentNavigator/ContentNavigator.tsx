import { ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AccessibleProps } from '../index.types'
import { Browser } from '@common/utils/Browser'
import { TbListTree } from 'react-icons/tb'
import { IoClose } from 'react-icons/io5'
import { Const } from '@common/ux'
import './ContentNavigator.styles.css'
import {
    getActiveHeaders,
    getHeadingNodes,
    getVisibleHeaderEntries,
} from './ContentNavigator.selectors'

/**
 * Props for the {@link ContentNavigator} component.
 *
 * @property children  - Page content that contains headings to navigate.
 * @property depth     - Maximum heading depth to include (1–6). Defaults to `3` (h1–h3).
 * @property showNavigator - Whether to render the TOC sidebar. When `false`, only the
 *   content wrapper is rendered. Defaults to `true`.
 */
export type ContentNavigatorProps = {
    children: ReactNode
    depth?: number
    showNavigator?: boolean
} & AccessibleProps

/** Internal representation of a heading element extracted from the content. */
interface Heading {
    /** The element's `id` attribute (auto-generated if missing). */
    id: string
    /** Visible text content of the heading. */
    text: string
    /** Heading depth (1 for h1, 2 for h2, etc.). */
    level: number
    /** Whether the heading element is currently visible in the viewport. */
    isVisible: boolean
}

/** Finds the lowest heading level present (e.g. 1 for h1). */
function minLevel(headings: Heading[]) {
    return Math.min(...headings.map((h) => h.level))
}

/**
 * A sticky table-of-contents sidebar inspired by Fumadocs.
 *
 * Wraps page content and automatically discovers heading elements marked with
 * the `data-toc` attribute (set by the `<Heading>` component). It renders a
 * scrollable link list with an SVG tree visualisation and highlights the
 * currently active section(s) as the user scrolls.
 *
 * **Features**
 * - Auto-generates `id` slugs for headings that lack one.
 * - Tracks active headings via scroll position (current section + in-viewport).
 * - Syncs the TOC scroll to keep the active link centred.
 * - Smooth-scrolls to headings on click, respecting the fixed nav offset.
 * - Collapsible: close button hides the panel; a floating icon reopens it.
 * - Hidden on small viewports (< 1024 px).
 *
 * @example
 * ```tsx
 * <ContentNavigator depth={4}>
 *   <Heading as="h1">Introduction</Heading>
 *   <p>…</p>
 *   <Heading as="h2">Getting started</Heading>
 *   <p>…</p>
 * </ContentNavigator>
 * ```
 */
export const ContentNavigator = ({
    children,
    showNavigator = true,
    depth = 3,
    ariaLabel,
    className,
    style,
}: ContentNavigatorProps) => {
    const contentRef = useRef<HTMLDivElement>(null)
    const [elements, setElements] = useState<Element[]>([])
    const [isOpen, setIsOpen] = useState(true)

    const visibleElems = Browser.useIsVisible(elements)
    const headings = useMemo(() => getVisibleHeaderEntries(visibleElems), [visibleElems])
    const baseLevel = useMemo(() => (headings.length ? minLevel(headings) : 1), [headings])

    const scrollRef = useRef<HTMLDivElement>(null)
    const linkRefs = useRef<Map<number, HTMLAnchorElement>>(new Map())
    const elementsRef = useRef(elements)
    elementsRef.current = elements
    const [activeIndices, setActiveIndices] = useState<Set<number>>(new Set())

    const computeActive = useCallback(() => getActiveHeaders(elementsRef.current), [])

    const scrollTo = useCallback((id: string) => {
        const el = document.getElementById(id)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
    }, [])

    useEffect(() => setElements(getHeadingNodes(contentRef, depth)), [depth, children])

    // Compute active headings on mount / when elements change
    useEffect(() => {
        if (elements.length === 0) return
        // Small delay to let layout settle
        const id = requestAnimationFrame(() => setActiveIndices(computeActive()))
        return () => cancelAnimationFrame(id)
    }, [elements, computeActive])

    // Sync TOC scroll position with page scroll using actual DOM positions
    useEffect(() => {
        let skipFirst = true

        const onScroll = () => {
            if (skipFirst) {
                skipFirst = false
                return
            }

            const container = scrollRef.current
            const els = elementsRef.current
            if (!container || els.length === 0) return

            const active = computeActive()
            setActiveIndices(active)

            // Scroll TOC to the current section heading
            const sorted = [...active].sort((a, b) => a - b)
            const primaryIdx = sorted[0]
            const linkEl = linkRefs.current.get(primaryIdx)
            if (!linkEl) return

            const linkTop =
                linkEl.getBoundingClientRect().top -
                container.getBoundingClientRect().top +
                container.scrollTop
            const center = linkTop - container.clientHeight / 2 + linkEl.clientHeight / 2

            container.scrollTop = Math.max(0, center)
        }

        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [computeActive])

    // SVG / layout constants
    const ROW = 28
    const GAP = 2
    const TRANSITION_EXTRA = 4
    const PAD = 6
    const INDENT_STEP = 8

    const maxLevel = useMemo(
        () => (headings.length ? Math.max(...headings.map((h) => h.level)) : baseLevel),
        [headings, baseLevel],
    )
    const SVG_W = 2 + (maxLevel - baseLevel) * INDENT_STEP

    /** x position: base-level at left edge, deeper levels move right. */
    const getX = useCallback((level: number) => 1 + (level - baseLevel) * INDENT_STEP, [baseLevel])

    // Compute y positions: ROW height + GAP between all, extra gap for level changes
    const yPositions = useMemo(() => {
        const positions = [0]
        for (let i = 1; i < headings.length; i++) {
            const extra = headings[i].level !== headings[i - 1].level ? TRANSITION_EXTRA : 0
            positions.push(positions[i - 1] + ROW + GAP + extra)
        }
        return positions
    }, [headings])

    // Margin-top for each link to match yPositions spacing
    const linkGaps = useMemo(
        () =>
            headings.map((_, i) => {
                if (i === 0) return 0
                const extra = headings[i].level !== headings[i - 1].level ? TRANSITION_EXTRA : 0
                return GAP + extra
            }),
        [headings],
    )

    const svgHeight = headings.length > 0 ? yPositions[yPositions.length - 1] + ROW : 0

    // Build tree path and active path (highlights ALL visible segments + connectors)
    const { treePath, activePath } = useMemo(() => {
        if (headings.length === 0) return { treePath: '', activePath: '' }

        const segments: string[] = []

        for (let i = 0; i < headings.length; i++) {
            const x = getX(headings[i].level)
            const top = yPositions[i] + PAD
            const bottom = yPositions[i] + ROW - PAD

            if (i === 0) segments.push(`M${x} ${top}`)

            segments.push(`L${x} ${bottom}`)

            if (i < headings.length - 1) {
                const nextX = getX(headings[i + 1].level)
                const nextTop = yPositions[i + 1] + PAD
                segments.push(`L${nextX} ${nextTop}`)
            }
        }

        // Active: all active vertical segments + connectors between consecutive active headings
        const activeSegments: string[] = []
        for (let i = 0; i < headings.length; i++) {
            if (!activeIndices.has(i)) continue

            const x = getX(headings[i].level)
            const top = yPositions[i] + PAD
            const bottom = yPositions[i] + ROW - PAD
            activeSegments.push(`M${x} ${top} L${x} ${bottom}`)

            if (i < headings.length - 1 && activeIndices.has(i + 1)) {
                const nextX = getX(headings[i + 1].level)
                const nextTop = yPositions[i + 1] + PAD
                activeSegments.push(`M${x} ${bottom} L${nextX} ${nextTop}`)
            }
        }

        return {
            treePath: segments.join(' '),
            activePath: activeSegments.join(' '),
        }
    }, [headings, yPositions, getX, activeIndices])

    if (!showNavigator) {
        return (
            <div ref={contentRef} className="ContentNavigator__content--no-navigator">
                {children}
            </div>
        )
    }

    return (
        <div className="ContentNavigator" style={{ position: 'relative' }}>
            {!isOpen && headings.length > 0 && (
                <button
                    className="ContentNavigator__open-btn"
                    onClick={() => setIsOpen(true)}
                    aria-label="Open table of contents"
                >
                    <TbListTree />
                </button>
            )}
            <nav
                aria-label={ariaLabel}
                className={`ContentNavigator__nav${isOpen ? '' : ' ContentNavigator__nav--hidden'}${className ? ` ${className}` : ''}`}
                style={{ zIndex: Const.ZIndex.sticky, ...style }}
            >
                <span className="ContentNavigator__title">
                    <TbListTree />
                    On this page
                    <button
                        className="ContentNavigator__close-btn"
                        onClick={() => setIsOpen(false)}
                        aria-label="Close table of contents"
                    >
                        <IoClose />
                    </button>
                </span>
                <div ref={scrollRef} className="ContentNavigator__scroll">
                    <div className="ContentNavigator__links" style={{ paddingRight: SVG_W + 4 }}>
                        {headings.map(({ id, text, level }, i) => (
                            <a
                                key={`${id}-${i}`}
                                ref={(el) => {
                                    if (el) linkRefs.current.set(i, el)
                                    else linkRefs.current.delete(i)
                                }}
                                href={`#${id}`}
                                data-active={activeIndices.has(i)}
                                className="ContentNavigator__link"
                                style={{
                                    paddingInlineStart: (level - baseLevel) * 16,
                                    height: ROW,
                                    marginTop: linkGaps[i],
                                }}
                                onClick={(e) => {
                                    e.preventDefault()
                                    scrollTo(id)
                                }}
                            >
                                {text}
                            </a>
                        ))}
                    </div>
                    {headings.length > 0 && (
                        <div className="ContentNavigator__tree">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox={`0 0 ${SVG_W} ${svgHeight}`}
                                width={SVG_W}
                                height={svgHeight}
                                className="ContentNavigator__tree-svg"
                            >
                                <path
                                    d={treePath}
                                    stroke="currentColor"
                                    strokeWidth="1"
                                    fill="none"
                                />
                                {activePath && (
                                    <path
                                        d={activePath}
                                        stroke="var(--accent-dark-3)"
                                        strokeWidth="2"
                                        fill="none"
                                    />
                                )}
                            </svg>
                        </div>
                    )}
                </div>
            </nav>
            <div ref={contentRef} className="ContentNavigator__content">
                {children}
            </div>
        </div>
    )
}
