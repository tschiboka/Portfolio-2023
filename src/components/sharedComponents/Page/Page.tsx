import { ReactNode, useEffect, useMemo, useRef } from 'react'
import { useAppContext } from '../../../context/AppContext'
import { postVisit } from '../../../serverAPI/visits'
import { detectIncognito } from 'detectincognitojs'
import Overlay from '../Overlay/Overlay'
import './Page.scss'

interface Props {
    children: ReactNode
    title: string
    path: string
}

const Page = ({ children, title, path }: Props) => {
    const {
        isPageScrolling,
        setIsPageScrolling,
        scrollTimeElapsed,
        setScrollTimeElapsed,
    } = useAppContext()
    const isPageScrollingRef = useRef(isPageScrolling)
    const setIsPageScrollingRef = useRef(setIsPageScrolling)
    const scrollTimeElapsedRef = useRef(scrollTimeElapsed)
    const setScrollTimeElapsedRef = useRef(setScrollTimeElapsed)

    useEffect(() => {
        isPageScrollingRef.current = isPageScrolling
        scrollTimeElapsedRef.current = scrollTimeElapsed
    }, [isPageScrolling, scrollTimeElapsed])

    useEffect(() => {
        document.title = title

        detectIncognito().then((result) => {
            // Do Not Record Visits in Incognito Mode
            if (!result.isPrivate) postVisit(path)
        })

        window.removeEventListener('scroll', handleScroll)
        window.scrollTo(0, 0)
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const scrollTimeout = setInterval(() => {
        const timeElapsed = Date.now() - scrollTimeElapsedRef.current
        if (isPageScrollingRef.current && timeElapsed > 1000) {
            setIsPageScrollingRef.current(false)
            setScrollTimeElapsedRef.current(Date.now())
            document.body.classList.remove('scroll')
            clearTimeout(scrollTimeout)
        }
    }, 100)

    const handleScroll = () => {
        const timeElapsed = Date.now() - scrollTimeElapsedRef.current
        setScrollTimeElapsedRef.current(Date.now())
        if (!isPageScrollingRef.current) {
            setIsPageScrollingRef.current(true)
            document.body.classList.add('scroll')
            clearTimeout(timeElapsed)
        }
    }

    return (
        <div className="Page">
            {children}
            <Overlay></Overlay>
        </div>
    )
}

export default Page
