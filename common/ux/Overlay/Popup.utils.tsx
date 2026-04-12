import type { CSSProperties, ReactNode } from 'react'
import { useLayoutEffect } from 'react'
import { PopupArrow, PopupMode, PopupSize } from './Overlay.types'
import { FaExclamationCircle, FaExclamationTriangle, FaInfoCircle, FaLock } from 'react-icons/fa'

const ARROW_GAP = 10

export const SizeStyle: Record<PopupSize, CSSProperties> = {
    sm: { minWidth: 280, maxWidth: 360 },
    md: { minWidth: 360, maxWidth: 480 },
    lg: { minWidth: 480, maxWidth: 640 },
}

export const ModeClass: Record<PopupMode, string> = {
    primary: 'Overlay--popup--primary',
    warning: 'Overlay--popup--warning',
    danger: 'Overlay--popup--danger',
    info: 'Overlay--popup--info',
}

export const DefaultIcon: Record<PopupMode, ReactNode> = {
    primary: <FaLock />,
    warning: <FaExclamationTriangle />,
    danger: <FaExclamationCircle />,
    info: <FaInfoCircle />,
}

export const ArrowClass: Record<PopupArrow, string> = {
    top: 'Overlay--popup__arrow--bottom',
    bottom: 'Overlay--popup__arrow--top',
    left: 'Overlay--popup__arrow--right',
    right: 'Overlay--popup__arrow--left',
}

export interface AnchorResult {
    style: CSSProperties
    arrow: PopupArrow
    arrowOffset: number
}

export const getAnchorPosition = (anchorEl: HTMLElement, popupEl: HTMLElement): AnchorResult => {
    const anchor = anchorEl.getBoundingClientRect()
    // Scroll is locked before this runs, so clientWidth is stable (no scrollbar shift)
    const vw = document.documentElement.clientWidth
    const vh = document.documentElement.clientHeight

    // Pick side with more vertical space
    const spaceAbove = anchor.top
    const spaceBelow = vh - anchor.bottom
    const arrow: PopupArrow = spaceBelow >= spaceAbove ? 'bottom' : 'top'

    // Constrain width first, then measure height at that width
    const maxWidth = vw
    popupEl.style.maxWidth = `${maxWidth}px`
    popupEl.style.minWidth = '0'

    const popup = popupEl.getBoundingClientRect()
    const w = popup.width
    const h = popup.height

    let top: number
    let left: number

    if (arrow === 'bottom') {
        top = anchor.bottom + ARROW_GAP
    } else {
        top = anchor.top - h - ARROW_GAP
    }
    left = anchor.left + anchor.width / 2 - w / 2

    const rawLeft = left

    // Clamp so the popup stays fully within the viewport
    top = Math.max(0, Math.min(top, vh - h))
    left = Math.max(0, Math.min(left, vw - w))

    const arrowOffset = rawLeft - left

    // Tighten maxWidth to the remaining space from final left
    const finalMaxWidth = vw - left

    return {
        style: {
            position: 'fixed',
            top,
            left,
            maxWidth: finalMaxWidth,
            minWidth: 0,
        },
        arrow,
        arrowOffset,
    }
}

export const useScrollLock = () => {
    useLayoutEffect(() => {
        const html = document.documentElement
        const prevBody = document.body.style.overflow
        const prevHtml = html.style.overflow
        const prevMaxWidth = html.style.maxWidth
        const prevOverflowX = html.style.overflowX
        const prevScrollX = window.scrollX
        document.body.style.overflow = 'hidden'
        html.style.overflow = 'hidden'
        // Neutralise html { max-width: 100vw; overflow-x: hidden } from index.scss
        // 100vw can round differently than clientWidth at fractional zoom levels
        html.style.maxWidth = 'none'
        html.style.overflowX = 'hidden'
        window.scrollTo(0, window.scrollY)

        const preventScroll = (e: Event) => e.preventDefault()
        document.addEventListener('wheel', preventScroll, { passive: false })
        document.addEventListener('touchmove', preventScroll, { passive: false })

        return () => {
            document.body.style.overflow = prevBody
            html.style.overflow = prevHtml
            html.style.maxWidth = prevMaxWidth
            html.style.overflowX = prevOverflowX
            window.scrollTo(prevScrollX, window.scrollY)
            document.removeEventListener('wheel', preventScroll)
            document.removeEventListener('touchmove', preventScroll)
        }
    }, [])
}
