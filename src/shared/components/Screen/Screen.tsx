import { ReactNode, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FullScreenOverlay } from '../Overlay/Overlay'
import { PageNav, PageMobileMenu, PageSubNav } from '@shared-components/Nav'
import type { PageVariant } from '@shared-components/Nav'
import Footer, { type FooterProps } from '../Footer/Footer'
import { Session, AppHooks } from '@shared-context'
import { VisitsQueries } from '@shared-queries'
import { Paths } from '@common-utils'
import { ContentNavigator } from '@common-ux'
import './Screen.css'

export type ScreenProps = {
    children: ReactNode
    title: string
    path: string
    pageName?: string
    variant?: PageVariant
    className?: string
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
    loginRequired = false,
    sideMenu,
    hideFooter,
    footerProps,
    hasContentNavigator = false,
    contentNavigatorDepth = 6,
}: ScreenProps) => {
    const { subMenuVisible } = AppHooks.useContext()
    const navigate = useNavigate()
    const { isAuthenticated, isAuthLoading } = Session.useContext()

    VisitsQueries.useRecord(path)

    useEffect(() => {
        document.title = title
        window.scrollTo(0, 0)
    }, [title])

    useEffect(() => {
        if (loginRequired && !isAuthLoading && !isAuthenticated) navigate(Paths.Client.Login)
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
