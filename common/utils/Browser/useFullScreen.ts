import { useRef, useCallback, useState, useEffect } from 'react'

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

export const useFullScreen = <T extends HTMLElement>() => {
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
