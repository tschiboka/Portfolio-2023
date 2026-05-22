import { ReactNode } from 'react'
import Page from '../../../../common/ux/Page/Page'
import { FullScreenOverlay } from '../Overlay/Overlay'
import { PageNav, PageMobileMenu, PageSubNav } from '../../Nav'
import type { PageVariant } from '../../Nav'
import Footer, { type FooterProps } from '../Footer/Footer'
import { ContentNavigator } from '@common/ux'

type ScreenProps = {
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
    recordVisit,
    loginRequired,
    sideMenu,
    hideFooter,
    footerProps,
    hasContentNavigator = false,
    contentNavigatorDepth = 6,
}: ScreenProps) => (
    <ContentNavigator showNavigator={hasContentNavigator} depth={contentNavigatorDepth}>
        <Page
            title={title}
            path={path}
            className={className}
            recordVisit={recordVisit}
            loginRequired={loginRequired}
        >
            {variant && pageName && <PageNav variant={variant} pageName={pageName} />}
            {variant && pageName && <PageMobileMenu variant={variant} pageName={pageName} />}
            <PageSubNav />
            {sideMenu}
            {children}
            {!hideFooter && <Footer path={path} {...footerProps} />}
            <FullScreenOverlay />
        </Page>
    </ContentNavigator>
)
