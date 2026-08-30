import { ReactNode, useEffect } from 'react'
import { detectIncognito } from 'detectincognitojs'
import { useNavigate } from 'react-router-dom'
import { FullScreenOverlay } from '../Overlay/Overlay'
import { PageNav, PageMobileMenu, PageSubNav } from '../../Nav'
import type { PageVariant } from '../../Nav'
import Footer, { type FooterProps } from '../Footer/Footer'
import { Session } from '../../../context/SessionContext'
import { useAppContext } from '../../../context/AppContext/App.context'
import { postVisit } from '../../../common/queries'
import { Browser } from '@utils'
import { ContentNavigator } from '@ux'
import './Screen.css'

export type ScreenProps = {
    children: ReactNode
    title: string
    path: string
    pageName?: string
    variant?: PageVariant
    className?: string
    recordVisit?: boolean
    loginRequired?: boolean
    sideMenu?: ReactNode
    hideFooter?: boolean
    footerProps?: Omit<FooterProps, 'path'>
    hasContentNavigator?: boolean
    contentNavigatorDepth?: number
}

export const Screen = ({
    children,
    title,
    path,
    pageName,
    variant,
    className,
    recordVisit = true,
    loginRequired = false,
    sideMenu,
    hideFooter,
    footerProps,
    hasContentNavigator = false,
    contentNavigatorDepth = 6,
}: ScreenProps) => {
    const { subMenuVisible } = useAppContext()
    const navigate = useNavigate()
    const { isAuthenticated, isAuthLoading } = Session.useContext()

    useEffect(() => {
        document.title = title
        window.scrollTo(0, 0)

        if (Browser.isLocalhost()) return

        void detectIncognito().then((result) => {
            if (!result.isPrivate && recordVisit) void postVisit(path)
        })
    }, [path, recordVisit, title])

    useEffect(() => {
        if (loginRequired && !isAuthLoading && !isAuthenticated) navigate('/api/login')
    }, [loginRequired, isAuthenticated, isAuthLoading, navigate])

    const getClassName = () => {
        const classes = ['Screen']
        if (className) classes.push(className)
        if (subMenuVisible) classes.push('Screen--submenu-open')
        return classes.join(' ')
    }

    return (
        <ContentNavigator showNavigator={hasContentNavigator} depth={contentNavigatorDepth}>
            <div className={getClassName()}>
                {variant && pageName && <PageNav variant={variant} pageName={pageName} />}
                {variant && pageName && <PageMobileMenu variant={variant} pageName={pageName} />}
                <PageSubNav />
                {sideMenu}
                {children}
                {!hideFooter && <Footer path={path} {...footerProps} />}
                <FullScreenOverlay />
            </div>
        </ContentNavigator>
    )
}
