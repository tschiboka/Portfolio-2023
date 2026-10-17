import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ContentNavigator } from '@common-ux'
import { Paths } from '@common-utils'
import { PageNav, PageMobileMenu, PageSubNav } from '@shared-components/Nav'
import { Session, AppHooks } from '@shared-context'
import { VisitQueries } from '@shared-queries'
import { ScreenStyles } from './Screen.styles'
import { Overlay } from '../Overlay'
import { Footer } from '../Footer'
import type { ScreenProps } from './Screen.types'
import './Screen.css'

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

    VisitQueries.usePost(path)

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
            <div className={getClassName()} style={ScreenStyles.shell}>
                {variant && pageName && <PageNav variant={variant} pageName={pageName} />}
                {variant && pageName && <PageMobileMenu variant={variant} pageName={pageName} />}
                <PageSubNav />
                {sideMenu}
                {children}
                {!hideFooter && <Footer path={path} {...footerProps} />}
                <Overlay />
            </div>
        </ContentNavigator>
    )
}
