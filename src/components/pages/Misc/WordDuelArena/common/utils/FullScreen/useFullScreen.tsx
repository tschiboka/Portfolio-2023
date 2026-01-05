import { useRef, useCallback, useState, useEffect } from 'react'

export const useFullScreen = <T extends HTMLElement>() => {
    const ref = useRef<T>(null)
    const [isFullscreen, setIsFullscreen] = useState(false)

    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement)
        }

        document.addEventListener('fullscreenchange', handleFullscreenChange)
        return () =>
            document.removeEventListener(
                'fullscreenchange',
                handleFullscreenChange,
            )
    }, [])

    const enterFullScreen = useCallback(() => {
        const el = ref.current
        if (!el) return

        if (el.requestFullscreen) el.requestFullscreen()
        else if ((el as any).webkitRequestFullscreen)
            (el as any).webkitRequestFullscreen() // Safari
        else if ((el as any).msRequestFullscreen)
            (el as any).msRequestFullscreen() // IE/Edge
    }, [])

    const exitFullScreen = useCallback(() => {
        if (document.exitFullscreen) document.exitFullscreen()
        else if ((document as any).webkitExitFullscreen)
            (document as any).webkitExitFullscreen()
        else if ((document as any).msExitFullscreen)
            (document as any).msExitFullscreen()
    }, [])

    return { ref, enterFullScreen, exitFullScreen, isFullscreen }
}
