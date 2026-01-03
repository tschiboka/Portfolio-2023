import { useEffect, useState } from 'react'

export type Orientation = 'portrait' | 'landscape'

const MOBILE_BREAKPOINT = 1024

export const useOrientation = () => {
    const [orientation, setOrientation] = useState<Orientation>(
        window.innerHeight > window.innerWidth ? 'portrait' : 'landscape'
    )
    const [isMobile, setIsMobile] = useState(
        window.innerWidth <= MOBILE_BREAKPOINT
    )

    useEffect(() => {
        const handleResize = () => {
            setOrientation(
                window.innerHeight > window.innerWidth ? 'portrait' : 'landscape'
            )
            setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT)
        }

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return { orientation, isMobile }
}