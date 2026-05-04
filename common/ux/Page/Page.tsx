import { ReactNode, useEffect } from 'react'
import { postVisit } from '../../../src/serverAPI/visits'
import { detectIncognito } from 'detectincognitojs'
import { useNavigate } from 'react-router-dom'
import { Session } from '../../../src/context/SessionContext'
import { useAppContext } from '../../../src/context/AppContext/App.context'
import './Page.css'

export type PageProps = {
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
}: PageProps) => {
    const { subMenuVisible } = useAppContext()

    useEffect(() => {
        document.title = title
        window.scrollTo(0, 0)

        void detectIncognito().then((result) => {
            if (!result.isPrivate && recordVisit) void postVisit(path)
        })
    }, [path, recordVisit, title])

    const getClassName = (className?: string) => {
        const classes = ['Page']
        if (className) classes.push(className)
        if (subMenuVisible) classes.push('Page--submenu-open')
        return classes.join(' ')
    }

    const navigate = useNavigate()
    const { isAuthenticated, isAuthLoading } = Session.useContext()

    useEffect(() => {
        if (loginRequired && !isAuthLoading && !isAuthenticated) navigate('/api/login')
    }, [loginRequired, isAuthenticated, isAuthLoading, navigate])

    return <div className={getClassName(className)}>{children}</div>
}

export default Page
