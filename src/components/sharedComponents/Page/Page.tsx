import { ReactNode, useEffect, useRef } from 'react'
import { useAppContext } from '../../../context/AppContext/App.context'
import { postVisit } from '../../../serverAPI/visits'
import { detectIncognito } from 'detectincognitojs'
import Overlay from '../Overlay/Overlay'
import './Page.scss'
import { Maybe } from 'monet'
import { useNavigate } from 'react-router-dom'
import { useSessionContext } from '../../../context/SessionContext/Session.context'

type Props = {
    children: ReactNode
    title: string
    path: string
    className?: string
    recordVisit?: boolean
    loginRequired?: boolean
}

const Page = ({
    children,
    title,
    path,
    className,
    recordVisit = true,
    loginRequired = false,
}: Props) => {
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
            if (!result.isPrivate && recordVisit) postVisit(path)
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

    const getClassName = (className?: string) =>
        Maybe.fromUndefined(className)
            .map((cls) => 'Page ' + cls)
            .orSome('Page')

    const navigate = useNavigate()
    const { isAuthenticated, isAuthLoading } = useSessionContext()

    useEffect(() => {
        if (loginRequired && !isAuthLoading && !isAuthenticated)
            navigate('/api/login')
    }, [loginRequired, isAuthenticated, isAuthLoading, navigate])

    return (
        <div className={getClassName(className)}>
            {children}
            <Overlay></Overlay>
        </div>
    )
}

export default Page
